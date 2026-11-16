"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type ModelOption = {
  id: "icon" | "emblem" | "hires";
  name: string;
  path: string;
  badge: string;
  defaultScaleMultiplier?: number;
};

const MODELS: ModelOption[] = [
  {
    id: "icon",
    name: "Icon",
    path: "/models/asset-4.glb",
    badge: "Asset 4 · Illustrator",
    defaultScaleMultiplier: 1.0,
  },
  {
    id: "emblem",
    name: "Emblem",
    path: "/models/layer-1.glb",
    badge: "Layer 1 · Chrome",
    defaultScaleMultiplier: 0.95,
  },
  {
    id: "hires",
    name: "Hi-Res",
    path: "/models/asset-5.glb",
    badge: "Asset 5 · High Poly",
    defaultScaleMultiplier: 1.0,
  },
];

const LIGHT_COLORS = [
  { label: "Emerald", hex: "#10b981" },
  { label: "Cyan", hex: "#06b6d4" },
  { label: "Gold", hex: "#f59e0b" },
  { label: "White", hex: "#ffffff" },
  { label: "Violet", hex: "#a855f7" },
];

export type SceneSettings = {
  modelId: "icon" | "emblem" | "hires";
  lightColor: string;
  lightIntensity: number;
  ambientIntensity: number;
  metalness: number;
  roughness: number;
  wireframe: boolean;
  autoRotateSpeed: number;
  scale: number;
};

const DEFAULT_SETTINGS: SceneSettings = {
  modelId: "icon",
  lightColor: "#10b981",
  lightIntensity: 2.2,
  ambientIntensity: 1.3,
  metalness: 0.75,
  roughness: 0.2,
  wireframe: false,
  autoRotateSpeed: 1.0,
  scale: 1.0,
};

