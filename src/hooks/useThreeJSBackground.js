import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useThreeJSBackground = () => {
  const threeJsCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = threeJsCanvasRef.current;
    if (!canvas) {
      console.warn("Three.js canvas reference not available.");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.position.z = 8;

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.TorusGeometry(1, 0.3, 16, 100),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(0.6)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x8B4513, 
        transparent: true, 
        opacity: 0.7,
        wireframe: true
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xCD5C5C, 
        transparent: true, 
        opacity: 0.6,
        wireframe: true
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xA0522D, 
        transparent: true, 
        opacity: 0.8,
        wireframe: true
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xDC143C, 
        transparent: true, 
        opacity: 0.5,
        wireframe: true
      })
    ];

    // Create multiple floating shapes
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2
      };
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Add ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x8B4513, 1, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xCD5C5C, 1, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
   
    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    
    const onDocumentTouchMove = (event) => {
      if (event.touches.length === 1) {
        // Remove preventDefault to allow normal scrolling
        mouseX = (event.touches[0].pageX - windowHalfX);
        mouseY = (event.touches[0].pageY - windowHalfY);
      }
    };
   
    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    // Add click interaction
    const onDocumentClick = (event) => {
      // Remove preventDefault to allow normal page interactions
      
      // Calculate mouse position in normalized device coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Raycasting to detect clicked objects
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(shapes);
      
      if (intersects.length > 0) {
        const clickedShape = intersects[0].object;
        
        // Add a "clicked" effect
        clickedShape.userData.clicked = true;
        clickedShape.userData.clickTime = Date.now();
        
        // Change color temporarily
        const originalColor = clickedShape.material.color.getHex();
        clickedShape.material.color.setHex(0xFFFFFF);
        
        // Reset after animation
        setTimeout(() => {
          clickedShape.material.color.setHex(originalColor);
          clickedShape.userData.clicked = false;
        }, 500);
      }
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchmove', onDocumentTouchMove, { passive: false });
    document.addEventListener('click', onDocumentClick);
    window.addEventListener('resize', onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
              // Smooth camera movement based on mouse - more responsive
        targetX = mouseX * 0.002; // Increased sensitivity
        targetY = mouseY * 0.002;
        camera.position.x += (targetX - camera.position.x) * 0.1; // Faster response
        camera.position.y += (-targetY - camera.position.y) * 0.1;
        camera.lookAt(scene.position);

        // Animate shapes with more dynamic movement
        shapes.forEach((shape, index) => {
          // Rotate shapes faster
          shape.rotation.x += shape.userData.rotationSpeed.x * 2;
          shape.rotation.y += shape.userData.rotationSpeed.y * 2;
          shape.rotation.z += shape.userData.rotationSpeed.z * 2;
          
          // More dynamic floating animation
          const time = Date.now() * shape.userData.floatSpeed * 2 + shape.userData.floatOffset;
          shape.position.y += Math.sin(time) * 0.02;
          
          // Interactive rotation around center with mouse influence
          const radius = 4 + index * 0.8;
          const angle = time * 0.002 + index * 0.5 + (mouseX * 0.0001);
          shape.position.x = Math.cos(angle) * radius;
          shape.position.z = Math.sin(angle) * radius;
          
                  // Add subtle scale animation based on mouse movement
        const mouseDistance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const scale = 1 + (mouseDistance * 0.00001);
        shape.scale.setScalar(scale);
        
        // Add hover effect - make shapes glow when mouse is near
        const mouseWorldPos = new THREE.Vector3(mouseX * 0.01, -mouseY * 0.01, 0);
        const distanceToMouse = shape.position.distanceTo(mouseWorldPos);
        
        if (distanceToMouse < 3) {
          // Glow effect when mouse is near
          shape.material.emissive.setHex(0x333333);
          shape.material.opacity = 1;
        } else {
          // Reset when mouse is far
          shape.material.emissive.setHex(0x000000);
          shape.material.opacity = 0.7;
        }
        });

              // Animate point lights with mouse influence
        const time = Date.now() * 0.001;
        const mouseInfluence = mouseX * 0.0001;
        
        pointLight1.position.x = Math.cos(time + mouseInfluence) * 8;
        pointLight1.position.z = Math.sin(time + mouseInfluence) * 8;
        pointLight2.position.x = Math.cos(time + Math.PI + mouseInfluence) * 8;
        pointLight2.position.z = Math.sin(time + Math.PI + mouseInfluence) * 8;
        
        // Make lights more dynamic
        pointLight1.intensity = 1 + Math.sin(time * 2) * 0.3;
        pointLight2.intensity = 1 + Math.cos(time * 2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', onWindowResize);
      
      // Dispose of all geometries and materials
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return threeJsCanvasRef;
};
