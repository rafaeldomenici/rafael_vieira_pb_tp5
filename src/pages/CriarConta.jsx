import React from "react";
import { useState } from "react";
import "../App.css"
import { useForm } from "react-hook-form";
import { criarConta, logarUsuario } from "../infra/auth";
import { inserirUsuario } from "../infra/usuarios";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function CriarConta(props){
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    setValue,
  } = useForm();

 

  function opcoes(user) {
    if(user.tipo == "administrador") {
      return [<option value="administrador">Administrador</option>,<option value="colaborador">Colaborador</option>]
    }
    else {
      return <option value="colaborador">Colaborador</option>
    }
  }

  

  async function novaConta(dados) {
    let user = await criarConta(dados.email, dados.senha);
    if (user.erro) {
      
      alert(user.erro);
    } else {
      user.tipo = dados.tipo;
      user.acesso = "Acesso Liberado";
      await inserirUsuario(user);
      alert("Conta criada com sucesso");
    }
  }
  return (
    <>
    <h1>Criar Conta</h1>
    <form onSubmit={handleSubmit(novaConta)}>
      <div className="container4">
        <div>
          <label>Email</label>
          <input {...register("email", { required: "Email é obrigatório" })} />
        </div>
        <div>
          <label>Senha</label>
          <input {...register("senha", { required: "Nome é obrigatório" })} />
        </div>
          <select {...register("tipo")}>
            <option>Selecione o tipo de usuário</option>
            {opcoes(props.usuario)}
          </select>
        <input
          type="submit"
          value="Criar conta"
          style={{ width: "100px" }}
        />
      </div>
    </form>
    </>
  );
};
