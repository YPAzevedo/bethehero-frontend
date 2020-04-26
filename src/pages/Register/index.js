import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    const body = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const res = await api.post('/ongs', body);

      alert(`Your access ID is: ${res.data.id}`);

      history.push("/");
    } catch {
      alert("Error registering your ONG.")
    }
    
    
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Register</h1>
          <p>
            Sign up, get in to the platform and help people find incidents
            reported by your charity.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e32041" />
            Go back
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Your charity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 85 }}
            />
          </div>
          <button className="button">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
