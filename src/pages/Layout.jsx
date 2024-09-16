import { Outlet, Link , useNavigation, redirect} from "react-router-dom";
import BarraLogin from "../componentes/login/BarraLogin";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../infra/firebase";
import { useEffect } from "react";
export default function Layout(props) {

    
    const [contatos,setContatos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [cotacoes, setCotacoes] = useState([]);
    const [requisicoes, setRequisicoes] = useState([]);
    
    

    return (
        <div style={{width: "800px"}}>
            
            
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={"/"}>Início</Link>
                            </li>
                            {props.usuario.tipo == "" &&
                            <li>
                                <Link to={"/login"}>Login</Link>
                            </li>
                            }
                            <li>
                                <Link to={"/criarconta"}>Criar Conta</Link>
                            </li>
                            
                            {props.usuario.tipo == "administrador" && <>
                            <li>
                                <Link to={"/fornecedores"}>Fornecedores</Link>
                            </li>        
                            
                            <li>
                                <Link to={"/contatos"}>Contatos</Link>
                            </li>
                            <li>
                                <Link to={"/produtos"}>Produtos</Link>
                            </li>
                            <li>
                                <Link to={"/cotacoes"}>Cotações</Link>
                            </li>
                            <li>
                                <Link to={"/gerenciarcolaboradores"}>Gerenciar Colaboradores</Link>
                            </li>
                            </>}
                            {props.usuario.tipo == "colaborador" &&
                            <li>
                                <Link to={"/requisicoes"}>Requisicoes</Link>
                            </li> }
                            
                            
                            
                            {props.usuario.tipo &&
                            <li onClick={() => {
                                        signOut(auth).then(() => {})
                                        props.setUsuario({email: "", senha: "", tipo: ""});
                                        console.log(props.usuario)
                                        }
                                        }>
                                <Link to="/">Sair</Link>
                            </li>
                            }
                            
                        </ul>
                    </nav>
                    
                    <Outlet context={[contatos,setContatos,fornecedores,setFornecedores,produtos,setProdutos,cotacoes,setCotacoes,requisicoes,setRequisicoes]} />
                </div>
            
        </div>
    )
};
