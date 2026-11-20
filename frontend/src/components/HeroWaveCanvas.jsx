import React, { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

export const HeroWaveCanvas = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId = null;
    let width = 0;
    let height = 0;
    let time = 0;
    let isVisible = true;
    let isMobile = window.innerWidth < 768;

    const resize = () => {
      const parent = canvas.parentElement;
      isMobile = window.innerWidth < 768;
      // Cap DPR to 1 on mobile to prevent excessive GPU texture fill rate
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 650;
      if (width === 0 || height === 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.parentElement);
    }

    // Tightly synchronized parallel silk strands (matching CODESTORM's cohesive flowing wave ribbon)
    const strands = [
      // Soft wide crimson-coral outer aura
      {
        ampScale: 1.0,
        phaseOffset: 0.0,
        yOffset: -6,
        lineWidth: 24,
        colorDark: 'rgba(235, 45, 92, 0.14)',
        colorLight: 'rgba(225, 29, 72, 0.08)',
        shadowColor: 'rgba(235, 45, 92, 0.35)',
        shadowBlur: 20,
      },
      // Main muted coral-crimson ribbon line
      {
        ampScale: 1.0,
        phaseOffset: 0.0,
        yOffset: -6,
        lineWidth: 5,
        colorDark: 'rgba(244, 63, 94, 0.42)',
        colorLight: 'rgba(225, 29, 72, 0.28)',
        shadowColor: 'rgba(244, 63, 94, 0.5)',
        shadowBlur: 10,
      },
      // Deep indigo-violet middle silk layer
      {
        ampScale: 0.96,
        phaseOffset: 0.22,
        yOffset: 4,
        lineWidth: 16,
        colorDark: 'rgba(99, 102, 241, 0.13)',
        colorLight: 'rgba(99, 102, 241, 0.07)',
        shadowColor: 'rgba(99, 102, 241, 0.25)',
        shadowBlur: 16,
      },
      // Subtle cyan-teal wide aura
      {
        ampScale: 0.94,
        phaseOffset: 0.42,
        yOffset: 10,
        lineWidth: 22,
        colorDark: 'rgba(20, 184, 212, 0.14)',
        colorLight: 'rgba(8, 145, 178, 0.08)',
        shadowColor: 'rgba(34, 211, 238, 0.35)',
        shadowBlur: 20,
      },
      // Main silky electric teal-cyan ribbon line
      {
        ampScale: 0.94,
        phaseOffset: 0.42,
        yOffset: 10,
        lineWidth: 4,
        colorDark: 'rgba(34, 211, 238, 0.40)',
        colorLight: 'rgba(8, 145, 178, 0.26)',
        shadowColor: 'rgba(34, 211, 238, 0.48)',
        shadowBlur: 10,
      },
      // Delicate secondary fine cyan echo slightly trailing
      {
        ampScale: 0.9,
        phaseOffset: 0.62,
        yOffset: 16,
        lineWidth: 2,
        colorDark: 'rgba(56, 189, 248, 0.28)',
        colorLight: 'rgba(14, 165, 233, 0.18)',
        shadowColor: 'rgba(34, 211, 238, 0.3)',
        shadowBlur: 6,
      },
    ];

    const drawFrame = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) return;

      const centerY = height * 0.52;
      const baseFreq = (Math.PI * 4.4) / Math.max(width, 900);
      const baseAmp = Math.min(Math.max(height * 0.15, 60), 105);

      // Subtle atmospheric glow on desktop (skip heavy gradients on mobile to keep 60fps)
      if (isDark && !isMobile) {
        const leftGlow = ctx.createRadialGradient(
          width * 0.14,
          height * 0.42,
          10,
          width * 0.14,
          height * 0.42,
          width * 0.32
        );
        leftGlow.addColorStop(0, 'rgba(225, 29, 72, 0.12)');
        leftGlow.addColorStop(1, 'rgba(225, 29, 72, 0)');
        ctx.fillStyle = leftGlow;
        ctx.fillRect(0, 0, width, height);

        const rightGlow = ctx.createRadialGradient(
          width * 0.86,
          height * 0.56,
          10,
          width * 0.86,
          height * 0.56,
          width * 0.28
        );
        rightGlow.addColorStop(0, 'rgba(20, 184, 212, 0.08)');
        rightGlow.addColorStop(1, 'rgba(20, 184, 212, 0)');
        ctx.fillStyle = rightGlow;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.globalCompositeOperation = isDark ? 'screen' : 'source-over';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const step = isMobile ? 14 : 8;

      strands.forEach((strand) => {
        ctx.beginPath();
        const amp = baseAmp * strand.ampScale;

        for (let x = -20; x <= width + 20; x += step) {
          const primaryWave = Math.sin(x * baseFreq - time * 0.65 + strand.phaseOffset) * amp;
          const gentleDrift =
            Math.sin(x * baseFreq * 0.45 + time * 0.35 + strand.phaseOffset * 1.4) * (amp * 0.16);
          const y = centerY + strand.yOffset + primaryWave + gentleDrift;

          if (x === -20) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = isDark ? strand.colorDark : strand.colorLight;
        ctx.lineWidth = strand.lineWidth;

        // CRITICAL PERFORMANCE FIX: Disable software shadowBlur on mobile to eliminate CPU throttling
        if (!isMobile) {
          ctx.shadowColor = strand.shadowColor;
          ctx.shadowBlur = strand.shadowBlur;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
      });

      ctx.restore();

      if (!prefersReducedMotion && isVisible) {
        time += 0.012;
        animationId = requestAnimationFrame(drawFrame);
      }
    };

    // Pause animation when scrolled past hero section to keep mobile scroll silky smooth
    const handleScrollVisibility = () => {
      const shouldBeVisible =
        window.scrollY < window.innerHeight * 1.4 && !document.hidden;

      if (shouldBeVisible !== isVisible) {
        isVisible = shouldBeVisible;
        if (isVisible && !animationId && !prefersReducedMotion) {
          animationId = requestAnimationFrame(drawFrame);
        }
      }
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    document.addEventListener('visibilitychange', handleScrollVisibility);

    drawFrame();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScrollVisibility);
      document.removeEventListener('visibilitychange', handleScrollVisibility);
      if (resizeObserver) resizeObserver.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full block blur-[2px] opacity-90"
    />
  );
};
