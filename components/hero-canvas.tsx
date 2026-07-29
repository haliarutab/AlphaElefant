'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const w = el.clientWidth
    const h = el.clientHeight

    /* ── Scene ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 1000)
    camera.position.set(0, 0, 4)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(w, h)
    renderer.setPixelRatio(1) // High performance optimization: Lock pixel ratio to 1
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    /* ── Particles ── */
    const COUNT = 1300 // Optimized particle count for stable 60 FPS
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)

    const types = new Uint8Array(COUNT)
    const brightness = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 14
      pos[i3 + 1] = (Math.random() - 0.5) * 9
      pos[i3 + 2] = (Math.random() - 0.5) * 7

      types[i] = Math.random() < 0.25 ? 0 : Math.random() < 0.55 ? 1 : 2
      brightness[i] = 0.35 + Math.random() * 0.65
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    /* ── Rings ── */
    const rings: { mesh: THREE.Mesh; axis: THREE.Vector3; speed: number; index: number }[] = []
    const ringDefs = [
      { r: 1.4, tube: 0.009, color: 0xe8500a, opacity: 0.7, speed: 0.004, ax: [1, 0.4, 0.1] },
      { r: 2.1, tube: 0.006, color: 0xe8500a, opacity: 0.35, speed: 0.0025, ax: [0.2, 1, 0.3] },
      { r: 3.0, tube: 0.004, color: 0xfaf6ee, opacity: 0.12, speed: 0.0018, ax: [0.5, 0.2, 1] },
    ]
    ringDefs.forEach(({ r, tube, color, opacity, speed, ax }, index) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 12, 80), // Reduced segments for performance
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
      )
      scene.add(mesh)
      rings.push({ mesh, axis: new THREE.Vector3(...(ax as [number, number, number])).normalize(), speed, index })
    })

    /* ── Color Updater ── */
    const updateColors = (dark: boolean) => {
      const activeOrange = new THREE.Color('#E8500A')
      const activeSecondary = dark ? new THREE.Color('#FAF6EE') : new THREE.Color('#1E3144')
      const activeNavy = dark ? new THREE.Color('#1E3B5C') : new THREE.Color('#8096AC')



      const cols = geo.attributes.color.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3
        const type = types[i]
        const c = type === 0 ? activeOrange : type === 1 ? activeSecondary : activeNavy
        const b = brightness[i]
        cols[i3] = c.r * b
        cols[i3 + 1] = c.g * b
        cols[i3 + 2] = c.b * b
      }
      geo.attributes.color.needsUpdate = true

      rings.forEach(({ mesh, index }) => {
        const ringColor = index === 0 ? 0xe8500a : index === 1 ? (dark ? 0xe8500a : 0x1e3144) : (dark ? 0xfaf6ee : 0x8096ac)
          ; (mesh.material as THREE.MeshBasicMaterial).color.setHex(ringColor)
      })
    }

    let lastThemeState = document.documentElement.classList.contains('dark')
    updateColors(lastThemeState)

    /* ── Mouse tracking ── */
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    /* ── Resize ── */
    const onResize = () => {
      if (!el) return
      const nw = el.clientWidth
      const nh = el.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize, { passive: true })

    /* ── Animation loop ── */
    let raf: number
    let t = 0
    let frameCount = 0
    const LERP = 0.055

    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.003
      frameCount++

      /* Optimized theme sync: Poll once every 30 frames */
      if (frameCount % 30 === 0) {
        const currentDark = document.documentElement.classList.contains('dark')
        if (currentDark !== lastThemeState) {
          lastThemeState = currentDark
          updateColors(currentDark)
        }
      }

      currentX += (targetX - currentX) * LERP
      currentY += (targetY - currentY) * LERP

      particles.rotation.y = t * 0.04 + currentX * 0.18
      particles.rotation.x = t * 0.02 - currentY * 0.12

      camera.position.x += (currentX * 0.45 - camera.position.x) * LERP
      camera.position.y += (-currentY * 0.30 - camera.position.y) * LERP
      camera.lookAt(scene.position)

      rings.forEach(({ mesh, axis, speed }) => mesh.rotateOnAxis(axis, speed))

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
