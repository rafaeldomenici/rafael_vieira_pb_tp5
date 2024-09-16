import { useOutletContext } from "react-router-dom";
import FormProdutos from "../componentes/produtos/FormProdutos";
import FormRequisicoes from "../componentes/requisicoes/FormRequisicoes"
import ListaProdutos from "../componentes/produtos/ListaProdutos";
import { listarRequisicoes } from "../infra/requisicoes";
import { useEffect } from "react";
import { useState } from "react";
import ListaRequisicoes from "../componentes/requisicoes/ListaRequisicoes";

export default function Requisicoes({usuario,setUsuario}) {

  const [requisicoes,setRequisicoes, produtos, setProdutos] = useOutletContext();
  const [idEmEdicao,setIdEmEdicao] = useState("");
  const [controle, setControle] = useState(false);

    async function fetchData() {
      const novaListaRequisicoes = await listarRequisicoes();
      const novaListaRequisicoesFiltrada = novaListaRequisicoes.filter((item) => item.usuario == usuario.email);
      setRequisicoes(novaListaRequisicoesFiltrada);
    }

    useEffect(() => {
      fetchData();
      
    }, [controle]);

    return (
        <div>
            <h2>Cadastro de Requisições de Compra</h2>
            <FormRequisicoes produtos={produtos} setProdutos={setProdutos} requisicoes={requisicoes} setRequisicoes={setRequisicoes} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} controle={controle} setControle={setControle} usuario={usuario} setUsuario={setUsuario}/>
            <ListaRequisicoes requisicoes={requisicoes} setIdEmEdicao={setIdEmEdicao}/>
            
        </div>
    );
}