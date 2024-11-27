import React from "react"; // Importa React
import "./LandingPage.css"; // Importa el archivo de estilos

// Definición del componente funcional
const LandingPage = () => {
  return (
    <section className="hero-section"> {/* Sección principal con clase */}
      <div>
        <div data-aos="fade-up" className="flex-hero"> {/* Animación y estilos */}
          <h1>
            Your Health<br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>
          <div className="blob-cont"> {/* Contenedor de "blob" azul */}
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont"> {/* Segundo "blob" azul */}
            <div className="blue1 blob"></div>
          </div>
          <h4>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
          </h4>
          <a href="#services"> {/* Enlace al servicio */}
            <button className="button">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage; // Exporta el componente para su uso