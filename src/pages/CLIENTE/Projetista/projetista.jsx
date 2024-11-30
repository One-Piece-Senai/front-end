import SideBar from "../../../components/sidebar/sidebar";
import BarraDeBusca from "../../../components/barra-de-busca/barra-busca";
import { MiniStyle } from "../../../components/mini-card/mini-style";
import CardProjetistasDisp from "../../../components/card-projetistas-disponiveis/projetistas-disponiveis";
import SideBarProjetista from "../../../components/sidebar_projetista/sidebar_projetista"
import { ContainerPerfil } from "../../../components/card-perfil/style-perfil";

function Clientes() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <BarraDeBusca />
        <div className="box-branco">
          <ContainerPerfil style={{ borderRadius: "10px" }}>
        <h1>Projetistas </h1>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <CardProjetistasDisp />
          <CardProjetistasDisp />
          <CardProjetistasDisp />
          <CardProjetistasDisp />
          <CardProjetistasDisp />
          <CardProjetistasDisp />
          <CardProjetistasDisp />
          <CardProjetistasDisp />
        </section>
        </ContainerPerfil>
      </div>
      </div>
      </div>
    );
}

export default Clientes;
