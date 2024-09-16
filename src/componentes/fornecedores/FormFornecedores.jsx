import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { alterarFornecedor, excluirFornecedor, inserirFornecedor, listarFornecedores, obterFornecedor  } from "../../infra/fornecedores";
import { useEffect } from "react";
import '../../App.css'
import { alterarProduto } from "../../infra/produtos";

export default function FormFornecedores({ idEmEdicao, setIdEmEdicao , produtos, setProdutos, controle, setControle}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const fornecedor = await obterFornecedor(idEmEdicao);
                setValue("nomeFantasia", fornecedor.nomeFantasia);
                setValue("razaoSocial", fornecedor.razaoSocial);
                setValue("cnpj", fornecedor.cnpj);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
      if(idEmEdicao) {
          await alterarFornecedor({...dados, id: idEmEdicao})
          setControle(!controle);
          setIdEmEdicao("");
      }
      else {
        dados.contatos = [];
        let id = await inserirFornecedor(dados);
        setControle(!controle)
        setIdEmEdicao("");
        reset();
      }
    }

    async function handleExcluir() {
         
         const f = await obterFornecedor(idEmEdicao);
         await excluirFornecedor(idEmEdicao);
         setControle(!controle);
         
         setIdEmEdicao("");
        
        
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="nomeFantasia">Nome de Fantasia</label>&nbsp;
                    <input size={50} {...register("nomeFantasia", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                    })} />
                    <br />
                    <label className="formLabel" htmlFor="razaoSocial">Razão Social</label>&nbsp;
                    <input size={30} {...register("razaoSocial", {
                        required: "Email é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Email tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Email só pode ter até 30 caracteres",
                            
                        },
                    })} />
                    <br />
                    <label className="formLabel" htmlFor="cnpj">CNPJ</label>&nbsp;
                    <input size={14} {...register("cnpj", {
                        required: "Telefone é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 8 || "Telefone tem que ter pelo menos 8 dígitos",
                            matchPattern: (value) => regexNumerico.test(value) || "Telefone tem que ser numérico",
                        },
                    })} />
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