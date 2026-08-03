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

    // 1. STARFIELD PARTICLES
    const starCount = Math.min(120, Math.floor((width * height) / 12000));
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // 2. SHOOTING STARS
    let shootingStar = null;
    const spawnShootingStar = () => {
      if (Math.random() < 0.015 && !shootingStar) {
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 12,
          angle: Math.PI / 4,
          life: 0,
          maxLife: 35,
        };
      }
    };

    // 3. EARTH GLOBE PARAMETERS (Rendered on 2D canvas with 3D projection)
    let earthAngle = 0;

    // 4. SATELLITE ORBITS
    const satellites = [
      { radius: 240, angle: 0, speed: 0.008, tilt: -0.2, color: '#00E5FF', label: 'SAT-01' },
      { radius: 310, angle: Math.PI, speed: 0.005, tilt: 0.35, color: '#8DFF57', label: 'SAT-02' },
      { radius: 380, angle: Math.PI / 2, speed: 0.003, tilt: -0.5, color: '#FFB000', label: 'SAT-03' },
    ];

    // Mouse tracking
    const mouse = { x: width / 2, y: height / 2 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // RENDER FUNCTIONS
    const drawStarfield = () => {
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.02;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, star.alpha))})`;
        ctx.fill();
      });
    };

    const drawShootingStars = () => {
      spawnShootingStar();
      if (shootingStar) {
        shootingStar.life++;
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;

        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.9)');
        grad.addColorStop(1, 'rgba(0, 229, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (shootingStar.life >= shootingStar.maxLife) {
          shootingStar = null;
        }
      }
    };

    const drawRotatingEarth = () => {
      const earthCenterX = width > 900 ? width * 0.82 : width / 2;
      const earthCenterY = height > 600 ? height * 0.5 : height * 0.75;
      const earthRadius = Math.min(220, Math.max(120, width * 0.15));

      earthAngle += 0.003;

      // Earth Atmospheric Cyan Glow
      const glowGrad = ctx.createRadialGradient(
        earthCenterX,
        earthCenterY,
        earthRadius * 0.85,
        earthCenterX,
        earthCenterY,
        earthRadius * 1.3
      );
      glowGrad.addColorStop(0, 'rgba(0, 229, 255, 0.25)');
      glowGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.08)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Earth Sphere Base Fill
      const bodyGrad = ctx.createRadialGradient(
        earthCenterX - earthRadius * 0.3,
        earthCenterY - earthRadius * 0.3,
        earthRadius * 0.1,
        earthCenterX,
        earthCenterY,
        earthRadius
      );
      bodyGrad.addColorStop(0, '#0E2238');
      bodyGrad.addColorStop(0.7, '#071220');
      bodyGrad.addColorStop(1, '#05070A');

      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.stroke();

      // Longitude Lines (Rotating Mesh)
      const numLongitudes = 12;
      for (let i = 0; i < numLongitudes; i++) {
        const lonAngle = earthAngle + (i * Math.PI) / (numLongitudes / 2);
        const rx = earthRadius * Math.cos(lonAngle);

        ctx.beginPath();
        ctx.ellipse(
          earthCenterX,
          earthCenterY,
          Math.abs(rx),
          earthRadius,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(0, 229, 255, ${Math.abs(rx) / earthRadius > 0.3 ? 0.12 : 0.04})`;
        ctx.stroke();
      }

      // Latitude Lines
      const numLatitudes = 7;
      for (let i = 1; i < numLatitudes; i++) {
        const latY = earthCenterY - earthRadius + (i * (earthRadius * 2)) / numLatitudes;
        const distFromCenter = Math.abs(latY - earthCenterY);
        if (distFromCenter < earthRadius) {
          const latRadius = Math.sqrt(earthRadius * earthRadius - distFromCenter * distFromCenter);
          ctx.beginPath();
          ctx.ellipse(earthCenterX, latY, latRadius, latRadius * 0.25, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
          ctx.stroke();
        }
      }

      // Orbiting Satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const satX = earthCenterX + Math.cos(sat.angle) * sat.radius;
        const satY = earthCenterY + Math.sin(sat.angle) * sat.radius * sat.tilt;

        // Orbit Line
        ctx.beginPath();
        ctx.ellipse(earthCenterX, earthCenterY, sat.radius, sat.radius * Math.abs(sat.tilt), 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite Point
        ctx.beginPath();
        ctx.arc(satX, satY, 3, 0, Math.PI * 2);
        ctx.fillStyle = sat.color;
        ctx.fill();

        // Satellite Glow Pulse
        ctx.beginPath();
        ctx.arc(satX, satY, 7 + Math.sin(Date.now() * 0.005) * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${sat.color}33`;
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(197, 206, 216, 0.6)';
        ctx.font = '8px "JetBrains Mono"';
        ctx.fillText(sat.label, satX + 8, satY + 3);
      });
    };

    const drawGridCrosshairs = () => {
      const gridSize = 100;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      drawGridCrosshairs();
      drawStarfield();
      drawShootingStars();
      drawRotatingEarth();

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
        background: '#05070A',
      }}
    />
  );
};

export default Background3D;
