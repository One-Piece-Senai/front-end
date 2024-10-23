import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Projetista from './pages/Projetista/projetista';
import Login from "./pages/login/Login";
import Editar from './pages/Editar_cadastro/edit'
import Detalhes from './/components/card-perfil/Detalhes'; // O componente para mostrar os detalhes do item
import Pedidos from './pages/pedidos/pedidos';
import Perfil from './components/card-perfil/perfil'

function Nav() {
   return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/projetista" element={<Projetista />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<Editar />} />
        <Route path="/detalhes/:indice" element={<Detalhes  />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/perfil" element={<Perfil  />} />        



      </Routes>
    </Router>
   )
}
export default Nav;
