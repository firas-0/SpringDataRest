import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import api from "../axios";

export default function VoitureListe() {
  const [voitures, setVoitures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/voitures");          // baseURL=/api
        const list = res.data?._embedded?.voitures ?? []; // HAL unwrap
        setVoitures(list);
      } catch (e) {
        setError(e.message || "Load failed");
        console.error(e);
      }
    })();
  }, []);

  return (
    <Card className="border border-dark bg-dark text-white">
      <Card.Header>Liste Voitures</Card.Header>
      <Card.Body>
        {error && <div style={{color:"salmon"}}>Erreur: {error}</div>}
        <Table bordered hover striped variant="dark">
          <thead>
            <tr>
              <th>Marque</th><th>Modèle</th><th>Couleur</th><th>Année</th><th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {voitures.length === 0 ? (
              <tr><td colSpan="5" align="center">Aucune voiture</td></tr>
            ) : voitures.map((v, i) => (
              <tr key={i}>
                <td>{v.marque}</td>
                <td>{v.modele}</td>
                <td>{v.couleur}</td>
                <td>{v.annee}</td>
                <td>{v.prix}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

