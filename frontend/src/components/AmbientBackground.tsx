import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=60',
          y: '+=40',
          scale: 1.12,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=50',
          y: '+=50',
          scale: 0.92,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=40',
          y: '-=30',
          scale: 1.08,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="ambient-background"
      aria-hidden="true"
    >
      {/* Subtle Ambient Mesh Grid */}
      <div className="ambient-grid-overlay" />

      {/* Floating Animated Gradient Glows */}
      <div
        ref={orb1Ref}
        className="ambient-orb orb-primary"
      />
      <div
        ref={orb2Ref}
        className="ambient-orb orb-amber"
      />
      <div
        ref={orb3Ref}
        className="ambient-orb orb-cyan"
      />

      {/* Soft Vignette Overlay */}
      <div className="ambient-vignette" />
    </div>
  );
}
