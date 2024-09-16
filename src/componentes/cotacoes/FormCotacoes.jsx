import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { listarProdutos, obterProduto, excluirProduto , inserirProduto, alterarProduto} from "../../infra/produtos";
import { listarFornecedores } from "../../infra/fornecedores";
import { obterCotacao, inserirCotacao, excluirCotacao, alterarCotacao } from "../../infra/cotacoes";
import { useEffect } from "react";
import { useState } from "react";
import { alterarRequisicao, listarRequisicoes, obterRequisicao } from "../../infra/requisicoes";

export default function FormCotacoes({ idEmEdicao, setIdEmEdicao , fornecedores, setFornecedores, controle, setControle, produtos, setProdutos,cotacoes,setCotacoes, requisicoes, setRequisicoes}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();
    const [fornecedoresProduto, setFornecedoresProduto] = useState([]);
    const [prodMsg, setProdMsg] = useState("");
    

    function handleChange(event) {
        
        let prod = "";
        for(let req of requisicoes) {
          if(req.id == event.target.value) {
            prod = req.produtoRequisicao;
          }
        }
        setProdMsg(prod);
        
        let temp = [];
        for(let p of produtos) {
          if(p.nomeProduto == prod) {
              temp = p;
          }
        }
        setFornecedoresProduto(temp.fornecedores);
    }

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                
                const cotacao = await obterCotacao(idEmEdicao);
                
                
                setValue("requisicao", cotacao.requisicao);
                setValue("fornecedor", cotacao.fornecedor);
                setValue("data", cotacao.data);
                setValue("valor", cotacao.valor);
                setControle(!controle);

            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function fetchData2() {
      const novaListaRequisicoes = await listarRequisicoes();
      setRequisicoes(novaListaRequisicoes);
    }

    async function fetchData3() {
      const novaListaProdutos = await listarProdutos();
      setProdutos(novaListaProdutos);
    }



    useEffect(() => {
      fetchData2();
      fetchData3();
    }, [])


    async function submeterDados(dados) {
          let idRequisicao = dados.requisicao;
          let requisicaoAtual = await obterRequisicao(idRequisicao);
          
          if(idEmEdicao) {
            await alterarCotacao({...dados, id: idEmEdicao})
            setIdEmEdicao("");
            setControle(!controle);
          }
          else {
            if(requisicaoAtual.status != "Cotado") {
              dados.produto = prodMsg;
              let id = await inserirCotacao(dados);
              setControle(!controle);
              setIdEmEdicao("");
              if(requisicaoAtual.status == "Em aberto") {
                requisicaoAtual.qtdCotacoes++;
                requisicaoAtual.status = "Em cotação";
              }
              else if(requisicaoAtual.status == "Em cotação") {
                requisicaoAtual.qtdCotacoes++;
                if(requisicaoAtual.qtdCotacoes == 3) {
                  requisicaoAtual.status = "Cotado";
                }
              }
              await alterarRequisicao({...requisicaoAtual, id: idRequisicao});
              reset();
            }
            else {
              alert("Produto já cotado");
            }
            
          }
    }

    async function handleExcluir() {
         await excluirCotacao(idEmEdicao);
         setControle(!controle);
         setIdEmEdicao("");
        
        
    }

    return (
        <>
            <div className="containerContato">
                <form onSubmit={handleSubmit(submeterDados)}>
                  <div className="containerGrid"> 
                    
                    <select  {...register("requisicao", {onChange: (e) => handleChange(e)})}>
                      <option value={-1}>Selecione uma requisição de compra</option>
                      {requisicoes.map((item,index) => <option value={item.id}>Requisição feita por: {item.usuario}</option>)}
                    </select>
                    Produto: {prodMsg}
                    <select {...register("fornecedor")}>
                      <option value={-1}>Selecione um fornecedor deste produto</option>
                      {fornecedoresProduto.map((item,index) => <option value={item}>{item}</option>)}
                    </select>
                    <div>
                      <label className="formLabel" htmlFor="data">Data</label>&nbsp;
                      <input type="date" size={50} {...register("data", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                      })} />
                    </div>
                    <div>
                      <label className="formLabel" htmlFor="valor">Valor</label>&nbsp;
                      <input size={50} {...register("valor", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 2 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                      })} />
                    </div>
                  </div>
                    <div className="botoes">
                      <input style={{ margin: "5px", display: "inline-block" }} type="submit" value="Salvar" />
                      <input style={{ margin: "5px", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
                    </div>
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nome?.message && (
                    <div>{errors.nome.message}</div>
                )}
                {errors.email?.message && (
                    <div>{errors.email.message}</div>
                )}
                {errors.fone?.message && (
                    <div>{errors.fone.message}</div>
                )}
            </div>
        </>
    );
}