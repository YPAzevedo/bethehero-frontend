import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

const Login = () => {
  const [id, setId] = useState("");

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/sessions", { id });

      localStorage.setItem('@bethehero/ong-id', id);
      localStorage.setItem('@bethehero/ong-name', res.data.name);

      history.push('/dashboard');
    } catch {
      alert("Login failed, you might have the wrong ID.")
    }
  };

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="logo" />

        <form onSubmit={handleLogin}>
          <h1>Login to you account.</h1>

          <input
            placeholder="Your account ID."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Login
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e32041" />I don't have an account.
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heros" />
    </div>
  );
};

export default Login;
