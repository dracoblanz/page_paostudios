import React from "react";

const seriesData = [
  {
    title: "Mythrandia",
    logo: "../assets/img/logo_myth.png",
    fecha: "24 Feb 2024",
    duracion: "20 días",
    version: "1.16.5",
    descripcion:
      "Una historia loca y extrema con una dificultad estilo hardcore",
    estado: "activo",
  },
  {
    title: "Proyecto PAO",
    logo: "../assets/img/logo_proyectopao.png",
    fecha: "02 Jun 2024",
    duracion: "45 días",
    version: "1.16.5",
    descripcion:
      "El inicio de un Proyecto de una dimension desconocida.",
    estado: "activo",
  },
  {
    title: "Boss of Madness",
    logo: "../assets/img/logo_bom.png",
    fecha: "21 Sep 2024",
    duracion: "30 días",
    version: "1.20.1",
    descripcion:
      "Un reto para los mas valientes, vidas limitadas y jefes formidables a vencer.",
    estado: "activo",
  },
  {
    title: "PAO World",
    logo: "../assets/img/logo_pao.png",
    fecha: "14 Dic 2024",
    duracion: "30 días",
    version: "1.20.1",
    descripcion:
      "Continua la aventura de nuestros heroes y dioses buscando derrotar al Dios Desconocido.",
    estado: "activo",
  },
  {
    title: "Fate Apocraft",
    logo: "../assets/img/logo_fap.png",
    fecha: "12 Abr 2025",
    duracion: "30 días",
    version: "1.20.1",
    descripcion:
      "Un apocalipsis arrazo al mundo podras sobrevivir a este desafio?.",
    estado: "activo",
  },
  {
    title: "Boss of Madness 2",
    logo: "../assets/img/logo_bom2.png",
    fecha: "20 sep 2025",
    duracion: "30 días",
    version: "1.20.1",
    descripcion:
      "Segunda Entrega de BOM con nuevas mecanicas y jefes aun mas dificiles.",
    estado: "activo",
  },
  {
    title: "PAO Multiverse",
    logo: "../assets/img/logo_pao_multiverse.png",
    fecha: "Próximamente",
    duracion: "30 días",
    version: "1.21.1",
    descripcion: "Es un universo de locos, todo se mezcla, tocara solucionarlo.",
    estado: "proximamente",
  },
];

export default function SeriesPage() {
  return (
    <div className="min-h-screen center bg-gradient-to-b items-center justify-center from-neutral-900 to-black text-white px-8 py-16">
      <h1 className="text-4xl font-bold mb-10 text-[#b37bff] text-center">
        Series del Universo PAO
      </h1>

      <div className="grid sm:grid-cols-2 center md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {seriesData.map((serie) => (
          <div
            key={serie.title}
            className={`relative object-center group w-64 h-60 rounded-2xl overflow-hidden border justify-center justify-items-center transition-all duration-300 ${
              serie.estado === "proximamente"
                ? "border-neutral-700 opacity-50 grayscale"
                : "border-[#b37bff]/40 hover:border-[#b37bff]"
            }`}
          >
            <div className="absolute align-self-anchor-center">
            <img
              src={serie.logo}
              alt={serie.title}
              className="w-45 h-auto object-cover transition-transform justify-center duration-300 group-hover:scale-110"
            /></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
              <h2 className="text-lg font-bold">{serie.title}</h2>
              <p className="text-sm text-neutral-300">{serie.fecha}</p>
            </div>

            {serie.estado !== "proximamente" && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-center text-sm rounded-2xl">
                <p className="text-lg font-semibold mb-2 text-[#b37bff]">
                  {serie.title}
                </p>
                <p className="text-neutral-300 mb-1">
                  <strong>Fecha:</strong> {serie.fecha}
                </p>
                <p className="text-neutral-300 mb-1">
                  <strong>Duración:</strong> {serie.duracion}
                </p>
                <p className="text-neutral-300 mb-1">
                  <strong>Versión:</strong> {serie.version}
                </p>
                <p className="text-neutral-400 mt-2 leading-tight">
                  {serie.descripcion}
                </p>
              </div>
            )}

            {serie.estado === "proximamente" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <p className="text-xl font-bold text-neutral-300">
                  Próximamente
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
