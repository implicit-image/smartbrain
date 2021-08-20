import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Particles, { IOptions, RecursivePartial } from 'react-tsparticles'

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm'
import Rank from './components/Rank/Rank'

const particleOptions = {
  background: {
    color: {
      /* value: "#0d47a1", */
    },
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.0,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
} as RecursivePartial<IOptions>



const App = () => {




  return (
    <div className="App">
        <Particles
        id="tsparticles"
        init={() => 0}
        loaded={() => 0}
        options={particleOptions}
        className='particles'
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageUrlForm />
      {/* <FaceRecognition/> */}
    </div>
  )
}

export default App;
