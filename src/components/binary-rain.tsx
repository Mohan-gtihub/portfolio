'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const characters = '01';
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const drops: number[] = [];

      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }

      const draw = () => {
        let backgroundColor = 'rgba(12, 12, 12, 0.05)'; // dark theme default
        let charColor = '#0F0'; // matrix green
        
        if (theme === 'dracula') {
            backgroundColor = 'rgba(40, 42, 54, 0.05)';
            charColor = '#50fa7b';
        } else if (theme === 'solarized-dark') {
            backgroundColor = 'rgba(0, 43, 54, 0.05)';
            charColor = '#859900';
        } else if(theme === 'dark') {
            backgroundColor = 'rgba(20, 20, 20, 0.05)';
            charColor = 'hsl(150 100% 50%)';
        }


        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = charColor;
        ctx.font = `${fontSize}px Fira Code, monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const animate = () => {
        draw();
        animationFrameId = window.requestAnimationFrame(animate);
      };
      
      animate();
    }

    const handleResize = () => {
        window.cancelAnimationFrame(animationFrameId);
        setup();
    }

    setup();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default BinaryRain;
