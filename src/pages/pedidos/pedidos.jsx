import BarraDeBusca from "../../components/barra-de-busca/barra-busca";
import { ContainerPerfil } from "../../components/card-perfil/style-perfil";
import Cardprojetista from "../../components/Card_projetista/card_projetista";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para navegar para outra rota
import Tabela from "../../components/card-perfil/Tabela";
import SideBar from "../../components/sidebar/sidebar";

const API_BASE_URL_cliente = "http://localhost:8080/projetos/cliente/";

const API_BASE_URL = "http://localhost:8080/projetos";
const userId = localStorage.getItem("userId");

function Pedidos() {
  const [projetos, setProjetos] = useState([]);
  const [projetoForm, setProjetoForm] = useState({
    titulo: "",
    descricao: "",
    largura: "",
    altura: "",
    comprimento: "",
    material: "",
    caminhoarquivo: "",
    statusprojeto: "",
    followup: "",
    dataFinalizacao: "",
    imagem: "",
    usuario: { id: userId },
  });
  const [editProjetoId, setEditProjetoId] = useState(null);
  const [message, setMessage] = useState("");
  const [vetor, setVetor] = useState([]);


  useEffect(() => {
    fetchProjetos();
  }, []);

  // Atualiza o userId no projetoForm quando o componente é carregado
  useEffect(() => {
    if (userId) {
      setProjetoForm((prevForm) => ({
        ...prevForm,
        usuario: { id: userId },
      }));
    }
    fetchProjetos();
  }, [userId]); // Adiciona userId como dependência para garantir que está definido

  // Fetch all projetos
  const fetchProjetos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL_cliente}${userId}`);
      setProjetos(response.data);
    } catch (error) {
      console.error("Error fetching projetos:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjetoForm({
      ...projetoForm,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    setProjetoForm({
      ...projetoForm,
      usuario: { id: e.target.value },
    });
  };

  // Handle form submission for creating or updating a projeto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProjetoId) {
      await updateProjeto(editProjetoId);
    } else {
      await createProjeto();
    }
  };

  // Create a new projeto
  const createProjeto = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/criar`, projetoForm);
      setMessage(`Projeto criado com ID: ${response.data.id}`);
      fetchProjetos();
      setProjetoForm({});
      window.location.reload(); // Recarrega a página
    } catch (error) {
      handleError(error);
    }
  };

  // Update an existing projeto
  const updateProjeto = async (id) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/atualizar/${id}`,
        projetoForm
      );
      setMessage(`Projeto atualizado com ID: ${response.data.id}`);
      fetchProjetos();
      setEditProjetoId(null);
      setProjetoForm({});
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    setMessage(error.response ? error.response.data : "An error occurred");
  };

  // Edit a selected projeto
  const editProjeto = (projeto) => {
    setEditProjetoId(projeto.id);
    setProjetoForm({
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      largura: projeto.largura,
      altura: projeto.altura,
      comprimento: projeto.comprimento,
      material: projeto.material,
      caminhoarquivo: projeto.caminhoArquivo,
      statusprojeto: projeto.statusprojeto,
      followup: projeto.followup,
      dataFinalizacao: projeto.dataFinalizacao,
      imagem: projeto.imagem,
      usuario: { id: projeto.usuario.id },
    });
  };

  // Delete a projeto
  const deleteProjeto = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/remover/${id}`);
      setMessage("Projeto removido com sucesso");
      fetchProjetos();
    } catch (error) {
      handleError(error);
    }
  };
  const navigate = useNavigate(); // Hook para navegar entre rotas

  const selecionar = (id) => {
    navigate("/detalhes", { state: { id } }); // Passa o ID como estado
  };
  

  return (
    <div className="App" style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <BarraDeBusca />
        <div className="box-branco">
          <ContainerPerfil style={{ borderRadius: "10px" }}>
            <h1>Meus projetos</h1>
            {message && <p>{message}</p>}
            {projetos.map((obj, indice) => (
  <div key={obj.id || indice}>
    <Cardprojetista
      titulo={obj.titulo}
      projetista={obj.dataFinalizacao || "Sem Prazo"}
    />
    <button onClick={() => selecionar(obj.id)}>Selecionar</button>
    <button onClick={() => editProjeto(obj)}>Editar</button>
    <button onClick={() => deleteProjeto(obj.id)}>Excluir</button>
  </div>
))}
          </ContainerPerfil>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
