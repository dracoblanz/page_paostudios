import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from "../components/Carousel.jsx";
import bg from "../assets/img/fondo.png";
import slide1 from "../assets/img/1.png";
import slide2 from "../assets/img/2.png";
import slide3 from "../assets/img/3.png";
import slide4 from "../assets/img/4.jpg";
import slide5 from "../assets/img/5.png";

const slides = [slide1, slide2, slide3, slide4, slide5];
export default function Home() {
  return (
    <div className="min-h-screen  w-full bg-neutral-950 text-neutral-100">
      <section
        className="relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(11, 11, 11, 1)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-50">
                PAO Studios
              </h1>
              <p className="mt-6 text-lg text-neutral-200 max-w-prose">
                Un estudio que no es estudio que crea series para streamers por
                diversión. Puedes crear tu propia historia en nuestro universo.
              </p>
                <button
                  onClick={() => {
                    const section = document.getElementById("series");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="inline-flex items-center mt-8 px-5 py-3 rounded-2xl border border-neutral-600 bg-neutral-900/70 text-neutral-100 hover:text-[#b37bff] transition-colors"
                >
                  Ver series
                </button>
            </div>
            <div >
              <Carousel slides={slides} />
            </div>
          </div>
          
        </div>
      </section>
      <section id="series" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold section-title">Series Principales</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link   to="../series/pao-world"
              state={{
                title: "Pixelmon Art Online Series",
                logo: "../assets/img/logo_pao.png",
                descripcion:
                  "Serie de pixelmon/cobblemon con historia propia y un sin fin de desafíos, con su propio entrenadores de gimnasios, uno más complejo que otros. A su vez tenemos una historia que narra los hechos de nuestros héroes y dioses buscando escapar de ese universo inestable.",
                tecnica: {
                  Versión: "1.20.1",
                  Plataforma: "Java (Forge)",
                  Duracion: "30 Dias",
                  Mods: "67 Mods",
                },
              }} className="group card-dark p-4 hover:shadow transition">
            <div className="flex items-center justify-center h-[200px]">
              <img
                src="../assets/img/logo_pao.png"
                alt="Logo Serie"
                className="h-full w-auto object-contain select-none"
              />
            </div>
            <h3 className="mt-2 font-semibold">Pixelmon Art Online Series</h3>
            <p className="text-sm muted">Serie de pixelmon/cobblemon con historia propia y un sin fin de desafíos, prepárate para
                enfrentar a formidables entrenadores y enemigos.</p>
            <div className="mt-3 text-[#b37bff] text-sm group-hover:underline">Abrir →</div>
          </Link>
          <Link   to="/series/fate-apocraft"
                state={{
                title: "Fate Apocraft Series",
                logo: "../assets/img/logo_fap.png",
                descripcion:
                  "Imagínate estar en un apocalipsis zombi con un grupo de supervivientes buscando la forma de erradicar la infección, creando y mejorando armas, con misiones de lo más locas y una historia inmersiva para llegar a la ''cura'' de la infección.",
                tecnica: {
                  Versión: "1.20.1",
                  Plataforma: "Java (Forge)",
                  Duracion: "30 Dias",
                  Mods: "189 Mods",
                },
              }} className="group card-dark p-4 hover:shadow transition">
           <div className="flex items-center justify-center h-[200px]">
              <img
                src="../assets/img/logo_fap.png"
                alt="Logo Serie"
                className="h-full w-auto object-contain select-none"
              />
            </div>
            <h3 className="mt-2 font-semibold">Fate Apocraft Series</h3>
            <p className="text-sm muted">Serie de apocalipsis zombis con armas, una historia inmersiva y mucha dificultad en cada paso que das 
              con una gran variedad de armas y herramientas.</p>
            <div className="mt-3 text-[#b37bff] text-sm group-hover:underline">Abrir →</div>
          </Link>
          <Link   to="../series/boss-of-madness"
                state={{
                title: "Boss of Madness Series",
                logo: "../assets/img/logo_bom.png",
                descripcion:
                  "¿Buscas un desafío para tus habilidades? ¿Un lugar plagado de jefes y enemigos muy poderosos? En Boss of Madness tienes todo eso y más, con un sistema de 3 vidas no solo dependerás de tus habilidades sino de tu suerte porque un mínimo error podrías significar la pérdida de una importante vida, también recuerda que no estás solo en este mundo y con compañeros deberás derrotar a los jefes que atormentan este mundo.",
                tecnica: {
                  Versión: "1.20.1",
                  Plataforma: "Java (Forge)",
                  Duracion: "30 Dias",
                  Mods: "202 Mods",
                },
              }} className="group card-dark p-4 hover:shadow transition">
            <div className="flex items-center justify-center h-[200px]">
              <img
                src="../assets/img/logo_bom.png"
                alt="Logo Serie"
                className="h-full w-auto object-contain select-none"
              />
            </div>
            <h3 className="mt-2 font-semibold">Boss Of Madness Series</h3>
            <p className="text-sm muted">Serie con vidas limitadas y muchos jefes. Disfruta de una historia medieval con dungeon increíbles y enemigos formidables</p>
            <div className="mt-3 text-[#b37bff] text-sm group-hover:underline">Abrir →</div>
          </Link>
        </div>
      </section>

      <section
          id="redes"
          className="w-full py-2 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-center"
        >
          <h2 className="text-4xl font-extrabold mb-8 text-[#b37bff] drop-shadow-lg">
            Nuestras Redes
          </h2>

          <p className="text-neutral-400 mb-12 max-w-xl mx-auto">
            Seguinos para enterarte de nuestras series, eventos y nuevos proyectos de PAO Studios
          </p>

          <div className="flex justify-center gap-10 flex-wrap">

            <a
              href="https://www.instagram.com/paouniverseoficial/"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center transition-transform hover:scale-110"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#b37bff] to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(179,123,255,0.6)] group-hover:shadow-[0_0_25px_rgba(255,100,255,0.8)] transition-shadow duration-300">
                <i className="fa-brands fa-instagram text-3xl text-white"></i>
              </div>
              <span className="mt-3 text-neutral-300 group-hover:text-[#b37bff] font-medium transition-colors">
                Instagram
              </span>
            </a>

            <a
              href="https://x.com/PWolrd31941"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center transition-transform hover:scale-110"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#b37bff] to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(179,123,255,0.6)] group-hover:shadow-[0_0_25px_rgba(100,150,255,0.8)] transition-shadow duration-300">
                <i className="fa-brands fa-x-twitter text-3xl text-white"></i>
              </div>
              <span className="mt-3 text-neutral-300 group-hover:text-[#b37bff] font-medium transition-colors">
                Twitter / X
              </span>
            </a>

            <a
              href="https://www.youtube.com/@PAOUniverse"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center transition-transform hover:scale-110"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#b37bff] to-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(179,123,255,0.6)] group-hover:shadow-[0_0_25px_rgba(255,100,100,0.8)] transition-shadow duration-300">
                <i className="fa-brands fa-youtube text-3xl text-white"></i>
              </div>
              <span className="mt-3 text-neutral-300 group-hover:text-[#b37bff] font-medium transition-colors">
                YouTube
              </span>
            </a>
          </div><br /><br /><br />
        </section>
                
    </div>
  )
}
