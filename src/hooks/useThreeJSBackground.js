import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useThreeJSBackground = () => {
  const threeJsCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = threeJsCanvasRef.current;
    if (!canvas) return;

    let animId;
    let renderer;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      camera.position.z = 8;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const metrics = {
        width: window.innerWidth,
        height: window.innerHeight,
        xRange: 7,
        yRange: 4.5,
      };

      const geometries = [
        new THREE.TorusGeometry(1, 0.3, 16, 100),
        new THREE.OctahedronGeometry(0.8),
        new THREE.TetrahedronGeometry(1),
        new THREE.IcosahedronGeometry(0.6),
      ];

      const shapeConfigs = [
        {
          geometry: 0,
          color: 0x8B4513,
          opacity: 0.62,
          anchor: [-0.86, 0.38, -1.2],
          scale: 1.85,
          mobileScale: 1.12,
          drift: [0.08, 0.10, 0.30],
          cursor: 0.42,
        },
        {
          geometry: 1,
          color: 0xCD5C5C,
          opacity: 0.50,
          anchor: [-0.50, -0.40, -2.0],
          scale: 1.05,
          mobileScale: 0.72,
          drift: [0.10, 0.08, 0.34],
          cursor: -0.32,
        },
        {
          geometry: 2,
          color: 0xA0522D,
          opacity: 0.58,
          anchor: [-0.12, 0.56, -2.6],
          scale: 0.82,
          mobileScale: 0.58,
          drift: [0.06, 0.07, 0.28],
          cursor: 0.26,
        },
        {
          geometry: 3,
          color: 0xDC143C,
          opacity: 0.48,
          anchor: [0.42, 0.30, -1.8],
          scale: 1.55,
          mobileScale: 0.96,
          drift: [0.08, 0.09, 0.32],
          cursor: -0.34,
        },
        {
          geometry: 0,
          color: 0x8B4513,
          opacity: 0.44,
          anchor: [0.84, -0.32, -1.5],
          scale: 1.22,
          mobileScale: 0.80,
          drift: [0.07, 0.10, 0.30],
          cursor: 0.36,
        },
        {
          geometry: 2,
          color: 0xCD5C5C,
          opacity: 0.38,
          anchor: [0.12, -0.58, -2.8],
          scale: 0.68,
          mobileScale: 0.48,
          drift: [0.05, 0.06, 0.24],
          cursor: -0.20,
          hideOnMobile: true,
        },
      ];

      const shapes = [];
      const pointer = new THREE.Vector2(0, 0);
      const targetPointer = new THREE.Vector2(0, 0);

      const updateMetrics = () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        const aspect = width / Math.max(height, 1);

        metrics.width = width;
        metrics.height = height;
        metrics.xRange = THREE.MathUtils.clamp(aspect * 6.2, 4.8, 9.2);
        metrics.yRange = width < 768 ? 4.9 : 4.4;

        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const createShape = (config, index) => {
        if (metrics.width < 640 && config.hideOnMobile) return;

        const material = new THREE.MeshPhongMaterial({
          color: config.color,
          transparent: true,
          opacity: config.opacity,
          wireframe: true,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometries[config.geometry], material);

        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        mesh.userData = {
          ...config,
          phase: Math.random() * Math.PI * 2,
          floatSpeed: 0.18 + index * 0.035 + Math.random() * 0.04,
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.01
          ),
          home: new THREE.Vector3(),
          driftVector: new THREE.Vector3(),
          baseScale: 1,
        };

        shapes.push(mesh);
        scene.add(mesh);
      };

      const updateShapeLayout = () => {
        shapes.forEach((shape) => {
          const data = shape.userData;
          data.home.set(
            data.anchor[0] * metrics.xRange,
            data.anchor[1] * metrics.yRange,
            data.anchor[2]
          );
          data.driftVector.set(
            data.drift[0] * metrics.xRange,
            data.drift[1] * metrics.yRange,
            data.drift[2]
          );
          data.baseScale = metrics.width < 768 ? data.mobileScale : data.scale;
          shape.position.copy(data.home);
          shape.scale.setScalar(data.baseScale);
        });
      };

      updateMetrics();
      shapeConfigs.forEach(createShape);
      updateShapeLayout();

      scene.add(new THREE.AmbientLight(0x404040, 0.65));

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.85);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0x8B4513, 1, 22);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xCD5C5C, 1, 22);
      pointLight2.position.set(-5, -5, 5);
      scene.add(pointLight2);

      const updatePointer = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
        const y = -(((clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
        targetPointer.set(
          THREE.MathUtils.clamp(x, -1, 1),
          THREE.MathUtils.clamp(y, -1, 1)
        );
      };

      const onPointerMove = (event) => updatePointer(event.clientX, event.clientY);
      const resetPointer = () => targetPointer.set(0, 0);
      const renderScene = () => renderer.render(scene, camera);
      const onResize = () => {
        updateMetrics();
        updateShapeLayout();
        if (reducedMotion) renderScene();
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('blur', resetPointer);
      window.addEventListener('resize', onResize);

      let resizeObserver;
      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(canvas);
      }

      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        pointer.lerp(targetPointer, 0.055);
        camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (pointer.y * 0.38 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        shapes.forEach((shape) => {
          const data = shape.userData;
          shape.position.set(
            data.home.x + Math.sin(time * data.floatSpeed + data.phase) * data.driftVector.x + pointer.x * data.cursor,
            data.home.y + Math.cos(time * data.floatSpeed * 0.9 + data.phase) * data.driftVector.y + pointer.y * data.cursor * 0.58,
            data.home.z + Math.sin(time * data.floatSpeed * 0.7 + data.phase) * data.driftVector.z
          );

          shape.rotation.x += data.rotationSpeed.x + pointer.y * 0.0007;
          shape.rotation.y += data.rotationSpeed.y + pointer.x * 0.0008;
          shape.rotation.z += data.rotationSpeed.z;
          shape.scale.setScalar(data.baseScale * (1 + Math.sin(time * data.floatSpeed + data.phase) * 0.025));
        });

        pointLight1.position.x = Math.cos(time * 0.25) * 8;
        pointLight1.position.z = Math.sin(time * 0.25) * 6;
        pointLight2.position.x = Math.cos(time * 0.22 + Math.PI) * 8;
        pointLight2.position.z = Math.sin(time * 0.22 + Math.PI) * 6;

        renderScene();
      };

      if (reducedMotion) {
        renderScene();
      } else {
        animate();
      }

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('blur', resetPointer);
        window.removeEventListener('resize', onResize);
        resizeObserver?.disconnect();
        geometries.forEach((geometry) => geometry.dispose());
        shapes.forEach((shape) => shape.material.dispose());
        renderer.dispose();
      };
    } catch (err) {
      console.warn('Three.js WebGL unavailable, skipping background:', err.message);
    }
  }, []);

  return threeJsCanvasRef;
};
