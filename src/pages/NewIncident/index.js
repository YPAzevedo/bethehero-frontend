import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

const NewIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("@bethehero/ong-id");

  const handleCreateNewIncident = async (e) => {
    e.preventDefault();

    try {
      const body = {
        title,
        description,
        value,
      };

      await api.post("/incidents", body, {
        headers: {
          authorization: ongId,
        },
      });
      history.push("/dashboard");
    } catch {
      alert("Error registering your incident.");
    }
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Register new incident</h1>
          <p>Describe the incident to find heros to help you solve it.</p>

          <Link className="back-link" to="/dashboard">
            <FiArrowLeft size={16} color="#e32041" />
            Go back
          </Link>
        </section>
        <form onSubmit={handleCreateNewIncident}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Value in dollars"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
