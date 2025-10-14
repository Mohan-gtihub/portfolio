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
    let animationFrameId: number;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
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

    const coreMaterial = new THREE.MeshStandardMaterial({
        color: primaryColor,
        emissive: primaryColor,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true,
    });
    
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: accentColor,
        metalness: 0.7,
        roughness: 0.4,
        wireframe: true,
        opacity: 0.5,
        transparent: true,
    });
    
    const particleMaterial = new THREE.PointsMaterial({
        color: ringColor,
        size: 0.05,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const updateColors = () => {
        primaryColor = new THREE.Color(getThemeColor('--primary'));
        accentColor = new THREE.Color(getThemeColor('--accent'));
        ringColor = new THREE.Color(getThemeColor('--ring'));

        coreMaterial.color = primaryColor;
        coreMaterial.emissive = primaryColor;
        ringMaterial.color = accentColor;
        particleMaterial.color = ringColor;
    }

    // Central Core (Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(2, 1);
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Orbiting Rings (Torus)
    const rings = new THREE.Group();
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(5, 0.1, 16, 100), ringMaterial);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(7, 0.1, 16, 100), ringMaterial);
    ring2.rotation.x = Math.PI / 2;
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(9, 0.1, 16, 100), ringMaterial);
    ring3.rotation.y = Math.PI / 2;
    rings.add(ring1, ring2, ring3);
    scene.add(rings);

    // Particle field
    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for(let i=0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleMesh);

    // Lighting
    const pointLight1 = new THREE.PointLight(primaryColor, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(accentColor, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Mouse movement
    let mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate core
      core.rotation.x = elapsedTime * 0.1;
      core.rotation.y = elapsedTime * 0.1;
      core.scale.set(
        Math.sin(elapsedTime * 0.5) * 0.1 + 0.9,
        Math.sin(elapsedTime * 0.5) * 0.1 + 0.9,
        Math.sin(elapsedTime * 0.5) * 0.1 + 0.9
      );
      (coreMaterial as any).emissiveIntensity = Math.sin(elapsedTime * 2) * 0.25 + 0.75;


      // Animate rings
      rings.rotation.y = -elapsedTime * 0.05;
      ring1.rotation.y = elapsedTime * 0.2;
      ring2.rotation.z = elapsedTime * 0.2;

      // Animate particles
      particleMesh.rotation.y = elapsedTime * 0.02;

      // Parallax effect
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if(currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default Hero3D;
