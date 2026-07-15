"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Интерактивная 3D-сцена главной страницы: стеклянный небоскрёб
 * со светящимися окнами, парящие документы с золотым обрезом,
 * узлы сети, восходящие потоки данных и пульсирующие кольца точности.
 *
 * Производительность:
 * — pixel ratio ограничен, счётчики частиц зависят от устройства;
 * — рендер останавливается вне вьюпорта и в фоновых вкладках;
 * — при prefers-reduced-motion рисуется один статичный кадр;
 * — все ресурсы освобождаются при размонтировании.
 */
export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* ——— возможности устройства ——— */
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!gl) return; // остаёмся на статичном постере
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowPower =
      (nav.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4;
    const small = host.clientWidth < 640;
    const budget = lowPower || small ? 0.5 : 1;

    /* ——— базовая сцена ——— */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071425, 0.026);

    const camera = new THREE.PerspectiveCamera(
      38,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      80
    );
    camera.position.set(0, 3.4, 11.6);
    camera.lookAt(0, 3.7, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !lowPower,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.8));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    host.appendChild(renderer.domElement);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(r: T): T => {
      disposables.push(r);
      return r;
    };

    /* ——— свет ——— */
    scene.add(new THREE.AmbientLight(0x39414d, 0.55));
    const key = new THREE.DirectionalLight(0xcfd8e6, 0.95);
    key.position.set(4.5, 9, 6);
    scene.add(key);
    const core = new THREE.PointLight(0xd7bc72, 2.4, 20, 1.6);
    core.position.set(0, 4.6, 0);
    scene.add(core);
    const rim = new THREE.PointLight(0x35598c, 1.5, 24, 1.7);
    rim.position.set(-6.5, 2.5, -5);
    scene.add(rim);

    const world = new THREE.Group();
    scene.add(world);

    /* ——— детерминированный «случайный» ——— */
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    /* ——— текстура окон башни ——— */
    const windowsTexture = () => {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 256;
      const x = c.getContext("2d")!;
      x.fillStyle = "#0c1f36";
      x.fillRect(0, 0, 128, 256);
      const cols = 6;
      const rows = 16;
      const cw = 128 / cols;
      const rh = 256 / rows;
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const v = rnd();
          if (v < 0.1) x.fillStyle = "#d7bc72";
          else if (v < 0.2) x.fillStyle = "#8fa3bd";
          else if (v < 0.55) x.fillStyle = "#16304f";
          else x.fillStyle = "#0a1a2e";
          x.fillRect(col * cw + cw * 0.2, r * rh + rh * 0.24, cw * 0.6, rh * 0.52);
        }
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 2;
      return track(t);
    };

    /* ——— башня ——— */
    const tower = new THREE.Group();
    world.add(tower);
    const segments = [
      { w: 2.7, h: 2.5, y: 1.25, rep: 2 },
      { w: 2.15, h: 2.25, y: 3.6, rep: 2 },
      { w: 1.62, h: 2.0, y: 5.7, rep: 1 },
      { w: 1.05, h: 1.3, y: 7.35, rep: 1 },
    ];
    const edgeMats: THREE.LineBasicMaterial[] = [];
    segments.forEach((s, i) => {
      const tex = windowsTexture();
      tex.repeat.set(s.rep, Math.max(1, Math.round(s.h * 1.4)) / 2 + 1);
      const geo = track(new THREE.BoxGeometry(s.w, s.h, s.w));
      const mat = track(
        new THREE.MeshStandardMaterial({
          map: tex,
          emissive: new THREE.Color(0xd7bc72),
          emissiveMap: tex,
          emissiveIntensity: 0.5,
          metalness: 0.35,
          roughness: 0.4,
          transparent: true,
          opacity: 0.97,
        })
      );
      const box = new THREE.Mesh(geo, mat);
      box.position.y = s.y;
      tower.add(box);

      const eGeo = track(new THREE.EdgesGeometry(geo));
      const eMat = track(
        new THREE.LineBasicMaterial({
          color: i === 3 ? 0xc4cdd8 : 0xd7bc72,
          transparent: true,
          opacity: i === 3 ? 0.4 : 0.55,
        })
      );
      edgeMats.push(eMat);
      const edges = new THREE.LineSegments(eGeo, eMat);
      edges.position.y = s.y;
      tower.add(edges);
    });

    /* шпиль */
    const spire = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.022, 0.022, 1.5, 6)),
      track(
        new THREE.MeshBasicMaterial({ color: 0xf3ebd6, transparent: true, opacity: 0.85 })
      )
    );
    spire.position.y = 8.72;
    tower.add(spire);
    const beacon = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.06, 10, 10)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0xd7bc72,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )
    );
    beacon.position.y = 9.5;
    tower.add(beacon);

    /* световое ядро внутри башни */
    const coreMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xf3ebd6,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const coreBeam = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.14, 0.2, 8.2, 10, 1, true)),
      coreMat
    );
    coreBeam.position.y = 4.15;
    tower.add(coreBeam);

    /* ——— основание ——— */
    const podium = new THREE.Mesh(
      track(new THREE.BoxGeometry(4.4, 0.24, 4.4)),
      track(new THREE.MeshStandardMaterial({ color: 0x0b1d33, metalness: 0.55, roughness: 0.45 }))
    );
    podium.position.y = -0.12;
    world.add(podium);

    const groundAlpha = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(64, 64, 6, 64, 64, 64);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(1, "#000000");
      x.fillStyle = g;
      x.fillRect(0, 0, 128, 128);
      return track(new THREE.CanvasTexture(c));
    })();
    const ground = new THREE.Mesh(
      track(new THREE.CircleGeometry(6.6, 48)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0x0a1c31,
          transparent: true,
          alphaMap: groundAlpha,
          opacity: 0.9,
          depthWrite: false,
        })
      )
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.24;
    world.add(ground);

    const staticRing = new THREE.Mesh(
      track(new THREE.RingGeometry(2.7, 2.75, 72)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0xb8963e,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        })
      )
    );
    staticRing.rotation.x = -Math.PI / 2;
    staticRing.position.y = 0.02;
    world.add(staticRing);

    const pulseRings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }[] = [];
    for (let i = 0; i < 2; i++) {
      const mat = track(
        new THREE.MeshBasicMaterial({
          color: 0xd7bc72,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const mesh = new THREE.Mesh(track(new THREE.RingGeometry(1, 1.045, 72)), mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0.03;
      world.add(mesh);
      pulseRings.push({ mesh, mat, offset: i * 0.5 });
    }

    /* ——— парящие документы ——— */
    const docTexture = (variant: number) => {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 164;
      const x = c.getContext("2d")!;
      x.fillStyle = "#f7f9fc";
      x.fillRect(0, 0, 128, 164);
      x.fillStyle = "#b8963e";
      x.fillRect(14, 14, 34, 6);
      x.strokeStyle = "#c9d3de";
      x.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        x.beginPath();
        x.moveTo(14, 40 + i * 14);
        x.lineTo(14 + 70 + rnd() * 30, 40 + i * 14);
        x.stroke();
      }
      if (variant === 0) {
        /* финансовый отчёт: столбики */
        x.fillStyle = "#0b1d33";
        [22, 34, 26, 44].forEach((h, i) => x.fillRect(18 + i * 24, 148 - h, 12, h));
        x.fillStyle = "#b8963e";
        x.fillRect(18 + 3 * 24, 148 - 44, 12, 10);
      } else if (variant === 1) {
        /* договор: подпись */
        x.strokeStyle = "#0b1d33";
        x.lineWidth = 3.5;
        x.beginPath();
        x.moveTo(16, 140);
        x.bezierCurveTo(34, 118, 44, 152, 62, 132);
        x.bezierCurveTo(74, 120, 84, 142, 98, 130);
        x.stroke();
        x.strokeStyle = "#b8963e";
        x.lineWidth = 2;
        x.beginPath();
        x.moveTo(16, 150);
        x.lineTo(104, 150);
        x.stroke();
      } else {
        /* заключение: печать */
        x.strokeStyle = "#b8963e";
        x.lineWidth = 4;
        x.beginPath();
        x.arc(94, 130, 20, 0, Math.PI * 2);
        x.stroke();
        x.beginPath();
        x.moveTo(85, 130);
        x.lineTo(92, 137);
        x.lineTo(104, 121);
        x.stroke();
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return track(t);
    };

    const docGeo = track(new THREE.BoxGeometry(0.6, 0.78, 0.016));
    const docEdge = track(
      new THREE.MeshStandardMaterial({ color: 0xb8963e, metalness: 0.85, roughness: 0.3 })
    );
    const docBack = track(new THREE.MeshBasicMaterial({ color: 0xe6ebf2 }));
    type Doc = {
      mesh: THREE.Mesh;
      r: number;
      h: number;
      speed: number;
      phase: number;
      bob: number;
    };
    const docs: Doc[] = [];
    const docCount = Math.round(7 * budget) || 4;
    for (let i = 0; i < docCount; i++) {
      const face = track(new THREE.MeshBasicMaterial({ map: docTexture(i % 3) }));
      const mesh = new THREE.Mesh(docGeo, [docEdge, docEdge, docEdge, docEdge, face, docBack]);
      const d: Doc = {
        mesh,
        r: 2.7 + rnd() * 1.9,
        h: 1.3 + rnd() * 5.6,
        speed: (0.1 + rnd() * 0.16) * (i % 2 ? 1 : -1),
        phase: rnd() * Math.PI * 2,
        bob: 0.14 + rnd() * 0.2,
      };
      mesh.scale.setScalar(0.85 + rnd() * 0.5);
      world.add(mesh);
      docs.push(d);
    }

    /* ——— узлы сети и связи ——— */
    type Node = { mesh: THREE.Mesh; r: number; h: number; speed: number; phase: number };
    const nodes: Node[] = [];
    const nodeGeo = track(new THREE.OctahedronGeometry(0.075));
    const nodeMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xd7bc72,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const nodeCount = 5;
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      world.add(mesh);
      nodes.push({
        mesh,
        r: 3.4 + rnd() * 1.7,
        h: 2 + rnd() * 5.4,
        speed: (0.08 + rnd() * 0.12) * (i % 2 ? -1 : 1),
        phase: (i / nodeCount) * Math.PI * 2,
      });
    }
    const linkGeo = track(new THREE.BufferGeometry());
    linkGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(nodeCount * 2 * 3), 3)
    );
    const linkMat = track(
      new THREE.LineBasicMaterial({
        color: 0xc4cdd8,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    world.add(new THREE.LineSegments(linkGeo, linkMat));

    const ringGeo = track(new THREE.BufferGeometry());
    ringGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array((nodeCount + 1) * 3), 3)
    );
    const ringMat = track(
      new THREE.LineBasicMaterial({
        color: 0xb8963e,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    world.add(new THREE.Line(ringGeo, ringMat));

    /* ——— золотая пыль (восходящие частицы) ——— */
    const makeDust = (count: number, color: number, size: number, opacity: number) => {
      const geo = track(new THREE.BufferGeometry());
      const pos = new Float32Array(count * 3);
      const speeds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const a = rnd() * Math.PI * 2;
        const r = 1.6 + rnd() * 5;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = rnd() * 9.4;
        pos[i * 3 + 2] = Math.sin(a) * r;
        speeds[i] = 0.14 + rnd() * 0.4;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = track(
        new THREE.PointsMaterial({
          color,
          size,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        })
      );
      world.add(new THREE.Points(geo, mat));
      return { pos, speeds, count, geo };
    };
    const dustGold = makeDust(Math.round(420 * budget), 0xd7bc72, 0.05, 0.75);
    const dustSilver = makeDust(Math.round(200 * budget), 0xc4cdd8, 0.034, 0.42);

    /* ——— спиральные потоки данных ——— */
    const makeHelix = (count: number, dir: 1 | -1, phase: number) => {
      const geo = track(new THREE.BufferGeometry());
      const pos = new Float32Array(count * 3);
      const ts = new Float32Array(count);
      for (let i = 0; i < count; i++) ts[i] = i / count;
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = track(
        new THREE.PointsMaterial({
          color: 0xf0dfae,
          size: 0.062,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        })
      );
      world.add(new THREE.Points(geo, mat));
      return { geo, pos, ts, dir, phase, count };
    };
    const helixes = [
      makeHelix(Math.round(110 * budget) || 60, 1, 0),
      makeHelix(Math.round(110 * budget) || 60, -1, Math.PI),
    ];

    /* ——— взаимодействие ——— */
    world.rotation.y = -0.42;
    let nx = 0;
    let ny = 0;
    let autoY = -0.42;
    let scrollShift = 0;
    const onPointer = (e: PointerEvent) => {
      nx = (e.clientX / window.innerWidth) * 2 - 1;
      ny = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scrollShift = Math.min(window.scrollY / window.innerHeight, 1);
    };

    /* ——— кадр ——— */
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      autoY += dt * 0.05;
      const targetY = autoY + nx * 0.22;
      world.rotation.y += (targetY - world.rotation.y) * 0.05;
      world.rotation.x += (scrollShift * 0.05 - world.rotation.x) * 0.06;
      world.position.y += (scrollShift * 1.15 - world.position.y) * 0.06;
      camera.position.x += (nx * 0.55 - camera.position.x) * 0.045;
      camera.position.y += (3.4 - ny * 0.35 - camera.position.y) * 0.045;
      camera.lookAt(0, 3.7, 0);

      /* пульс ядра и маяка */
      coreMat.opacity = 0.34 + Math.sin(t * 1.8) * 0.12;
      beacon.scale.setScalar(1 + Math.sin(t * 2.4) * 0.35);
      edgeMats.forEach((m, i) => {
        m.opacity = (i === 3 ? 0.4 : 0.5) + Math.sin(t * 1.4 + i) * 0.1;
      });

      /* кольца точности */
      for (const p of pulseRings) {
        const ph = (t * 0.3 + p.offset) % 1;
        p.mesh.scale.setScalar(0.9 + ph * 3.1);
        p.mat.opacity = (1 - ph) * 0.38;
      }

      /* документы */
      for (const d of docs) {
        d.phase += dt * d.speed;
        const x = Math.cos(d.phase) * d.r;
        const z = Math.sin(d.phase) * d.r;
        d.mesh.position.set(x, d.h + Math.sin(t * 0.9 + d.phase * 3) * d.bob, z);
        d.mesh.rotation.y = -d.phase + Math.PI / 2 + Math.sin(t * 0.6 + d.phase) * 0.12;
        d.mesh.rotation.z = Math.sin(t * 0.5 + d.phase * 2) * 0.05;
      }

      /* узлы и связи */
      const lp = linkGeo.getAttribute("position") as THREE.BufferAttribute;
      const rp = ringGeo.getAttribute("position") as THREE.BufferAttribute;
      nodes.forEach((n, i) => {
        n.phase += dt * n.speed;
        const x = Math.cos(n.phase) * n.r;
        const z = Math.sin(n.phase) * n.r;
        const y = n.h + Math.sin(t * 0.7 + i) * 0.25;
        n.mesh.position.set(x, y, z);
        n.mesh.rotation.y = t * 0.8 + i;
        lp.setXYZ(i * 2, x, y, z);
        tmp.set(0, y * 0.88, 0);
        lp.setXYZ(i * 2 + 1, tmp.x, tmp.y, tmp.z);
        rp.setXYZ(i, x, y, z);
      });
      rp.setXYZ(nodeCount, nodes[0].mesh.position.x, nodes[0].mesh.position.y, nodes[0].mesh.position.z);
      lp.needsUpdate = true;
      rp.needsUpdate = true;

      /* пыль */
      for (const dust of [dustGold, dustSilver]) {
        for (let i = 0; i < dust.count; i++) {
          let y = dust.pos[i * 3 + 1] + dust.speeds[i] * dt;
          if (y > 9.6) y = 0;
          dust.pos[i * 3 + 1] = y;
        }
        (dust.geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      }

      /* спирали */
      for (const h of helixes) {
        for (let i = 0; i < h.count; i++) {
          h.ts[i] = (h.ts[i] + dt * 0.055) % 1;
          const tt = h.ts[i];
          const ang = tt * Math.PI * 5.5 * h.dir + h.phase + t * 0.25 * h.dir;
          const r = 1.35 + Math.sin(tt * Math.PI) * 0.22;
          h.pos[i * 3] = Math.cos(ang) * r;
          h.pos[i * 3 + 1] = tt * 8.4;
          h.pos[i * 3 + 2] = Math.sin(ang) * r;
        }
        (h.geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    /* ——— цикл с паузами ——— */
    let raf = 0;
    let inView = true;
    let running = false;
    const loop = () => {
      renderFrame();
      raf = requestAnimationFrame(loop);
    };
    const setRunning = (on: boolean) => {
      if (on === running) return;
      running = on;
      if (on) {
        clock.getDelta();
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (!reduced) setRunning(inView && !document.hidden);
      },
      { threshold: 0 }
    );
    io.observe(host);
    const onVis = () => {
      if (!reduced) setRunning(inView && !document.hidden);
    };
    document.addEventListener("visibilitychange", onVis);

    /* ——— resize ——— */
    const ro = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = Math.max(host.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduced) renderFrame();
    });
    ro.observe(host);

    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* первый кадр и сигнал готовности */
    renderFrame();
    let readyRaf = requestAnimationFrame(() => {
      readyRaf = requestAnimationFrame(() => readyRef.current?.());
    });
    if (!reduced) setRunning(true);

    return () => {
      setRunning(false);
      cancelAnimationFrame(readyRaf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
