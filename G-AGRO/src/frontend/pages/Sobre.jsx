import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Sobre() {
    return (
      <div>
         <header>
        <Navbar></Navbar>
      </header>

        <h1>Sobre Nós</h1>
        <p>Bem-vindo à página Sobre. Aqui, você encontrará informações sobre nosso projeto.</p>
      </div>
    );
  }