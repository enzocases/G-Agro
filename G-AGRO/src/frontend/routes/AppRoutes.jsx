  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Home from '../pages/Home.jsx';
  import Cultura from '../pages/Cultura.jsx';
  import SignUp from '../pages/Cadastro.jsx';
  import Plantio from '../pages/Plantio.jsx';
  import Perfil from '../pages/Perfil.jsx';
  import Calendario from '../pages/Calendario.jsx';
  import CadastroPlantio from '../pages/CadastroPlantio.jsx';
  import Estoque from '../pages/Estoque.jsx'
  import Colheita from '../pages/Colheita.jsx';
  import PainelControle from '../pages/PainelControle.jsx'

  function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/cultura/*' element={<Cultura />}></Route>
          <Route path='/cadastro/*' element={<SignUp />}></Route>
          <Route path='/plantio/*' element={<Plantio />}></Route>
          <Route path='/perfil/*' element={<Perfil />}></Route>
          <Route path='/calendario/*' element={<Calendario />}></Route>
          <Route path='/cadastro-plantio/*' element={<CadastroPlantio />}></Route>
          <Route path='/estoque/*' element={<Estoque />}></Route>
          <Route path='/colheita/*' element={<Colheita />}></Route>
          <Route path='/painel-controle/*' element={<PainelControle />}></Route>
        </Routes>
      </Router>
    );
  }

  export default AppRoutes;
