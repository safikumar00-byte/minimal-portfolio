// Liquid Glass Carousel by Made for Award: https://www.madeforaward.com/ui/galleries/liquid-glass-carousel
// Free and open source (MIT). If it helped, a star means a lot: https://github.com/shivc868/madeforaward-ui
'use client'

import { useEffect, useId, useRef, useState } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

// An infinite strip of image panels drawn with three.js and viewed through a
// "liquid glass" pane: the strip is rendered to a texture, then a full-screen
// shader bends and smears it near the pane's edges (rim wave + chromatic
// dispersion), adds a soft centre glow, a thin coloured ring and a hairline
// at the border. Wheel, drag (with momentum), arrows and keys move it; a
// click on a side panel centres it; a click on the centred one "focuses" it
// (it grows, the others drop away, the glass clears). Entry: panels rise in,
// the glass fades on, the panels grow to size.

export type GlassItem = { src: string; title: string; aspect?: number }

export type LiquidGlassCarouselProps = {
  items?: GlassItem[]
  /** panel height in px (clamped to the box height − 200) */
  panelHeight?: number
  /** gap between panels in px */
  gap?: number
  background?: string
  /** colour of the thin ring just inside the glass edge */
  ringColor?: string
  /** strength of that ring and its aura (the original sits on grey, where it clips away; keep it low on dark) */
  ring?: number
  /** chromatic dispersion at the edges, 0 = none */
  dispersion?: number
  /** rim wave strength at the edges */
  rim?: number
  /** centre glow strength */
  glow?: number
  /** play the entrance (rise, glass on, grow) */
  entry?: boolean
  className?: string
  onActiveChange?: (index: number) => void
}

const DEFAULT_ASPECT = 3 / 4
const art = (n: string) => `/mfa/liquid-glass-carousel/${n}.webp`
const DEFAULT_ITEMS: GlassItem[] = [
  { title: 'Ember Studio', src: art('01') },
  { title: 'Nocturne', src: art('02') },
  { title: 'Atlas Living', src: art('03') },
  { title: 'Signal', src: art('04') },
  { title: 'Velvet', src: art('05') },
  { title: 'The Living Space', src: art('06') },
  { title: 'Loud', src: art('07') },
  { title: 'Tide', src: art('08') },
]

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

const FRAG = /* glsl */ `
#define PI 3.14159265
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uSizeX, uSizeY, uAspect, uSquareRound;
uniform float uDispersion, uGlow, ugreyGlow, uNovaSize;
uniform float uRing, uRingRadius, uRingWidth;
uniform float uShimmer, uTime;
uniform float uRimStart, uRimTangential, uRimInward;
uniform vec3 uRingColor;
uniform float uRimLine, uRimLinePos, uRimLineWidth;
const int SAMPLES = 16;

float sdRoundBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// The pane: a rounded rectangle almost as big as the box. Inside it the strip
// is re-sampled with a wave + inward pull near the edge and an RGB spread.
vec3 glass(out float outA) {
  vec2 p = vUv - 0.5;
  p.x *= uAspect;
  vec2 halfSize = vec2(uSizeX, uSizeY);
  float corner = min(uSizeX, uSizeY) * uSquareRound;
  float maskND = 1.0 + sdRoundBox(p, halfSize, corner) / min(uSizeX, uSizeY);
  outA = 0.0;
  if (maskND > 1.0) return vec3(0.0);
  float nd = clamp(maskND, 0.0, 1.0);

  vec2 offset = vUv - 0.5;
  vec2 radialDir = normalize(offset + 1e-6);
  vec2 tangentDir = vec2(-radialDir.y, radialDir.x);
  float angle = atan(p.y, p.x);
  float rimStrength = smoothstep(uRimStart, 1.0, nd);
  float wave = sin(angle * 2.0) * 0.55 + sin(angle) * 0.25;
  float rScreen = (uSizeX + uSizeY) * 0.5;
  vec2 rimOff = tangentDir * wave * rimStrength * rScreen * uRimTangential;
  vec2 rimPull = -radialDir * rimStrength * rScreen * uRimInward;
  vec2 baseUV = 0.5 + offset + rimOff + rimPull;
  vec2 dispDir = offset * uDispersion * 0.004 * rimStrength;

  vec3 col = vec3(0.0);
  vec3 caW = vec3(0.0);
  for (int i = 0; i < SAMPLES; i++) {
    float t = float(i) / float(SAMPLES - 1);
    vec3 s = texture2D(uTex, baseUV + dispDir * (t - 0.5)).rgb;
    vec3 w = vec3(exp(-pow(t / 0.38, 2.0)), exp(-pow((t - 0.5) / 0.38, 2.0)), exp(-pow((t - 1.0) / 0.38, 2.0)));
    col += s * w;
    caW += w;
  }
  col /= max(caW, vec3(0.001));
  col *= mix(0.91, 1.0, smoothstep(0.0, 0.38, nd));

  // centre glow
  float r2 = nd * nd * 0.25;
  float gs = max(uNovaSize * uGlow * 0.003, 0.004);
  float nova = (exp(-r2 / gs) + exp(-r2 / (gs * 7.0)) * 0.18) * ugreyGlow * (uGlow / 17.0) * 1.15;
  col += vec3(nova);

  // coloured ring + aura just inside the edge, shimmering around
  float dC = nd * 0.5;
  float rW = max(uRingWidth, 0.003);
  float ring = exp(-pow((dC - uRingRadius) / rW, 2.0)) * uRing * (uGlow / 17.0) * 1.8;
  if (uShimmer > 0.5) ring *= sin(angle * 12.0 + uTime * 3.5) * 0.08 + 0.92;
  float aura = exp(-pow((dC - uRingRadius) / (rW * 6.0), 2.0)) * 0.28 * uRing * (uGlow / 17.0);
  col += uRingColor * (ring + aura);
  // hairline
  col += vec3(exp(-pow((dC - uRimLinePos) / max(uRimLineWidth, 0.0001), 2.0)) * uRimLine);

  outA = 1.0 - smoothstep(0.93, 1.0, maskND);
  return col;
}

void main(){
  vec3 base = texture2D(uTex, vUv).rgb;
  float a = 0.0;
  vec3 c = glass(a);
  gl_FragColor = vec4(mix(base, c, a), 1.0);
  #include <colorspace_fragment>
}
`

