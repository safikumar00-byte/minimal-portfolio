// Infinite Drag Canvas by Made for Award: https://www.madeforaward.com/ui/galleries/infinite-drag-canvas
// Free and open source (MIT). If it helped, a star means a lot: https://github.com/shivc868/madeforaward-ui
'use client'

import {useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

gsap.registerPlugin(useGSAP)

export type CanvasItem = {
  /** a photo; leave it out for a tile of colour and type */
  src?: string
  title: string
  /** a smaller line under the title */
  meta?: string
  /** the colour of a type tile */
  color?: string
  /** its text colour */
  ink?: string
}

export type InfiniteDragCanvasProps = {
  items?: CanvasItem[]
  /** width of a tile, px; it shrinks on narrow screens */
  size?: number
  /** space between tiles, px */
  gap?: number
  /** how far it coasts after you let go */
  inertia?: number
  /** how far the board falls back while you drag, 0–0.4 */
  zoomOut?: number
  /** how far it leans into the movement, in degrees */
  tilt?: number
  /** px per second it drifts by itself; 0 holds it still */
  drift?: number
  /** which way it can be dragged; 'x' leaves vertical swipes to the page on touch */
  axis?: 'both' | 'x'
  /** let a trackpad or wheel pan it; the page won't scroll while over it */
  wheel?: boolean
  /** a photo was opened */
  onOpen?: (item: CanvasItem) => void
  onCanvasActivate?: () => void
  className?: string
}

const photo = (id: string, title: string, meta: string): CanvasItem => ({
  src: `https://images.unsplash.com/${id}?w=640&q=70&auto=format&fit=crop`,
  title,
  meta,
})
const DEFAULT_ITEMS: CanvasItem[] = [
  photo('photo-1549068106-b024baf5062d', 'Neon, 2am', 'Portrait'),
  {title: 'Drag me', color: '#ffd400', ink: '#111111', meta: 'Any direction'},
  photo('photo-1495616811223-4d98c6e9c869', 'Last light', 'Landscape'),
  photo('photo-1531123897727-8f129e1688ce', 'Red room', 'Portrait'),
  {title: 'Open call', color: '#00a36c', ink: '#ffffff', meta: 'Spring edition'},
  photo('photo-1501785888041-af3ef285b470', 'Turquoise', 'Landscape'),
  photo('photo-1501386761578-eac5c94b800a', 'Front row', 'Live'),
  {title: 'No end', color: '#ff3b1f', ink: '#111111', meta: 'It wraps around'},
  photo('photo-1490750967868-88aa4486c946', 'Poppy field', 'Nature'),
  photo('photo-1475924156734-496f6cac6ec1', 'Pink tide', 'Landscape'),
  {title: 'Archive', color: '#1f3bff', ink: '#ffffff', meta: 'Volume 12'},
  photo('photo-1561070791-2526d30994b5', 'Swatches', 'Studio'),
  photo('photo-1523712999610-f77fbcfc3843', 'Copper woods', 'Nature'),
  {title: 'Click a photo', color: '#ff5fa2', ink: '#111111', meta: 'To open it'},
  photo('photo-1483347756197-71ef80e95f73', 'Aurora', 'Night'),
  photo('photo-1476820865390-c52aeebb9891', 'Autumn road', 'Landscape'),
  photo('photo-1465101162946-4377e57745c3', 'Milky Way', 'Night'),
]

const TILE_RATIO = 1.22
const DRAG_START = 5

type Grid = {cols: number; rows: number; width: number; height: number; cellWidth: number; cellHeight: number}
type Opened = {tile: number; item: CanvasItem}

// A pin board with no edges. Tiles sit on a lattice that wraps around in both
// directions, so there's always more. Dragging pulls the board back a little and
// leans it into the movement, and it coasts when you let go. Photos open in a
// lightbox. Arrow keys pan it, focusing a tile brings it to the middle, Esc closes.
// Reduced motion keeps the drag and drops the drift, lean, zoom and coasting.
export default function InfiniteDragCanvas({
  items = DEFAULT_ITEMS,
  size = 300,
  gap = 18,
  inertia = 1,
  zoomOut = 0.14,
  tilt = 7,
  drift = 16,
  axis = 'both',
  wheel = false,
  onOpen,
  onCanvasActivate,
  className = '',
}: InfiniteDragCanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const tileRefs = useRef<(HTMLElement | null)[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [grid, setGrid] = useState<Grid | null>(null)
  const [opened, setOpened] = useState<Opened | null>(null)
  // Where the board is, kept across layouts, so a resize doesn't throw you back.
  const position = useRef({x: 0, y: 0, targetX: 0, targetY: 0})
  const dragged = useRef(false)
  const openedRef = useRef(false)
  const tuning = useRef({inertia, zoomOut, tilt, drift, axis})

  useEffect(() => {
    tuning.current = {inertia, zoomOut, tilt, drift, axis}
  }, [inertia, zoomOut, tilt, drift, axis])

  useEffect(() => {
    openedRef.current = opened !== null
  }, [opened])

  // How many tiles the lattice needs: enough to fill the box when zoomed out, plus
  // spares that wrap around unseen. An even count of columns keeps the brick offset
  // lined up across the seam.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      const width = root.clientWidth
      const height = root.clientHeight
      if (width < 2 || height < 2) return
      const tileWidth = Math.min(size, width * 0.62)
      const cellWidth = tileWidth + gap
      const cellHeight = tileWidth * TILE_RATIO + gap
      let cols = Math.ceil(width / 0.72 / cellWidth) + 3
      if (cols % 2) cols++
      const rows = Math.ceil(height / 0.72 / cellHeight) + 3
      setGrid((old) =>
        old && old.cols === cols && old.rows === rows && old.width === width && old.height === height && old.cellWidth === cellWidth
          ? old
          : {cols, rows, width, height, cellWidth, cellHeight},
      )
    }
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => ro.disconnect()
  }, [size, gap])

  useGSAP(
    () => {
      const root = rootRef.current
      const board = boardRef.current
      if (!root || !board || !grid) return
      const {cols, rows, width, height, cellWidth, cellHeight} = grid
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const tiles = tileRefs.current.slice(0, cols * rows)
      const spanX = cols * cellWidth
      const spanY = rows * cellHeight
      const wrapX = gsap.utils.wrap(-cellWidth * 1.5, spanX - cellWidth * 1.5)
      const wrapY = gsap.utils.wrap(-cellHeight * 1.5, spanY - cellHeight * 1.5)
      const startX = (width - spanX) / 2
      const startY = (height - spanY) / 2
      const pos = position.current

      const place = () => {
        tiles.forEach((tile, i) => {
          if (!tile) return
          const col = i % cols
          const row = Math.floor(i / cols)
          // Every other column sits half a tile lower: a brick pattern, not a table.
          const x = wrapX(col * cellWidth + startX + pos.x)
          const y = wrapY(row * cellHeight + (col % 2) * (cellHeight / 2) + startY + pos.y)
          tile.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        })
      }
      place()

      let visible = true
      let hovering = false
      let pointerId: number | null = null
      let dragging = false
      let downX = 0
      let downY = 0
      let lastX = 0
      let lastY = 0
      let velocityX = 0
      let velocityY = 0
      let spunX = 0
      let spunY = 0
      const toZoomX = gsap.quickTo(board, 'scaleX', {duration: 0.6, ease: 'power3.out'})
      const toZoomY = gsap.quickTo(board, 'scaleY', {duration: 0.6, ease: 'power3.out'})
      const toZoom = (scale: number) => {
        toZoomX(scale)
        toZoomY(scale)
      }
      const toTiltX = gsap.quickTo(board, 'rotationX', {duration: 0.5, ease: 'power3.out'})
      const toTiltY = gsap.quickTo(board, 'rotationY', {duration: 0.5, ease: 'power3.out'})
      const clampTilt = (v: number) => gsap.utils.clamp(-tuning.current.tilt, tuning.current.tilt, v)

      const tick = (_time: number, delta: number) => {
        if (!visible || document.hidden || openedRef.current) return
        const ratio = gsap.ticker.deltaRatio(60)
        const {drift: speed, axis: lane} = tuning.current
        if (!still && speed && !hovering && !dragging) {
          pos.targetX -= (speed * delta) / 1000
          if (lane === 'both') pos.targetY -= (speed * 0.6 * delta) / 1000
        }
        const follow = still ? 1 : 1 - Math.pow(0.86, ratio)
        const before = {x: pos.x, y: pos.y}
        pos.x += (pos.targetX - pos.x) * follow
        pos.y += (pos.targetY - pos.y) * follow
        spunX = pos.x - before.x
        spunY = pos.y - before.y
        if (Math.abs(spunX) > 0.01 || Math.abs(spunY) > 0.01) place()
        if (!still) {
          toTiltY(clampTilt(spunX * 0.42))
          toTiltX(clampTilt(-spunY * 0.42))
        }
      }
      gsap.ticker.add(tick)

      const onDown = (event: PointerEvent) => {
        if (event.button !== 0 || pointerId !== null) return
        pointerId = event.pointerId
        dragging = false
        dragged.current = false
        downX = lastX = event.clientX
        downY = lastY = event.clientY
        velocityX = velocityY = 0
      }
      const onMove = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return
        const lane = tuning.current.axis
        if (!dragging) {
          if (Math.hypot(event.clientX - downX, event.clientY - downY) < DRAG_START) return
          dragging = true
          dragged.current = true
          root.setPointerCapture(event.pointerId)
          root.dataset.dragging = ''
          if (!still) toZoom(1 - tuning.current.zoomOut)
        }
        const dx = event.clientX - lastX
        const dy = lane === 'both' ? event.clientY - lastY : 0
        lastX = event.clientX
        lastY = event.clientY
        velocityX = dx
        velocityY = dy
        pos.targetX += dx
        pos.targetY += dy
      }
      const onUp = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return
        pointerId = null
        if (!dragging) return
        dragging = false
        delete root.dataset.dragging
        if (still) return
        toZoom(1)
        // The hand's last speed carries it on.
        pos.targetX += velocityX * 16 * tuning.current.inertia
        pos.targetY += velocityY * 16 * tuning.current.inertia
      }
      const onEnter = () => {
        hovering = true
      }
      const onLeave = () => {
        hovering = false
      }
      const onWheel = (event: WheelEvent) => {
        if (!wheel || openedRef.current) return
        event.preventDefault()
        pos.targetX -= event.deltaX
        if (tuning.current.axis === 'both') pos.targetY -= event.deltaY
        else pos.targetX -= event.deltaY
      }
      root.addEventListener('pointerdown', onDown)
      root.addEventListener('pointermove', onMove)
      root.addEventListener('pointerup', onUp)
      root.addEventListener('pointercancel', onUp)
      root.addEventListener('pointerenter', onEnter)
      root.addEventListener('pointerleave', onLeave)
      root.addEventListener('wheel', onWheel, {passive: false})

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      io.observe(root)

      return () => {
        gsap.ticker.remove(tick)
        io.disconnect()
        root.removeEventListener('pointerdown', onDown)
        root.removeEventListener('pointermove', onMove)
        root.removeEventListener('pointerup', onUp)
        root.removeEventListener('pointercancel', onUp)
        root.removeEventListener('pointerenter', onEnter)
        root.removeEventListener('pointerleave', onLeave)
        root.removeEventListener('wheel', onWheel)
      }
    },
    {scope: rootRef, dependencies: [grid, wheel]},
  )

  // The lightbox grows out of the tile it came from.
  const boxFor = () => {
    const root = rootRef.current
    if (!root) return {left: 0, top: 0, width: 0, height: 0}
    const width = Math.min(root.clientWidth * 0.88, (root.clientHeight * 0.84) / TILE_RATIO)
    const height = width * TILE_RATIO
    return {left: (root.clientWidth - width) / 2, top: (root.clientHeight - height) / 2, width, height}
  }
  const tileBox = (tile: number) => {
    const root = rootRef.current
    const el = tileRefs.current[tile]
    if (!root || !el) return {left: 0, top: 0, width: 0, height: 0}
    const a = root.getBoundingClientRect()
    const b = el.getBoundingClientRect()
    return {left: b.left - a.left, top: b.top - a.top, width: b.width, height: b.height}
  }

  useGSAP(
    () => {
      if (!opened || !boxRef.current) return
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo(boxRef.current, tileBox(opened.tile), {...boxFor(), duration: still ? 0 : 0.7, ease: 'expo.out'})
      closeRef.current?.focus({preventScroll: true})
    },
    {dependencies: [opened]},
  )

  const close = () => {
    if (!opened || !boxRef.current) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tile = opened.tile
    gsap.to(boxRef.current, {
      ...tileBox(tile),
      duration: still ? 0 : 0.5,
      ease: 'expo.inOut',
      onComplete: () => {
        setOpened(null)
        tileRefs.current[tile]?.focus({preventScroll: true})
      },
    })
  }

  useEffect(() => {
    if (!opened) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (
      onCanvasActivate &&
      event.target === event.currentTarget &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault()
      onCanvasActivate()
      return
    }
    if (!grid || opened) return
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [grid.cellWidth, 0],
      ArrowRight: [-grid.cellWidth, 0],
      ArrowUp: [0, grid.cellHeight],
      ArrowDown: [0, -grid.cellHeight],
    }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    position.current.targetX += move[0]
    if (axis === 'both') position.current.targetY += move[1]
  }

  // Tabbing to a tile brings it to the middle, however far off it was.
  const bringToMiddle = (tile: number) => {
    const root = rootRef.current
    if (!root || !grid) return
    const box = tileBox(tile)
    position.current.targetX += root.clientWidth / 2 - (box.left + box.width / 2)
    position.current.targetY += root.clientHeight / 2 - (box.top + box.height / 2)
  }

  const tileWidth = grid ? grid.cellWidth - gap : 0
  const count = grid ? grid.cols * grid.rows : 0

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={onCanvasActivate
        ? 'Interactive graphic design canvas. Drag to explore; press Enter to expand.'
        : 'Gallery. Use the arrow keys to move around.'}
      aria-keyshortcuts={onCanvasActivate ? 'Enter Space' : undefined}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (
          event.target === event.currentTarget ||
          event.target === boardRef.current
        ) {
          onCanvasActivate?.()
        }
      }}
      data-lenis-prevent={wheel ? '' : undefined}
      className={`relative h-full w-full cursor-grab overflow-hidden outline-none select-none data-[dragging]:cursor-grabbing ${axis === 'both' ? 'touch-none' : 'touch-pan-y'} ${className}`}
    >
      <div className="absolute inset-0 perspective-[1600px]">
        <div ref={boardRef} className="absolute inset-0 will-change-transform">
          {Array.from({length: count}, (_, i) => {
            const col = grid ? i % grid.cols : 0
            const row = grid ? Math.floor(i / grid.cols) : 0
            // Stepping through the list by primes keeps a repeat away from itself, seams included.
            const item = items[(row * 7 + col * 11) % items.length]
            const shared = 'group absolute top-0 left-0 block overflow-hidden text-left outline-offset-2 focus-visible:outline-3 focus-visible:outline-current'
            const box = {width: tileWidth, height: tileWidth * TILE_RATIO}
            if (!item.src) {
              return (
                <div
                  key={i}
                  ref={(el) => {
                    tileRefs.current[i] = el
                  }}
                  className={`${shared} flex flex-col justify-between p-[6%] will-change-transform`}
                  style={{...box, backgroundColor: item.color ?? '#111111', color: item.ink ?? '#ffffff'}}
                >
                  <span className="text-[max(12px,calc(var(--tile)*0.05))] leading-tight opacity-80" style={{'--tile': `${tileWidth}px`} as React.CSSProperties}>
                    {item.meta}
                  </span>
                  <span className="text-[calc(var(--tile)*0.14)] leading-[1] font-extrabold tracking-tight" style={{'--tile': `${tileWidth}px`} as React.CSSProperties}>
                    {item.title}
                  </span>
                </div>
              )
            }
            return (
              <button
                key={i}
                type="button"
                ref={(el) => {
                  tileRefs.current[i] = el
                }}
                aria-label={`Open ${item.title}`}
                onFocus={() => bringToMiddle(i)}
                onClick={() => {
                  if (dragged.current) return
                  if (onCanvasActivate) {
                    onCanvasActivate()
                    return
                  }
                  setOpened({tile: i, item})
                  onOpen?.(item)
                }}
                className={`${shared} cursor-pointer bg-[#222] p-0 will-change-transform`}
                style={box}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col bg-black px-3 py-2 text-white transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <span className="text-sm font-bold">{item.title}</span>
                  {item.meta && <span className="text-xs opacity-70">{item.meta}</span>}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {opened && opened.item.src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={opened.item.title}
          className="absolute inset-0 z-10 cursor-default bg-black/70"
          onClick={close}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div ref={boxRef} className="absolute overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={opened.item.src} alt={opened.item.title} draggable={false} className="block h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-black px-4 py-3 text-white">
              <span className="flex flex-col">
                <span className="text-lg font-bold">{opened.item.title}</span>
                {opened.item.meta && <span className="text-sm opacity-70">{opened.item.meta}</span>}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="min-h-11 cursor-pointer border-2 border-white px-4 text-sm font-bold outline-offset-2 focus-visible:outline-2 focus-visible:outline-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
