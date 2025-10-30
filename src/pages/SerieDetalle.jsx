import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const GLOBS = import.meta.glob(
  "/src/assets/series/**/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true }
);

function loadGalleryFromFolder(slug) {
  const entries = Object.entries(GLOBS).filter(([path]) =>
    path.includes(`/series/${slug}/`)
  );
  entries.sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));
  return entries.map(([, mod]) => mod.default);
}

function Ficha({ tecnica }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
      <h3 className="text-lg font-semibold text-[#b37bff] mb-3">
        Ficha técnica
      </h3>
      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-neutral-200">
        {Object.entries(tecnica).map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="text-neutral-400 min-w-[110px]">{k}:</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Carousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const hovering = useRef(false);

  useEffect(() => {
    if (!slides?.length) return;
    const t = setInterval(() => {
      if (!hovering.current) setIdx((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [slides]);

  if (!slides || slides.length === 0) return null;
  const safeIdx = Math.min(Math.max(idx, 0), slides.length - 1);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, slides?.length]);

  return (
    <>
      <div
        className="relative rounded-3xl overflow-hidden bg-black/20 backdrop-blur-lg shadow-[0_0_40px_rgba(179,123,255,0.25)]"
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
      >

        <button
          type="button"
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="Ver imagen en grande"
          onClick={() => setOpen(true)}
        />

        <div className="relative w-full min-h-[500px] sm:min-h-[560px]">
          {slides.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={`img-${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
                i === safeIdx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIdx((i) => (i - 1 + slides.length) % slides.length);
          }}
          className="absolute z-20 left-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-black/40 border border-neutral-700 text-neutral-100 hover:text-[#b37bff]"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIdx((i) => (i + 1) % slides.length);
          }}
          className="absolute z-20 right-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-black/40 border border-neutral-700 text-neutral-100 hover:text-[#b37bff]"
          aria-label="Siguiente"
        >
          ›
        </button>

        <div className="absolute z-20 bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`h-2.5 w-2.5 rounded-full border border-neutral-600 ${
                i === safeIdx ? "bg-[#b37bff]" : "bg-neutral-800"
              }`}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.82)" }}
          onClick={() => setOpen(false)}
        >
          <img
            src={slides?.[safeIdx] ?? ""}
            alt={`img-${safeIdx + 1}`}
            className="max-w-[92%] max-h-[92%] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx((i) => (i - 1 + slides.length) % slides.length);
                }}
                className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-neutral-200 text-4xl hover:text-[#b37bff]"
                aria-label="Anterior"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx((i) => (i + 1) % slides.length);
                }}
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-neutral-200 text-4xl hover:text-[#b37bff]"
                aria-label="Siguiente"
              >
                ›
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-[#b37bff]"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

export default function SerieDetalle() {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || { title: slug };
  const gallery =
    data.gallery && data.gallery.length
      ? data.gallery
      : loadGalleryFromFolder(slug);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        <div
          className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsOpen(true)}
          title="Ver logo en grande"
        >
          <img
            src={data.logo}
            alt={data.title}
            className="w-full h-64 object-contain rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl border border-neutral-700 bg-neutral-900/80 p-6 h-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-100">
              {data.title}
            </h1>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              {data.descripcion}
            </p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.82)" }}
          onClick={() => setIsOpen(false)}
        >
          <img
            src={data.logo}
            alt={data.title}
            className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-[#b37bff]"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      )}

      {data.tecnica && <Ficha tecnica={data.tecnica} />}

      <div>
        <h2 className="text-2xl font-bold text-neutral-100 mb-4">Galería</h2>
        <Carousel slides={gallery} />
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-900/70 text-neutral-100 hover:text-[#b37bff]"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}
