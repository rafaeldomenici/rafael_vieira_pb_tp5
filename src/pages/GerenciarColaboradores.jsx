import { useOutletContext } from "react-router-dom";
import FormProdutos from "../componentes/produtos/FormProdutos";
import FormRequisicoes from "../componentes/requisicoes/FormRequisicoes"
import ListaProdutos from "../componentes/produtos/ListaProdutos";
import { listarRequisicoes } from "../infra/requisicoes";
import { useEffect } from "react";
import { useState } from "react";
import ListaRequisicoes from "../componentes/requisicoes/ListaRequisicoes";
import { alterarUsuario, listarUsuarios, obterUsuario } from "../infra/usuarios";
import ListaColaboradores from "../componentes/gerenciarColaboradores/ListaColaboradores";

export default function GerenciarColaboradores() {

  const [requisicoes,setRequisicoes, produtos, setProdutos] = useOutletContext();
  const [colaboradores, setColaboradores] = useState([])
  const [idEmEdicao,setIdEmEdicao] = useState("");
  const [controle, setControle] = useState(false);

    async function fetchData() {
      const novaListaColaboradores = await listarUsuarios();
      setColaboradores(novaListaColaboradores);
    }

    useEffect(() => {
      fetchData();
      
    }, [controle]);

    async function handleClick() {
      if(idEmEdicao) {
        let colaborador = await obterUsuario(idEmEdicao)
        if(colaborador.acesso == "Acesso Liberado") {
          colaborador.acesso = "Banido";
        }
        else {
          colaborador.acesso = "Acesso Liberado";
        }
        await alterarUsuario({...colaborador, id: idEmEdicao});
        setControle(!controle);
      }
    }

    return (
        <div>
            <h2>Gerenciar Colaboradores</h2>
            <button onClick={handleClick}>Banir/Desbanir</button>
            <ListaColaboradores setIdEmEdicao={setIdEmEdicao} colaboradores={colaboradores}/>
            
        </div>
    );
}