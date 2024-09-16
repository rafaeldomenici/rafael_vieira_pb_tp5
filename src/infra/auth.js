import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'


export async function criarConta(email,senha) {
  let retorno = {};
  await createUserWithEmailAndPassword(auth, email,senha)
    .then((credenciais) => {
      
      retorno.email = email;
      retorno.senha = senha;
      
    })
    .catch((error) => {
      retorno.erro = "Não foi possível criar a conta";
    })
  return retorno;
}

export async function logarUsuario(email,senha) {
  let retorno = {};
  await signInWithEmailAndPassword(auth,email,senha)
    .then((credenciais) => {
      retorno.id = credenciais.user.uid;
      retorno.email = email;
      retorno.senha = senha;
    })
    .catch(error => retorno.erro = "Login inválido");

  return retorno;
}