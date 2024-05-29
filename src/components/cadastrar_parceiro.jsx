import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_Parceiro = () => {
  const { register, handleSubmit,reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("parceiros/createPartners", campos);
      setAviso(`Parceiro cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar parceiro!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Parceiro</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              autoFocus
              {...register("name")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="occupation">Ocupação</label>
            <input
              type="text"
              className="form-control"
              id="occupation"
              required
              {...register("occupation")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="cellphone">Telefone:</label>
            <input
              type="text"
              className="form-control"
              id="cellphone"
              required
              {...register("cellphone")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="price_hr">Preço/Hr:</label>
            <input
              type="Double"
              className="form-control"
              id="price_hr"
              required
              {...register("price_hr")}
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Enviar"
          />
          <input
            type="reset"
            className="btn btn-danger mt-3 ms-3"
            value="Limpar"
          />
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Cadastrar_Parceiro;
