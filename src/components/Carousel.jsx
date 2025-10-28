import React, { useEffect, useRef, useState } from "react";

export default function Carousel({ slides, interval = 4000 }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const hovering = useRef(false);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      if (!hovering.current) next();
    }, interval);
    return () => clearInterval(timer.current);
  }, [idx, interval, slides]);

  if (!slides || slides.length === 0) {
    return (
      <div className="h-[300px] rounded-2xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-center text-neutral-400">
        Agregá imágenes al carrusel
      </div>
    );
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(179,123,255,0.3)] backdrop-blur-lg bg-black/20"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="relative w-full min-h-[300px] sm:min-h-[340px] md:min-h-[380px]">
        {slides.map((src, i) => (
          <img
            key={String(src) + i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-black/40 border border-neutral-700 text-neutral-100 hover:text-[#b37bff]"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-black/40 border border-neutral-700 text-neutral-100 hover:text-[#b37bff]"
            aria-label="Siguiente"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full border border-neutral-600 ${
                  i === idx ? "bg-[#b37bff]" : "bg-neutral-800"
                }`}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
