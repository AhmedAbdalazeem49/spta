import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const ctx = gsap.context(() => {
      gsap.from(".nf-animate", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".star", {
        y: "-=30",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 3,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [location.pathname]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(containerRef.current, {
      x,
      y,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-muted to-background"
      onMouseMove={handleMouseMove}
    >
      {/* ✨ STAR FIELD */}
      <div ref={starsRef} className="pointer-events-none absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-primary/40 blur-[1px]"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 🧠 CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div
          ref={containerRef}
          className="max-w-xl text-center rounded-3xl border border-border bg-background/80 backdrop-blur-xl shadow-2xl p-10 md:p-14"
        >
          <h1 className="nf-animate text-[7rem] md:text-[9rem] font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>

          <p className="nf-animate mt-4 text-2xl font-semibold text-foreground">
            الصفحة غير موجودة
          </p>

          <p className="nf-animate mt-3 text-muted-foreground leading-relaxed">
            يبدو أن الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها.
            <br />
            نعتذر عن الإزعاج.
          </p>

          <div className="nf-animate mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <span className="relative z-10">العودة إلى الرئيسية</span>
              <span className="absolute inset-0 rounded-full bg-primary/80 opacity-0 blur-xl transition group-hover:opacity-100" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3 font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105"
            >
              تواصل معنا
            </Link>
          </div>

          {/* 🌙 SUBTLE PATTERN */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
