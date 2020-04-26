import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ongName = localStorage.getItem("@bethehero/ong-name");
  const ongId = localStorage.getItem("@bethehero/ong-id");

  useEffect(() => {
    const loadData = async () => {
      const res = await api.get("/profile", {
        headers: {
          authorization: ongId,
        },
      });

      setIncidents(res.data);
    };

    try {
      loadData();
    } catch {
      alert("We had a problem loading your incidents.");
    }
  }, [ongId]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch {
      alert("Something went wrong deleting your incident.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="dashboard-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Welcome, {ongName}!</span>
        <Link className="button" to="/incident/new">
          Register new incident
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Resgistered incidents</h1>

      <ul>
        {incidents.map((incident) => (
          <li>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(incident.value)}
            </p>
            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
