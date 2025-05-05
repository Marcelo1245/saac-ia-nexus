
import React, { useEffect, useRef } from 'react';

interface ConfettiEffectProps {
  active: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Confetti particles array
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    
    // Colors for the confetti
    const colors = ['#7B2DFF', '#00F5A0', '#FFD700', '#FF6B6B', '#4ECDC4'];
    
    // Create initial particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.2 - 0.1
      });
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particle
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 1.5;
        p.rotation += p.rotationSpeed;
        
        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        
        ctx.restore();
        
        // Reset particle if it goes off screen
        if (p.y > canvas.height) {
          particles[i].y = -p.size;
          particles[i].x = Math.random() * canvas.width;
        }
      }
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      // No specific cleanup needed for canvas animation
    };
  }, [active]);
  
  if (!active) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default ConfettiEffect;
