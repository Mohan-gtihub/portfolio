"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

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
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x8A2BE2, 1.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4682B4, 3, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Objects
    const boardGeometry = new THREE.BoxGeometry(4, 6, 0.1);
    const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x001a33, roughness: 0.5, metalness: 0.8 });
    const mainBoard = new THREE.Mesh(boardGeometry, boardMaterial);
    scene.add(mainBoard);
    
    const chips: THREE.Mesh[] = [];
    const chipGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.2);
    const chipMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.2, metalness: 1.0 });

    for(let i = 0; i < 5; i++) {
        const chip = new THREE.Mesh(chipGeometry, chipMaterial);
        chip.position.set(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 5,
            0.15
        );
        mainBoard.add(chip);
        chips.push(chip);
    }
    
    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      mainBoard.rotation.x = Math.sin(elapsedTime * 0.2) * 0.4;
      mainBoard.rotation.y = Math.cos(elapsedTime * 0.3) * 0.5;
      mainBoard.rotation.z = Math.sin(elapsedTime * 0.1) * 0.2;

      chips.forEach((chip, i) => {
        chip.rotation.z = elapsedTime * (i % 2 === 0 ? 0.5 : -0.5);
      });

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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if(currentMount && renderer.domElement){
        currentMount.removeChild(renderer.domElement);
      }
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20 md:opacity-30" />;
};

export default Hero3D;