// the uniforms the glass "amount" scales (entry fades them in, focus turns them off)
const LENS_KEYS = ['uDispersion', 'uRing', 'uRimLine', 'uRimTangential', 'uRimInward'] as const

type Engine = { closeFocus(): void; next(): void; previous(): void; destroy(): void }

type EngineOpts = {
  items: GlassItem[]
  panelHeight: number
  gap: number
  background: string
  ringColor: string
  ring: number
  dispersion: number
  rim: number
  glow: number
  entry: boolean
  onActiveChange(i: number): void
  onFocusChange(focused: boolean): void
  onEntryDone(done: boolean): void
  onError(): void
}

function createEngine(host: HTMLDivElement, label: HTMLDivElement | null, o: EngineOpts): Engine | null {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let rm = reduced.matches
  const playEntry = o.entry && !rm
  const items = o.items
  const n = items.length
  if (n === 0) return null

  let W = Math.max(1, host.clientWidth)
  let H = Math.max(1, host.clientHeight)
  const panelH = () => Math.max(120, Math.min(o.panelHeight, H - 200))
  let ph = panelH()
  const gap = o.gap
  let alive = true

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' })
  } catch {
    return null
  }
  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(dpr)
  renderer.setSize(W, H)
  renderer.setClearColor(new THREE.Color(o.background), 1)
  const canvas = renderer.domElement
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%', touchAction: 'pan-y', userSelect: 'none' })
  canvas.setAttribute('aria-hidden', 'true')
  host.appendChild(canvas)

  // scene 1: the strip, in pixels
  const scene = new THREE.Scene()
  const cam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -100, 100)
  cam.position.z = 10
  const loader = new THREE.TextureLoader()
  loader.setCrossOrigin('anonymous')
  const media = items.map((it) => {
    const m = { tex: null as THREE.Texture | null, aspect: it.aspect ?? DEFAULT_ASPECT, locked: it.aspect != null }
    loader.load(
      it.src,
      (tex) => {
        if (!alive) return void tex.dispose()
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
        tex.generateMipmaps = true
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
        tex.colorSpace = THREE.SRGBColorSpace
        if (!m.locked && tex.image) m.aspect = tex.image.width / tex.image.height
        m.tex = tex
        layout()
        if (!moved) target = current = centreOf(0)
      },
      undefined,
      () => { },
    )
    return m
  })

  // strip geometry: slot i starts at starts[i]; one full cycle is `cycle` px
  const slotW = (i: number) => media[i].aspect * ph + gap
  let starts: number[] = []
  let cycle = 0
  function layout() {
    starts = []
    let x = 0
    for (let i = 0; i < n; i++) {
      starts.push(x)
      x += slotW(i)
    }
    cycle = x
  }
  // scroll position that puts logical item k (any integer) in the centre
  const centreOf = (k: number) => {
    const lap = Math.floor(k / n)
    const i = ((k % n) + n) % n
    return starts[i] + slotW(i) / 2 - gap / 2 + lap * cycle
  }
  // the logical item nearest scroll position x
  const nearestK = (x: number) => {
    if (!cycle) return 0
    let best = 0
    let bestD = Infinity
    for (let i = 0; i < n; i++) {
      const c = starts[i] + slotW(i) / 2 - gap / 2
      const lap = Math.round((x - c) / cycle)
      const d = Math.abs(c + lap * cycle - x)
      if (d < bestD) {
        bestD = d
        best = i + lap * n
      }
    }
    return best
  }
  const nearestI = (x: number) => ((nearestK(x) % n) + n) % n
  layout()

  // a pool of 4 laps of planes so the strip can wrap either way
  const LAPS = 4
  const MID = 2
  const pool = [] as { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; src: number; bound: boolean }[]
  for (let lap = 0; lap < LAPS; lap++)
    for (let i = 0; i < n; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x2a2a2e, transparent: true })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), mat)
      mesh.visible = false
      scene.add(mesh)
      pool.push({ mesh, mat, src: i, bound: false })
    }

  // scene 2: the glass pane over the rendered strip
  const rt = new THREE.WebGLRenderTarget(W * dpr, H * dpr)
  const post = new THREE.Scene()
  const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const u = {
    uTex: { value: rt.texture },
    uRes: { value: new THREE.Vector2(W * dpr, H * dpr) },
    uSizeX: { value: (W / 2 - 6) / H },
    uSizeY: { value: (H / 2 - 6) / H },
    uSquareRound: { value: 0.06 },
    uAspect: { value: W / H },
    uDispersion: { value: o.dispersion },
    uGlow: { value: o.glow },
    ugreyGlow: { value: 0.06 },
    uNovaSize: { value: 12 },
    uRing: { value: o.ring },
    uRingRadius: { value: 0.49 },
    uRingWidth: { value: 0.014 },
    uShimmer: { value: rm ? 0 : 1 },
    uTime: { value: 0 },
    uRimStart: { value: 0.86 },
    uRimTangential: { value: 0.7 * o.rim },
    uRimInward: { value: 0.1 * o.rim },
    uRingColor: { value: new THREE.Color(o.ringColor) },
    uRimLine: { value: 0.45 },
    uRimLinePos: { value: 0.488 },
    uRimLineWidth: { value: 0.003 },
  }
  const postMat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VERT, fragmentShader: FRAG, toneMapped: false })
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat)
  post.add(quad)
  const lensBase = Object.fromEntries(LENS_KEYS.map((k) => [k, u[k].value])) as Record<(typeof LENS_KEYS)[number], number>

  // motion state
  let current = centreOf(0)
  let target = current
  let moved = false
  let velocity = 0
  let last = current
  let speed = 0 // 0..1, squashes panels while the strip moves fast
  let pending: { src: number } | null = null // item to focus once centred
  let settledAt = performance.now()
  let snapped = false

  // focus (one panel open) + entry
  const focus = { active: false, src: -1, pool: -1, lens: playEntry ? 0 : 1, anim: null as gsap.core.Timeline | null }
  const drop = new Array<number>(pool.length).fill(0) // 0..1: how far a panel has dropped away in focus
  let focusScale = 1
  const xs = new Array<number | undefined>(pool.length)
  const rise = new Array<number>(pool.length).fill(playEntry ? 0 : 1) // entry: rising in
  const grow = new Array<number>(pool.length).fill(playEntry ? 0 : 1) // entry: growing to size
  let entering = playEntry
  let growing = false
  let entryAnim: gsap.core.Timeline | null = null

  type Hit = { left: number; right: number; top: number; bottom: number; pool: number; src: number; cx: number }
  let hits: Hit[] = []
  let centre: { src: number; pool: number } | null = null

  function place() {
    hits = []
    centre = null
    let bestD = Infinity
    const half = W / 2
    pool.forEach((p, pi) => {
      const lap = Math.floor(pi / n)
      const m = media[p.src]
      let x = starts[p.src] + slotW(p.src) / 2 - gap / 2 - current
      x = ((x % cycle) + cycle) % cycle + (lap - MID) * cycle
      if (x > half + cycle) x -= LAPS * cycle
      if (!(entering || growing) && (x < -half - ph || x > half + ph)) {
        p.mesh.visible = false
        xs[pi] = undefined
        return
      }
      xs[pi] = x
      const squash = 1 - 0.25 * speed
      const h = ph * squash
      const w = m.aspect * ph * squash
      if (m.tex && !p.bound) {
        p.mat.map = m.tex
        p.mat.color.set(0xffffff)
        p.mat.needsUpdate = true
        p.bound = true
      }
      let y = 0
      let sw = w
      let sh = h
      if (focus.active && focus.pool === pi) {
        sw = w * focusScale
        sh = h * focusScale
      } else if (drop[pi] > 0) y = -drop[pi] * H * 1.4
      p.mesh.visible = true
      let px = x
      let py = y
      if (entering || growing) {
        // entry: only the middle lap, sized 80px → full, stacked from the centre item outwards
        const r = rise[pi] || 0
        sh = 80 + (h - 80) * (grow[pi] || 0)
        sw = sh * m.aspect
        const ci = nearestI(current)
        let d = p.src - ci
        if (d > n / 2) d -= n
        if (d < -n / 2) d += n
        if (lap !== MID) {
          p.mesh.visible = false
          xs[pi] = undefined
          return
        }
        const sizeOf = (i: number) => 80 + (ph - 80) * (grow[MID * n + i] || 0)
        let off = 0
        if (d > 0)
          for (let k = 0; k < d; k++) {
            const a = (((ci + k) % n) + n) % n
            const b = (((ci + k + 1) % n) + n) % n
            off += (media[a].aspect * sizeOf(a) + media[b].aspect * sizeOf(b)) / 2 + gap
          }
        else if (d < 0)
          for (let k = 0; k < -d; k++) {
            const a = (((ci - k) % n) + n) % n
            const b = (((ci - k - 1) % n) + n) % n
            off -= (media[a].aspect * sizeOf(a) + media[b].aspect * sizeOf(b)) / 2 + gap
          }
        px = off
        if (px < -half - ph || px > half + ph) {
          p.mesh.visible = false
          xs[pi] = undefined
          return
        }
        const from = -0.9 * H
        py = from + (y - from) * r
      }
      p.mesh.position.set(px, py, 0)
      p.mesh.scale.set(sw, sh, 1)
      const cx = x + W / 2
      const cy = H / 2 - y
      hits.push({ left: cx - sw / 2, right: cx + sw / 2, top: cy - h / 2, bottom: cy + h / 2, pool: pi, src: p.src, cx: x })
      if (Math.abs(x) < bestD) {
        bestD = Math.abs(x)
        centre = { src: p.src, pool: pi }
      }
    })
  }
  const hitAt = (x: number, y: number) => hits.find((h) => x >= h.left && x <= h.right && y >= h.top && y <= h.bottom) ?? null
  const local = (e: PointerEvent | MouseEvent) => {
    const r = canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  // pointer: drag with momentum, hover label, click to centre / focus
  let dragging = false
  let pointerId: number | null = null
  let lastX = 0
  let dragDist = 0
  let dragVel = 0
  let dragAt = 0
  let wasDrag = false
  let kind = 'mouse'
  let mx = NaN
  let my = NaN
  let inside = false
  let overPanel = false
  let labelOn = false
  let cursor = ''
  if (label) gsap.set(label, { xPercent: 20, yPercent: 30, scale: 0, autoAlpha: 0 })
  const labelX = label ? gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3.out' }) : null
  const labelY = label ? gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3.out' }) : null
  const setCursor = (c: string) => {
    if (c !== cursor) {
      cursor = c
      canvas.style.cursor = c
    }
  }
  const busy = () => focus.active || entering || growing
  const refreshCursor = () => setCursor(busy() ? '' : dragging ? 'grabbing' : overPanel ? 'grab' : '')
  const showLabel = (on: boolean) => {
    if (busy() || dragging) on = false
    if (on === labelOn) return refreshCursor()
    labelOn = on
    refreshCursor()
    if (!label) return
    gsap.killTweensOf(label, 'scale,autoAlpha')
    gsap.to(label, { scale: on ? 1 : 0, autoAlpha: on ? 1 : 0, duration: rm ? 0 : on ? 0.35 : 0.25, ease: on ? 'power3.out' : 'power3.in' })
  }
  const hover = (on: boolean) => {
    overPanel = on
    showLabel(on)
  }

  const onWheel = (e: WheelEvent) => {
    if (busy()) return
    if (!e.shiftKey && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    e.preventDefault()
    moved = true
    pending = null
    target += 1.4 * (e.deltaX || e.deltaY)
    settledAt = performance.now()
    snapped = false
  }
  const onDown = (e: PointerEvent) => {
    wasDrag = false
    if (busy() || dragging || (e.button !== 0 && e.pointerType === 'mouse')) return
    dragging = true
    pointerId = e.pointerId
    kind = e.pointerType || 'mouse'
    try {
      canvas.setPointerCapture(e.pointerId)
    } catch { }
    const p = local(e)
    lastX = p.x
    mx = p.x
    my = p.y
    dragDist = 0
    dragVel = 0
    dragAt = performance.now()
    showLabel(false)
    velocity = 0
    pending = null
    moved = true
    snapped = false
    settledAt = dragAt
  }
  const onMove = (e: PointerEvent) => {
    const p = local(e)
    if (dragging && e.pointerId === pointerId) {
      const k = kind === 'mouse' ? 1.6 : 1
      const dx = p.x - lastX
      lastX = p.x
      dragDist += Math.abs(dx)
      target -= dx * k
      dragVel = 0.6 * dragVel + -dx * k * 0.4
      settledAt = dragAt = performance.now()
      snapped = false
    }
    mx = p.x
    my = p.y
    inside = true
    if (e.pointerType === 'mouse') {
      labelX?.(p.x)
      labelY?.(p.y)
      if (focus.active) return hover(false)
      hover(hitAt(p.x, p.y) !== null)
    }
  }
  const onUp = (e?: PointerEvent) => {
    if (!dragging || (e && pointerId !== null && e.pointerId !== pointerId)) return
    dragging = false
    if (pointerId !== null) {
      try {
        canvas.releasePointerCapture(pointerId)
      } catch { }
      pointerId = null
    }
    velocity = e?.type === 'pointercancel' || performance.now() - dragAt > 90 ? 0 : dragVel
    dragVel = 0
    settledAt = performance.now()
    snapped = false
    wasDrag = dragDist > (kind === 'mouse' ? 6 : 12)
    if (kind === 'mouse') hover(hitAt(mx, my) !== null)
    else refreshCursor()
  }
  const onEnter = () => (inside = true)
  const onLeave = () => {
    inside = false
    hover(false)
  }
  const onClick = (e: MouseEvent) => {
    if (wasDrag) return void (wasDrag = false)
    if (busy()) return
    const p = local(e)
    const h = hitAt(p.x, p.y)
    if (!h) return
    if (centre && h.pool === centre.pool) {
      pending = null
      openFocus()
      return
    }
    moved = true
    velocity = 0
    target = centreOf(nearestK(current + h.cx))
    snapped = true
    pending = { src: h.src }
    showLabel(false)
  }

  function openFocus() {
    if (focus.active || !centre) return
    if (!media[centre.src].tex) return
    focus.active = true
    focus.src = centre.src
    focus.pool = centre.pool
    target = centreOf(nearestK(current))
    const cx = xs[focus.pool] || 0
    // the others drop away, nearest first
    const ranked = pool
      .map((_, i) => ({ i, x: xs[i] }))
      .filter((p) => p.i !== focus.pool && p.x !== undefined)
      .map((p) => ({ i: p.i, d: Math.abs((p.x ?? 0) - cx) }))
      .sort((a, b) => a.d - b.d)
    let rank = 0
    let lastD = -1
    const order = ranked.map((p) => {
      if (lastD >= 0 && p.d - lastD > 1) rank += 1
      lastD = p.d
      return { i: p.i, rank }
    })
    for (const k of LENS_KEYS) lensBase[k] = u[k].value
    focus.anim?.kill()
    const s = { v: focusScale }
    const tl = gsap.timeline()
    tl.to(focus, { lens: 0, duration: rm ? 0 : 0.85, ease: 'power3.out' }, 0)
    tl.to(s, { v: 1.18, duration: rm ? 0 : 0.9, ease: 'power3.out', onUpdate: () => (focusScale = s.v) }, 0)
    order.forEach((p) => tl.to(drop, { [p.i]: 1, duration: rm ? 0 : 0.7, ease: 'power4.out' }, rm ? 0 : 0.06 * p.rank))
    focus.anim = tl
    showLabel(false)
    o.onFocusChange(true)
  }
  function closeFocus() {
    if (!focus.active) return
    focus.anim?.kill()
    const cx = xs[focus.pool] || 0
    const ranked = pool
      .map((_, i) => ({ i, x: xs[i] }))
      .filter((p) => p.x !== undefined && (drop[p.i] || 0) > 0)
      .map((p) => ({ i: p.i, d: Math.abs((p.x ?? 0) - cx) }))
      .sort((a, b) => b.d - a.d)
    let rank = 0
    let lastD = -1
    const order = ranked.map((p) => {
      if (lastD >= 0 && lastD - p.d > 1) rank += 1
      lastD = p.d
      return { i: p.i, rank }
    })
    o.onFocusChange(false)
    const s = { v: focusScale }
    const tl = gsap.timeline({
      onComplete: () => {
        focus.active = false
        focus.src = -1
        refreshCursor()
      },
    })
    tl.to(focus, { lens: 1, duration: rm ? 0 : 0.68, ease: 'power3.inOut' }, 0)
    tl.to(s, { v: 1, duration: rm ? 0 : 0.765, ease: 'power3.out', onUpdate: () => (focusScale = s.v) }, 0)
    order.forEach((p) => tl.to(drop, { [p.i]: 0, duration: rm ? 0 : 0.595, ease: 'power4.out' }, rm ? 0 : 0.06 * p.rank * 0.7))
    focus.anim = tl
  }
  function step(dir: 1 | -1) {
    if (busy()) return
    moved = true
    velocity = 0
    pending = null
    target = centreOf(nearestK(current) + dir)
    snapped = true
    settledAt = performance.now()
  }

  function runEntry() {
    if (!playEntry) return o.onEntryDone(true)
    entryAnim?.kill()
    rise.fill(0)
    grow.fill(0)
    entering = true
    growing = false
    o.onEntryDone(false)
    focus.lens = 0
    current = target = centreOf(nearestK(current))
    velocity = 0
    snapped = true
    place()
    const shown: number[] = []
    for (let i = 0; i < xs.length; i++) if (xs[i] !== undefined) shown.push(i)
    const tl = gsap.timeline({ delay: 0.5 })
    const spread = 0.07 * Math.max(shown.length - 1, 1)
    let riseEnd = 0
    shown.forEach((i) => {
      const at = Math.random() * spread
      riseEnd = Math.max(riseEnd, at + 1)
      tl.to(rise, { [i]: 1, duration: 1, ease: 'power3.out' }, at)
    })
    tl.call(
      () => {
        entering = false
        growing = true
      },
      [],
      riseEnd,
    )
    const ci = nearestI(current)
    const ranked: { i: number; rank: number }[] = []
    let maxRank = 0
    for (let i = 0; i < xs.length; i++) {
      if (xs[i] === undefined || Math.floor(i / n) !== MID) continue
      let d = (i % n) - ci
      if (d > n / 2) d -= n
      if (d < -n / 2) d += n
      const r = Math.abs(d)
      maxRank = Math.max(maxRank, r)
      ranked.push({ i, rank: r })
    }
    const glassAt = riseEnd + 0.25
    let end = glassAt
    tl.to(focus, { lens: 1, duration: 1.4, ease: 'power2.inOut' }, glassAt)
    ranked.forEach((p) => {
      const at = glassAt + (maxRank - p.rank) * 0.085
      end = Math.max(end, at + 2.15)
      tl.to(grow, { [p.i]: 1, duration: 2.15, ease: 'expo.inOut' }, at)
    })
    tl.call(
      () => {
        growing = false
        grow.fill(1)
        o.onEntryDone(true)
        refreshCursor()
      },
      [],
      end,
    )
    entryAnim = tl
  }

  canvas.addEventListener('wheel', onWheel, { passive: false })
  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerup', onUp)
  canvas.addEventListener('pointercancel', onUp)
  canvas.addEventListener('pointerenter', onEnter)
  canvas.addEventListener('pointerleave', onLeave)
  canvas.addEventListener('click', onClick)

  let raf = 0
  let visible = false
  let activeIndex = -1
  function frame() {
    if (!alive) return
    if (!visible || document.hidden) return void (raf = 0)
    if (!dragging) {
      target += velocity
      velocity *= 0.865
      if (Math.abs(velocity) < 0.05) velocity = 0
      if (!snapped && !focus.active && performance.now() - settledAt > 120) {
        target = centreOf(nearestK(current))
        snapped = true
      }
    }
    const ease = dragging && kind !== 'mouse' ? 0.22 : snapped && !pending ? (rm ? 1 : 0.05) : rm ? 1 : 0.09
    current += (target - current) * ease
    const i = nearestI(current)
    if (i !== activeIndex) {
      activeIndex = i
      o.onActiveChange(i)
    }
    const d = current - last
    last = current
    const s = rm ? 0 : Math.min(1, Math.abs(d) / 60)
    speed += (s - speed) * (s > speed ? 0.25 : 0.06)
    place()
    if (inside && kind === 'mouse' && Number.isFinite(mx)) {
      if (focus.active) hover(false)
      else hover(hitAt(mx, my) !== null)
    }
    if (pending && !focus.active && Math.abs(target - current) < 0.5) {
      const p = pending
      pending = null
      if (centre && centre.src === p.src) openFocus()
    }
    u.uAspect.value = W / H
    u.uTime.value = rm ? 0 : performance.now() * 0.001
    for (const k of LENS_KEYS) u[k].value = lensBase[k] * focus.lens
    renderer.setRenderTarget(rt)
    renderer.render(scene, cam)
    renderer.setRenderTarget(null)
    renderer.render(post, postCam)
    raf = requestAnimationFrame(frame)
  }
  const start = () => {
    if (alive && !raf) raf = requestAnimationFrame(frame)
  }

  const ro = new ResizeObserver(() => {
    W = Math.max(1, host.clientWidth)
    H = Math.max(1, host.clientHeight)
    ph = panelH()
    layout()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(W, H)
    cam.left = -W / 2
    cam.right = W / 2
    cam.top = H / 2
    cam.bottom = -H / 2
    cam.updateProjectionMatrix()
    rt.setSize(W * dpr, H * dpr)
    u.uRes.value.set(W * dpr, H * dpr)
    u.uSizeX.value = (W / 2 - 6) / H
    u.uSizeY.value = (H / 2 - 6) / H
    target = current = moved ? centreOf(activeIndex < 0 ? 0 : activeIndex) : centreOf(0)
  })
  ro.observe(host)

  let entered = false
  const io = new IntersectionObserver(([e]) => {
    const r = e?.boundingClientRect
    if (!r || (r.width === 0 && r.height === 0)) return
    visible = e.isIntersecting
    if (visible) {
      if (!entered) {
        entered = true
        runEntry()
      }
      entryAnim?.resume()
      focus.anim?.resume()
      start()
    } else {
      entryAnim?.pause()
      focus.anim?.pause()
    }
  })
  io.observe(host)
  const onVis = () => {
    if (!document.hidden && visible) {
      entryAnim?.resume()
      focus.anim?.resume()
      start()
    } else {
      entryAnim?.pause()
      focus.anim?.pause()
    }
  }
  document.addEventListener('visibilitychange', onVis)
  const onReduced = () => {
    rm = reduced.matches
    u.uShimmer.value = rm ? 0 : 1
    if (rm) {
      entryAnim?.progress(1)
      focus.anim?.progress(1)
      entering = growing = false
      rise.fill(1)
      grow.fill(1)
      o.onEntryDone(true)
    }
  }
  reduced.addEventListener('change', onReduced)
  const onLost = (e: Event) => {
    e.preventDefault()
    destroy()
    o.onError()
  }
  canvas.addEventListener('webglcontextlost', onLost)
  renderer.debug.onShaderError = () => {
    destroy()
    o.onError()
  }

  function destroy() {
    if (!alive) return
    alive = false
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    reduced.removeEventListener('change', onReduced)
    canvas.removeEventListener('webglcontextlost', onLost)
    canvas.removeEventListener('wheel', onWheel)
    canvas.removeEventListener('pointerdown', onDown)
    canvas.removeEventListener('pointermove', onMove)
    canvas.removeEventListener('pointerup', onUp)
    canvas.removeEventListener('pointercancel', onUp)
    canvas.removeEventListener('pointerenter', onEnter)
    canvas.removeEventListener('pointerleave', onLeave)
    canvas.removeEventListener('click', onClick)
    focus.anim?.kill()
    entryAnim?.kill()
    if (label) gsap.killTweensOf(label)
    renderer.dispose()
    rt.dispose()
    quad.geometry.dispose()
    postMat.dispose()
    pool.forEach((p) => {
      p.mesh.geometry.dispose()
      p.mat.dispose()
    })
    media.forEach((m) => m.tex?.dispose())
    canvas.remove()
  }

  return { closeFocus, next: () => step(1), previous: () => step(-1), destroy }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function LiquidGlassCarousel({
  items = DEFAULT_ITEMS,
  panelHeight = 450,
  gap = 12,
  background = '#fff',
  ringColor = '#009dff',
  ring = 0.6,
  dispersion = 9,
  rim = 1,
  glow = 4.2,
  entry = true,
  className = '',
  onActiveChange,
}: LiquidGlassCarouselProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const engine = useRef<Engine | null>(null)
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(false)
  const [ready, setReady] = useState(!entry)
  const [failed, setFailed] = useState(false)
  const id = useId()
  const onActive = useRef(onActiveChange)
  useEffect(() => {
    onActive.current = onActiveChange
  }, [onActiveChange])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let gone = false
    const e = createEngine(host, labelRef.current, {
      items,
      panelHeight,
      gap,
      background,
      ringColor,
      ring,
      dispersion,
      rim,
      glow,
      entry,
      onActiveChange: (i) => {
        setActive(i)
        onActive.current?.(i)
      },
      onFocusChange: (f) => {
        setFocused(f)
          ; (f ? closeRef.current : rootRef.current)?.focus({ preventScroll: true })
      },
      onEntryDone: setReady,
      onError: () => !gone && setFailed(true),
    })
    if (!e) {
      queueMicrotask(() => !gone && setFailed(true))
      return () => void (gone = true)
    }
    engine.current = e
    return () => {
      gone = true
      e.destroy()
      engine.current = null
    }
  }, [items, panelHeight, gap, background, ringColor, ring, dispersion, rim, glow, entry])

  const item = items[active] ?? items[0]
  const fallback = failed || items.length === 0

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={id}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          engine.current?.next()
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          engine.current?.previous()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          engine.current?.closeFocus()
        } else if ((e.key === 'Enter' || e.key === ' ') && e.target === rootRef.current) {
          e.preventDefault()
          const c = hostRef.current?.querySelector('canvas')
          if (c) {
            const r = c.getBoundingClientRect()
            c.dispatchEvent(new MouseEvent('click', { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }))
          }
        }
      }}
      className={`relative h-full min-h-[320px] w-full overflow-hidden text-grey outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-grey/20 ${className}`}
      style={{ background }}
    >
      <p id={id} className="sr-only">
        Liquid glass carousel. Use arrow keys to browse, Enter to view, Escape to close.
      </p>
      <p className="sr-only" aria-live="polite">
        {item?.title ?? 'No items'}, {pad(items.length ? active + 1 : 0)} of {pad(items.length)}
        {focused ? ', focused' : ''}
      </p>

      {fallback ? (
        <ul className="absolute inset-0 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-5">
          {items.map((it, i) => (
            <li key={`${it.src}-${i}`} className="w-56 shrink-0 snap-center">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-grey/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt={it.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-3 text-sm font-medium">{it.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div ref={hostRef} className="absolute inset-0" />
      )}

      {!fallback && (
        <>
          <div
            ref={labelRef}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-20 rounded-full bg-grey px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-black uppercase"
          >
            View
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => engine.current?.closeFocus()}
            aria-label="Close focused item"
            tabIndex={focused ? 0 : -1}
            className="absolute top-[4.5%] right-[4%] z-20 flex min-h-11 items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-opacity duration-300"
            style={{ opacity: focused ? 1 : 0, pointerEvents: focused ? 'auto' : 'none' }}
          >
            Close
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="size-4">
              <path d="m3.5 3.5 9 9m0-9-9 9" />
            </svg>
          </button>
          <div className={`absolute inset-x-[4%] bottom-[3%] z-10 items-end justify-between ${focused ? 'hidden' : 'flex'}`}>
            <Arrow dir="prev" disabled={!ready} onClick={() => engine.current?.previous()} />
            <p className="pb-3 font-mono text-[11px] tracking-[0.18em] text-grey/50 tabular-nums">
              {pad(active + 1)} / {pad(items.length)}
            </p>
            <Arrow dir="next" disabled={!ready} onClick={() => engine.current?.next()} />
          </div>
        </>
      )}
    </div>
  )
}

function Arrow({ dir, disabled, onClick }: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous item' : 'Next item'}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-grey/15 bg-grey/8 text-grey backdrop-blur transition-colors hover:bg-grey hover:text-black disabled:opacity-40 disabled:hover:bg-grey/8 disabled:hover:text-grey"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4">
        {dir === 'prev' ? <path d="M13 8H3m4-4-4 4 4 4" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
      </svg>
    </button>
  )
}