export function Brand3DPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [settings, setSettings] = useState<SceneSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"light" | "material" | "motion" | "model">("light");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Settings ref for 60fps animate loop without React re-render stalls
  const settingsRef = useRef<SceneSettings>(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Animation and interaction refs
  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 }); // normalized -1 to +1
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Three.js scene refs
  const pivotGroupRef = useRef<THREE.Group | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Cache loaded GLTF objects to prevent reload delay
  const cacheRef = useRef<Map<string, THREE.Group>>(new Map());

  // Mouse move over the card
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mousePosRef.current = { x, y };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    isDraggingRef.current = false;
    mousePosRef.current = { x: 0, y: 0 };
    setIsHovered(false);
  };

  // Pointer drag controls for manual 3D orbit
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isSettingsOpen) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !pivotGroupRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    pivotGroupRef.current.rotation.y += dx * 0.018;
    pivotGroupRef.current.rotation.x += dy * 0.018;
    pivotGroupRef.current.rotation.x = Math.max(
      -Math.PI / 2.5,
      Math.min(Math.PI / 2.5, pivotGroupRef.current.rotation.x)
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Live update materials whenever metalness, roughness, or wireframe changes
  const applyMaterialSettings = useCallback((group: THREE.Group, s: SceneSettings) => {
    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.metalness = s.metalness;
          mat.roughness = s.roughness;
          mat.wireframe = s.wireframe;
          mat.side = THREE.DoubleSide;
          mat.needsUpdate = true;
        }
      }
    });
  }, []);

  // Update light colors live
  useEffect(() => {
    const color = new THREE.Color(settings.lightColor);
    if (pointLightRef.current) pointLightRef.current.color = color;
    if (rimLightRef.current) rimLightRef.current.color = color;
    if (ambientLightRef.current) ambientLightRef.current.intensity = settings.ambientIntensity;
    if (pivotGroupRef.current) applyMaterialSettings(pivotGroupRef.current, settings);
  }, [settings, applyMaterialSettings]);

  const { modelId } = settings;

  // Main Scene Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, settingsRef.current.ambientIntensity);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3.2, 4.0, 3.2);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xa7f3d0, 1.0);
    fillLight.position.set(-3.2, -2.5, 2.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(settingsRef.current.lightColor), 2.2);
    rimLight.position.set(-2.0, 3.5, -3.0);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const interactivePointLight = new THREE.PointLight(new THREE.Color(settingsRef.current.lightColor), 2.2, 8);
    interactivePointLight.position.set(0, 0, 2.8);
    scene.add(interactivePointLight);
    pointLightRef.current = interactivePointLight;

    // Pivot group that holds the model
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);
    pivotGroupRef.current = pivotGroup;

    // Responsive resize handler
    const updateSize = () => {
      const stage = canvas.parentElement;
      if (!stage) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Load active model
    let isCancelled = false;
    const currentModelDef =
      MODELS.find((m) => m.id === modelId) || MODELS[0];

    const setupModelInScene = (modelGroup: THREE.Group) => {
      while (pivotGroup.children.length > 0) {
        pivotGroup.remove(pivotGroup.children[0]);
      }

      const clone = modelGroup.clone(true);
      applyMaterialSettings(clone, settingsRef.current);

      // Center model at (0, 0, 0)
      const box = new THREE.Box3().setFromObject(clone);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      clone.position.sub(center);

      // Scale model
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scaleMultiplier = currentModelDef.defaultScaleMultiplier || 1.0;
      const targetScale = (2.35 / maxDim) * scaleMultiplier * settingsRef.current.scale;
      pivotGroup.scale.setScalar(targetScale);

      pivotGroup.add(clone);
      setIsLoading(false);
    };

    if (cacheRef.current.has(currentModelDef.path)) {
      const cached = cacheRef.current.get(currentModelDef.path)!;
      setupModelInScene(cached);
    } else {
      setIsLoading(true);
      const loader = new GLTFLoader();
      loader.load(
        currentModelDef.path,
        (gltf) => {
          if (isCancelled) return;
          cacheRef.current.set(currentModelDef.path, gltf.scene);
          setupModelInScene(gltf.scene);
        },
        undefined,
        (error) => {
          console.error("Failed to load 3D model:", error);
          if (!isCancelled) setIsLoading(false);
        }
      );
    }

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentSettings = settingsRef.current;

      if (pivotGroupRef.current) {
        const pivot = pivotGroupRef.current;

        // Dynamic scale adjustment
        const currentModel = MODELS.find((m) => m.id === currentSettings.modelId) || MODELS[0];
        const baseBox = new THREE.Box3().setFromObject(pivot);
        const bSize = new THREE.Vector3();
        baseBox.getSize(bSize);
        const maxDim = Math.max(bSize.x, bSize.y, bSize.z) || 1;
        const targetScale = (2.35 / maxDim) * (currentModel.defaultScaleMultiplier || 1.0) * currentSettings.scale;
        pivot.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Auto-rotation when not manually dragging
        if (!isDraggingRef.current && !prefersReducedMotion && currentSettings.autoRotateSpeed > 0) {
          const speedFactor = currentSettings.autoRotateSpeed;
          const rotSpeed = (isHoveredRef.current ? 0.016 : 0.009) * speedFactor;
          pivot.rotation.y += rotSpeed;

          const floatTiltX = Math.sin(elapsedTime * 1.4) * 0.06;
          const targetTiltX = isHoveredRef.current
            ? -mousePosRef.current.y * 0.42
            : floatTiltX;
          pivot.rotation.x += (targetTiltX - pivot.rotation.x) * 0.08;

          const targetTiltZ = isHoveredRef.current
            ? -mousePosRef.current.x * 0.22
            : 0;
          pivot.rotation.z += (targetTiltZ - pivot.rotation.z) * 0.08;
        }
      }

      // Dynamic light tracking mouse position
      if (pointLightRef.current) {
        const light = pointLightRef.current;
        const targetX = mousePosRef.current.x * 3.4;
        const targetY = -mousePosRef.current.y * 3.4;
        light.position.x += (targetX - light.position.x) * 0.12;
        light.position.y += (targetY - light.position.y) * 0.12;

        const baseMultiplier = currentSettings.lightIntensity / 2.2;
        const targetIntensity = (isHoveredRef.current ? 3.8 : 2.0) * baseMultiplier;
        light.intensity += (targetIntensity - light.intensity) * 0.1;
      }

      if (keyLightRef.current) {
        const key = keyLightRef.current;
        const baseMultiplier = currentSettings.lightIntensity / 2.2;
        const targetKeyIntensity = (isHoveredRef.current ? 2.8 : 2.2) * baseMultiplier;
        key.intensity += (targetKeyIntensity - key.intensity) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, [modelId, applyMaterialSettings]);

  const updateSetting = <K extends keyof SceneSettings>(key: K, value: SceneSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const activeModel = MODELS.find((m) => m.id === settings.modelId) || MODELS[0];

  return (
    <div
      className={`brand-preview brand-preview--3d${isHovered ? " is-hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* 3D Scene Controls Toggle Button */}
      <button
        aria-expanded={isSettingsOpen}
        aria-label="3D scene settings"
        className={`brand-3d-controls-trigger${isSettingsOpen ? " is-active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsSettingsOpen((prev) => !prev);
        }}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="12"
        >
          <line x1="4" x2="20" y1="21" y2="21" />
          <line x1="4" x2="20" y1="14" y2="14" />
          <line x1="4" x2="20" y1="7" y2="7" />
          <circle cx="9" cy="21" r="2" />
          <circle cx="15" cy="14" r="2" />
          <circle cx="7" cy="7" r="2" />
        </svg>
        <span>{isSettingsOpen ? "Close" : "Controls"}</span>
      </button>

      {/* Floating Glass Settings Panel */}
      {isSettingsOpen && (
        <div
          aria-label="3D canvas scene controls"
          className="brand-3d-panel"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="brand-3d-panel-header">
            <strong>3D Scene Controls</strong>
            <button
              aria-label="Close controls"
              className="brand-3d-panel-close"
              onClick={() => setIsSettingsOpen(false)}
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="brand-3d-panel-tabs">
            {(["light", "material", "motion", "model"] as const).map((tab) => (
              <button
                className={`brand-3d-tab-btn${activeTab === tab ? " is-active" : ""}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="brand-3d-panel-body">
            {/* LIGHT TAB */}
            {activeTab === "light" && (
              <div className="brand-3d-group">
                <label className="brand-3d-label">Light Tint</label>
                <div className="brand-3d-color-swatches">
                  {LIGHT_COLORS.map((c) => (
                    <button
                      aria-label={`Color ${c.label}`}
                      className={`brand-3d-swatch${settings.lightColor === c.hex ? " is-active" : ""}`}
                      key={c.hex}
                      onClick={() => updateSetting("lightColor", c.hex)}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                      type="button"
                    />
                  ))}
                </div>

                <div className="brand-3d-slider-row">
                  <div className="brand-3d-slider-head">
                    <span>Brightness</span>
                    <small>{settings.lightIntensity.toFixed(1)}x</small>
                  </div>
                  <input
                    aria-label="Light brightness"
                    className="brand-3d-slider"
                    max="4.5"
                    min="0.5"
                    onChange={(e) => updateSetting("lightIntensity", parseFloat(e.target.value))}
                    step="0.1"
                    type="range"
                    value={settings.lightIntensity}
                  />
                </div>

                <div className="brand-3d-slider-row">
                  <div className="brand-3d-slider-head">
                    <span>Ambient Light</span>
                    <small>{settings.ambientIntensity.toFixed(1)}</small>
                  </div>
                  <input
                    aria-label="Ambient intensity"
                    className="brand-3d-slider"
                    max="2.5"
                    min="0.2"
                    onChange={(e) => updateSetting("ambientIntensity", parseFloat(e.target.value))}
                    step="0.1"
                    type="range"
                    value={settings.ambientIntensity}
                  />
                </div>
              </div>
            )}

            {/* MATERIAL TAB */}
            {activeTab === "material" && (
              <div className="brand-3d-group">
                <div className="brand-3d-slider-row">
                  <div className="brand-3d-slider-head">
                    <span>Metalness</span>
                    <small>{Math.round(settings.metalness * 100)}%</small>
                  </div>
                  <input
                    aria-label="Metalness"
                    className="brand-3d-slider"
                    max="1.0"
                    min="0.0"
                    onChange={(e) => updateSetting("metalness", parseFloat(e.target.value))}
                    step="0.05"
                    type="range"
                    value={settings.metalness}
                  />
                </div>

                <div className="brand-3d-slider-row">
                  <div className="brand-3d-slider-head">
                    <span>Roughness (Gloss)</span>
                    <small>{Math.round(settings.roughness * 100)}%</small>
                  </div>
                  <input
                    aria-label="Roughness"
                    className="brand-3d-slider"
                    max="1.0"
                    min="0.0"
                    onChange={(e) => updateSetting("roughness", parseFloat(e.target.value))}
                    step="0.05"
                    type="range"
                    value={settings.roughness}
                  />
                </div>

                <div className="brand-3d-toggle-row">
                  <span>Wireframe Mesh</span>
                  <button
                    aria-pressed={settings.wireframe}
                    className={`brand-3d-switch${settings.wireframe ? " is-active" : ""}`}
                    onClick={() => updateSetting("wireframe", !settings.wireframe)}
                    type="button"
                  >
                    <span className="brand-3d-switch-knob" />
                  </button>
                </div>
              </div>
            )}

            {/* MOTION TAB */}
            {activeTab === "motion" && (
              <div className="brand-3d-group">
                <div className="brand-3d-slider-row">
                  <div className="brand-3d-slider-head">
                    <span>Auto-Rotation Speed</span>
                    <small>{settings.autoRotateSpeed === 0 ? "Paused" : `${settings.autoRotateSpeed.toFixed(1)}x`}</small>
                  </div>
                  <input
                    aria-label="Auto-rotation speed"
                    className="brand-3d-slider"
                    max="3.0"
                    min="0.0"
                    onChange={(e) => updateSetting("autoRotateSpeed", parseFloat(e.target.value))}
                    step="0.2"
                    type="range"
                    value={settings.autoRotateSpeed}
                  />
                </div>

                <div className="brand-3d-slider-row">
                  <div className="brand-3d-slider-head">
                    <span>Scale / Zoom</span>
                    <small>{Math.round(settings.scale * 100)}%</small>
                  </div>
                  <input
                    aria-label="Model scale"
                    className="brand-3d-slider"
                    max="1.6"
                    min="0.6"
                    onChange={(e) => updateSetting("scale", parseFloat(e.target.value))}
                    step="0.05"
                    type="range"
                    value={settings.scale}
                  />
                </div>

                <div className="brand-3d-action-row">
                  <button
                    className="brand-3d-btn-action"
                    onClick={() => updateSetting("autoRotateSpeed", settings.autoRotateSpeed === 0 ? 1.0 : 0)}
                    type="button"
                  >
                    {settings.autoRotateSpeed === 0 ? "▶ Resume Auto-Rotate" : "⏸ Pause Auto-Rotate"}
                  </button>
                </div>
              </div>
            )}

            {/* MODEL TAB */}
            {activeTab === "model" && (
              <div className="brand-3d-group">
                <label className="brand-3d-label">Available 3D Files</label>
                <div className="brand-3d-model-list">
                  {MODELS.map((m) => (
                    <button
                      className={`brand-3d-model-option${settings.modelId === m.id ? " is-active" : ""}`}
                      key={m.id}
                      onClick={() => updateSetting("modelId", m.id)}
                      type="button"
                    >
                      <span className="brand-3d-model-name">{m.name}</span>
                      <small className="brand-3d-model-desc">{m.badge}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="brand-3d-panel-footer">
            <button
              className="brand-3d-reset-btn"
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              type="button"
            >
              ↺ Reset to Defaults
            </button>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas Stage */}
      <div className="brand-3d-stage">
        {isLoading && (
          <div aria-hidden="true" className="brand-3d-loader">
            <span className="brand-3d-spinner" />
          </div>
        )}
        <canvas
          aria-label={`${activeModel.name} 3D model preview. Hover or drag to rotate.`}
          className="brand-3d-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          ref={canvasRef}
        />
        <div aria-hidden="true" className="brand-3d-hint">
          <span>{isHovered ? "Drag to rotate · Light follows cursor" : "Hover to light"}</span>
        </div>
      </div>
    </div>
  );
}
