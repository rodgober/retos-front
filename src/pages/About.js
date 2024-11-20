import React from 'react';
import './About.css';
import nosotros from './../assets/Ambos.png';

function About() {
  return (
      <div className="about-container">
        <div className="about-text">
            <h2>¿Quiénes somos?</h2>
            <p>Un padre de familia interesado en el desarrollo educativo de su hija y una hija con gran interés en resolver los retos que se le presentan.</p>
            
            <h2>¿Quién propone los retos?</h2>
            <p>Los retos fueron creados por uno de los proyectos educativos más importantes de México que fue el Proyecto Educativo Galileo, 
              algunos otros son de la Olimpiada Mexicana de Matemáticas y adaptados a las necesidades particulares de los participantes de Mathethon.</p>

            <h2>Homenaje</h2>
            <p>Sirva este proyecto también como homenaje al Dr. Enrique Calderón Alzati quien fue un maestro excepcional, dedicado no solo a enseñar, 
              sino a despertar la curiosidad y el amor por las matemáticas en todos quienes tuvimos el privilegio de conocerlo. 
            <p></p>

            Este proyecto está dedicado a su memoria, como agradecimiento por su incansable labor y por el impacto positivo que dejó en nuestras vidas. 
            Su legado vive en cada niño y adolescente que hoy enfrenta un reto matemático con emoción, en cada paso hacia el aprendizaje y en cada meta alcanzada. </p>
            <p></p>
            <p></p>
        </div>
        <div className="about-image">
            <img src={nosotros} alt="Natalia y Rodrigo" />
        </div>
      </div>
  );
}

export default About;