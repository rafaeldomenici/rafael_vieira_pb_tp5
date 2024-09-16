import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { listarProdutos, obterProduto, excluirProduto , inserirProduto, alterarProduto} from "../../infra/produtos";
import { listarFornecedores } from "../../infra/fornecedores";
import { useEffect } from "react";

export default function FormProdutos({ idEmEdicao, setIdEmEdicao , fornecedores, setFornecedores, controle, setControle, produtos, setProdutos}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            let select1 = document.querySelector("select");
            if (idEmEdicao && !isSubmitted) {
                
                
                const produto = await obterProduto(idEmEdicao);
                setValue("nomeProduto", produto.nomeProduto);
                setValue("descricao", produto.descricao);
                setValue("fornecedor", produto.fornecedor);
                
            } else {
               
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function fetchData2() {
      const novaListaFornecedores = await listarFornecedores();
      setFornecedores(novaListaFornecedores);
    }



    useEffect(() => {
      
      fetchData2();
    }, [])


    async function submeterDados(dados) {

          let prod = await listarProdutos();
          let obj = {};
          for(let i = 0; i < prod.length; i++) {
            if(prod[i].nomeProduto == dados.nomeProduto) {
              obj = prod[i];
              break;
            }
          }
          if(obj.nomeProduto) {
            if(!obj.fornecedores.includes(dados.fornecedor)) {
              obj.fornecedores.push(dados.fornecedor);
            }
            obj.descricao = dados.descricao;
            
            await alterarProduto(obj);
            setControle(!controle);
            setIdEmEdicao("");
            reset();
          }
          if(!obj.nomeProduto) {

            dados.fornecedores = [];
            dados.fornecedores.push(dados.fornecedor);
            let id = await inserirProduto(dados);
            setControle(!controle);

            setIdEmEdicao("");
            reset();
          }
        
        
    }

    async function handleExcluir() {
         await excluirProduto(idEmEdicao);
         setControle(!controle);
         setIdEmEdicao("");
        
        
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="nomeProduto">Nome do Produto</label>&nbsp;
                    <input size={50} {...register("nomeProduto", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                    })} />
                    <br />
                    <label className="formLabel" htmlFor="descricao">Descrição</label>&nbsp;
                    <input size={30} {...register("descricao", {
                        required: "Email é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Email tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Email só pode ter até 30 caracteres",
                            
                        },
                    })} />
                    <br />
                    
                    <select {...register("fornecedor")}>
                      <option value={-1}>Selecione um fornecedor</option>
                      {fornecedores.map(item => <option value={item.nomeFantasia}>{item.nomeFantasia}</option>)}
                    </select>
                    <br />
                    <input style={{ margin: "5px auto", display: "inline-block" }} type="submit" value="Salvar" />
                    <input style={{ margin: "5px auto", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
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