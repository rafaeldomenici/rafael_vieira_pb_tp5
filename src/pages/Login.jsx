import React from "react";
import { useState } from "react";
import "../App.css"
import { useForm } from "react-hook-form";
import { logarUsuario } from "../infra/auth";
import { listarUsuarios } from "../infra/usuarios";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function Login(props){
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    setValue,
  } = useForm();

  

  async function login(dados) {
  
    if(dados.email == "machadodeassis@abl.com.br" && dados.senha == "123456") {
        props.setUsuario({email: "machadodeassis@abl.com.br", senha: "123456", tipo: "administrador"})
    }
    else {
      let banido = false;
      let allUsers = await listarUsuarios();
      for(let u of allUsers) {
        if(u.email == dados.email && u.acesso == "Banido") {
          banido = true;
          alert("Usuário banido")
        }
      }
      if(!banido) {

        let user = await logarUsuario(dados.email, dados.senha);
        if (user.erro) {
          alert(user.erro);
        } else {
          alert("Login realizado com sucesso");
          props.setUsuario({email: dados.email, senha: dados.senha, tipo: "colaborador"})
        }
      }
    }
  }
  return (
  <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(login)}>
      <div className="container4">
        <div>
          <label>Email</label>
          <input {...register("email", { required: "Email é obrigatório" })} />
        </div>
        <div>
          <label>Senha</label>
          <input {...register("senha", { required: "Nome é obrigatório" })} />
        </div>
        <input
          type="submit"
          value="Realizar login"
          style={{ width: "100px" }}
        />
      </div>
    </form>
  </>
  );
};
