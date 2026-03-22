"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

const COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#3b82f6", // blue
  "#6d28d9", // dark violet
  "#4f46e5", // deep indigo
  "#7c3aed", // vivid purple
  "#c084fc", // light purple
  "#818cf8", // light indigo
  "#e11d48", // rose accent
];

const PARTICLE_COUNT = 180;
const MOUSE_RADIUS = 500;
const MOUSE_FORCE = 0.15;
const RETURN_FORCE = 0.02;
const MAX_DISPLACEMENT = 40;

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        width: Math.random() * 3 + 1,
        height: Math.random() * 12 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.6 + 0.3,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Spotlight glow following cursor
      if (mouse.x > 0 && mouse.y > 0) {
        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 350,
        );
        glow.addColorStop(0, "rgba(139, 92, 246, 0.12)");
        glow.addColorStop(0.3, "rgba(99, 102, 241, 0.06)");
        glow.addColorStop(0.6, "rgba(59, 130, 246, 0.03)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (const p of particlesRef.current) {
        // Mouse magnet — attract particles toward cursor within radius
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 10) {
          // Check displacement from origin
          const dispX = p.x - p.originX;
          const dispY = p.y - p.originY;
          const dispDist = Math.sqrt(dispX * dispX + dispY * dispY);

          // Only attract if particle hasn't moved too far from origin (~1cm)
          if (dispDist < MAX_DISPLACEMENT) {
            const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            p.vx += (dx / dist) * strength;
            p.vy += (dy / dist) * strength;
            p.rotationSpeed += strength * 0.03;
          }
        }

        // Always spring back to origin
        const homeX = p.originX - p.x;
        const homeY = p.originY - p.y;
        p.vx += homeX * RETURN_FORCE;
        p.vy += homeY * RETURN_FORCE;

        // Apply velocity with friction
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.rotationSpeed *= 0.97;

        // Draw particle (star shape)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const size = p.height * 0.45;
        const spikes = 4;
        const outerRadius = size;
        const innerRadius = size * 0.4;
        for (let i = 0; i < spikes * 2; i++) {
          const r = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
