// src/components/VoitureListe.jsx
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import api from "../axios";

export default function VoitureListe() {
  const [voitures, setVoitures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/voitures");          // baseURL = /api
        // Dépaqueter HAL JSON
        const list = res.data ?? [];
        setVoitures(list);
      } catch (e) {
        if (e.response) {
          // Le serveur a répondu avec une erreur HTTP
          setError(`Erreur serveur: ${e.response.status}`);
        } else if (e.request) {
          // Requête envoyée mais aucune réponse reçue (ORB typiquement)
          setError("Erreur réseau ou CORS (ORB)");
        } else {
          setError(e.message);
        }
        console.error(e);
      }
    })();
  }, []);

  return (
    <Card className="border border-dark bg-dark text-white mt-3">
      <Card.Header>Liste des Voitures</Card.Header>
      <Card.Body>
        {error && <div style={{ color: "salmon", marginBottom: "1rem" }}>Erreur: {error}</div>}

        <Table bordered hover striped variant="dark">
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Couleur</th>
              <th>Année</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {voitures.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">Aucune voiture</td>
              </tr>
            ) : (
              voitures.map((v) => (
                <tr key={v.id}>
                  <td>{v.marque}</td>
                  <td>{v.modele}</td>
                  <td>{v.couleur}</td>
                  <td>{v.annee}</td>
                  <td>{v.prix}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
	
