import React, { useEffect, useRef } from 'react';

const Background3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Particles settings
    const particleCount = 70;
    const particles = [];
    const focalLength = 400; // perspective focal length
    const maxDistance = 120; // max distance to draw connection line

    // Target rotation angles for mouse interaction
    let angleX = 0.001;
    let angleY = 0.001;
    let targetAngleX = 0.001;
    let targetAngleY = 0.001;

    // Initialize 3D particles in a cube coordinates space
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 800,
        baseX: 0,
        baseY: 0,
        baseZ: 0,
      });
      particles[i].baseX = particles[i].x;
      particles[i].baseY = particles[i].y;
      particles[i].baseZ = particles[i].z;
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Calculate rotation based on mouse coordinates from screen center
      const ndcX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ndcY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetAngleY = ndcX * 0.005;
      targetAngleX = ndcY * 0.005;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Helper functions for 3D rotation
    const rotateX = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = point.y * cos - point.z * sin;
      const z1 = point.z * cos + point.y * sin;
      point.y = y1;
      point.z = z1;
    };

    const rotateY = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = point.x * cos - point.z * sin;
      const z1 = point.z * cos + point.x * sin;
      point.x = x1;
      point.z = z1;
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate current angle toward target angle (dampening)
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      // Add a constant subtle rotation so it moves even without mouse action
      const currentRotationX = angleX + 0.0005;
      const currentRotationY = angleY + 0.001;

      const projected = [];

      // Rotate and project particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Apply 3D rotations
        rotateX(p, currentRotationX);
        rotateY(p, currentRotationY);

        // Perspective Projection calculation
        const scale = focalLength / (focalLength + p.z);
        const x2d = p.x * scale + width / 2;
        const y2d = p.y * scale + height / 2;

        projected.push({ x: x2d, y: y2d, z: p.z, scale });
      }

      // Draw Connection Lines between close particles
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Lines are more transparent if they are further back (z > 0)
            const zDepth = (p1.z + p2.z) / 2;
            const depthAlpha = Math.max(0.1, 1 - (zDepth + 400) / 800);
            const distAlpha = 1 - dist / maxDistance;
            const alpha = distAlpha * depthAlpha * 0.25;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Professional neon green line matching the theme
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = Math.min(1.2, p1.scale * 0.8);
            ctx.stroke();
          }
        }
      }

      // Draw projected 3D dots
      for (let i = 0; i < particleCount; i++) {
        const p = projected[i];
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;

        // Size and brightness depends on 3D depth (scale)
        const size = Math.max(0.5, p.scale * 2.2);
        const alpha = Math.max(0.15, Math.min(0.85, p.scale * 0.6));

        // Drawing outer neon glow for close particles
        if (p.scale > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha * 0.2})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
};

export default Background3D;
