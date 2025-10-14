'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const Hero3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Get colors from CSS variables
    const getThemeColor = (variable: string) => {
        const colorStr = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        if (colorStr.startsWith('hsl')) return colorStr;
        const [h, s, l] = colorStr.split(' ').map(parseFloat);
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    let primaryColor = new THREE.Color(getThemeColor('--primary'));
    let accentColor = new THREE.Color(getThemeColor('--accent'));
    let ringColor = new THREE.Color(getThemeColor('--ring'));

    const updateColors = () => {
        primaryColor = new THREE.Color(getThemeColor('--primary'));
        accentColor = new THREE.Color(getThemeColor('--accent'));
        ringColor = new THREE.Color(getThemeColor('--ring'));

        // Update materials
        if (pcbMaterial) pcbMaterial.color = primaryColor;
        if (traceMaterial) traceMaterial.color = accentColor;
        if (dotMaterial) (dotMaterial as THREE.PointsMaterial).color = ringColor;
    }

    // PCB Base
    const pcbGeometry = new THREE.BoxGeometry(8, 5, 0.1);
    const pcbMaterial = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: 0.8,
      roughness: 0.4,
      transparent: true,
      opacity: 0.1
    });
    const pcb = new THREE.Mesh(pcbGeometry, pcbMaterial);
    scene.add(pcb);

    // Traces (lines)
    const traceMaterial = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.7 });
    const traces = new THREE.Group();
    const traceCount = 30;
    for (let i = 0; i < traceCount; i++) {
      const path = new THREE.Path();
      let x = Math.random() * 8 - 4;
      let y = Math.random() * 5 - 2.5;
      path.moveTo(x, y);

      const segments = Math.floor(Math.random() * 4) + 2;
      for(let j = 0; j < segments; j++) {
          x += (Math.random() - 0.5) * 2;
          y += (Math.random() - 0.5) * 2;
          // Clamp to PCB bounds
          x = THREE.MathUtils.clamp(x, -4, 4);
          y = THREE.MathUtils.clamp(y, -2.5, 2.5);
          path.lineTo(x, y);
      }
      
      const points = path.getPoints();
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, traceMaterial);
      traces.add(line);
    }
    scene.add(traces);

    // Dots (components)
    const dotGeometry = new THREE.BufferGeometry();
    const dotPositions = [];
    const dotCount = 100;
    for (let i = 0; i < dotCount; i++) {
      dotPositions.push(Math.random() * 8 - 4, Math.random() * 5 - 2.5, 0.1);
    }
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMaterial = new THREE.PointsMaterial({ color: ringColor, size: 0.05, transparent: true, opacity: 0.8 });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Mouse movement
    let mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate traces
      traces.children.forEach((trace, i) => {
        (trace as THREE.Line).material.opacity = (Math.sin(elapsedTime * 0.5 + i) * 0.3 + 0.4);
      });
      
      // Animate dots
      (dots.material as THREE.PointsMaterial).size = Math.sin(elapsedTime) * 0.02 + 0.04;
      
      // Parallax effect
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Theme change observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
                updateColors();
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if(currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default Hero3D;
