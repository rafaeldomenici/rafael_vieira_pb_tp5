import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from './pages/Layout';
import Home from "./pages/Home";
import Fornecedores from "./pages/Fornecedores";
import Contatos from "./pages/Contatos";
import Produtos from "./pages/Produtos";
import Cotacoes from "./pages/Cotacoes";
import Requisicoes from "./pages/Requisicoes";
import NaoEncontrado from "./pages/NaoEncontrado";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import GerenciarColaboradores from "./pages/GerenciarColaboradores";
import { useState, useEffect } from "react";
import ListaCotacoesRequisicao from "./componentes/requisicoes/ListaCotacoesRequisicao";

export default function App() {
    const [admin, setAdmin] = useState(false);
    const [usuario, setUsuario] = useState({email: "", senha: "", tipo: ""})
    
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout usuario={usuario} setUsuario={setUsuario}/>} >
          <Route index element={<Home />} />
          
          <Route path="login"  element={<Login usuario={usuario} setUsuario={setUsuario}/>}/> 
          <Route path="criarconta" element={<CriarConta usuario={usuario} setUsuario={setUsuario}/>} />    
          <Route path="gerenciarcolaboradores" element={<GerenciarColaboradores />} />     
          <Route path="fornecedores" element={<Fornecedores teste={5} />} />
          <Route path="contatos" element={<Contatos />} />            
          <Route path="produtos" element={<Produtos />} />
          <Route path="cotacoes" element={<Cotacoes />} />  
          <Route path="requisicoes" element={<Requisicoes usuario={usuario} setUsuario={setUsuario}/>} />
          <Route path="listacotacoesrequisicao/:id" element={<ListaCotacoesRequisicao />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
    </Router>
  );
}