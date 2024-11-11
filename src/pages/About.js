import React from 'react';
import './About.css';
import nosotros from './../assets/Ambos.png';

function About() {
  return (
      <div className="about-container">
        <div className="about-text">
            <h2>¿Quiénes somos?</h2>
            <p>Un padre de familia interesado en el desarrollo educativo de su hija y una hija con gran interés en resolver los retos que se le presentan.</p>
            <p></p>
            <p></p>
            <h2>¿Quién propone los retos?</h2>
            <p>Los retos fueron creados por uno de los proyectos educativos más importantes de México que fue el Proyecto Educativo Galileo, 
              mientras que algunos otros son de la Olimpiada Mexicana de Matemáticas y adaptados a las necesidades particulares de los participantes de Mathethon.</p>
        </div>
        <div className="about-image">
            <img src={nosotros} alt="Natalia y Rodrigo" />
        </div>
      </div>
  );
}

export default About;