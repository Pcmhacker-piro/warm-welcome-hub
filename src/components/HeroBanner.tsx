import { useRef, useState } from "react";

const CHIPS = [
  { label: "GSSoC 2026", detail: "Rank 28", pos: "left-[6%] top-[18%]", depth: 55, delay: "0s" },
  { label: "600 PRs", detail: "merged", pos: "right-[7%] top-[24%]", depth: 40, delay: "0.8s" },
  { label: "1700+", detail: "LeetCode", pos: "left-[12%] bottom-[14%]", depth: 70, delay: "1.6s" },
  { label: "3★", detail: "CodeChef", pos: "right-[12%] bottom-[18%]", depth: 45, delay: "2.2s" },
];

export function HeroBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 4, y: px * 6 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="banner-scene group relative overflow-hidden rounded-3xl border border-border bg-card"
    >
      <div
        className="banner-card relative h-56 sm:h-64"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 250ms cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {/* backdrop wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 16%, transparent), transparent 55%), radial-gradient(ellipse at 80% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 60%)",
          }}
        />

        {/* aurora blobs (parallax layer) */}
        <div className="absolute inset-0" style={{ transform: "translateZ(35px)" }}>
          <div className="banner-blob banner-blob-a" />
          <div className="banner-blob banner-blob-b" />
          <div className="banner-blob banner-blob-c" />
        </div>

        {/* fine grid */}
        <div className="banner-grid absolute inset-0" />

        {/* light sweep */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="banner-shine absolute inset-y-0 w-1/2" />
        </div>

        {/* center pill */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="banner-pill flex items-center gap-2.5 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Building Verdiqy &amp; Novix UI
          </div>
        </div>

        {/* floating chips */}
        {CHIPS.map((c) => (
          <div
            key={c.label}
            className={`absolute ${c.pos} hidden sm:block`}
            style={{ transform: `translateZ(${c.depth}px)` }}
          >
            <div
              className="banner-chip rounded-xl border border-border bg-background/60 px-3 py-1.5 font-mono text-xs backdrop-blur"
              style={{ animationDelay: c.delay }}
            >
              <span className="font-medium">{c.label}</span>{" "}
              <span className="text-muted-foreground">{c.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
