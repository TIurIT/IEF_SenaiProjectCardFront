import { Link } from "react-router-dom";

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">Controle de Estoque</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Incluir Carta</Link>
          </li>
          <li className="nav-item">
            <Link to="/controle" className="nav-link">Controle de Cartas</Link>
          </li>
          <li className="nav-item">
            <Link to="/usuarios" className="nav-link">Cadastrar Usuário</Link>
          </li>
          <li className="nav-item">
          <Link to="/parceiros" className="nav-link">Cadastrar Parceiro</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-sm btn-outline-secondary">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;