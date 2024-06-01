import { Link, Router, Routes } from "react-router-dom";

const logout = () => {
  setAutenticado(false);
};

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-danger navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand text-dark align-self-start">INÍCIO</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/cartas" className="nav-link text-dark">Incluir Carta</Link>
          </li>
          <li className="nav-item">
            <Link to="/controle" className="nav-link text-dark">Controle de Cartas</Link>
          </li>
          <li className="nav-item">
            <Link to="/usuarios" className="nav-link text-dark">Cadastrar Usuário</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-self-center btn-outline-dark" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;