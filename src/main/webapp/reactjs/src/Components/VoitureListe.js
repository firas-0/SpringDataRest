import React, { Component } from "react";
import { Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = { voitures: [], show: false, toastMsg: "", toastBg: "success" };
    this.deleteVoiture = this.deleteVoiture.bind(this);
  }

  async componentDidMount() {
    // Using Spring Data REST HAL structure: _embedded.voitures
    const res = await axios.get("http://localhost:8080/api/voitures", {
      auth: { username: "user", password: "YOUR_CONSOLE_PASSWORD_IF_SECURITY_ON" }
    });
    const voitures = res.data?._embedded?.voitures || [];
    this.setState({ voitures });
  }

  async deleteVoiture(voiture) {
    try {
      // In HAL, each item has a self link
      const self = voiture._links?.self?.href;
      if (!self) return;

      await axios.delete(self, {
        auth: { username: "user", password: "YOUR_CONSOLE_PASSWORD_IF_SECURITY_ON" }
      });

      this.setState({
        voitures: this.state.voitures.filter(v => v._links?.self?.href !== self),
        show: true, toastMsg: "Voiture supprimée avec succès.", toastBg: "danger"
      });
      setTimeout(() => this.setState({ show: false }), 3000);
    } catch (e) {
      this.setState({ show: true, toastMsg: "Erreur lors de la suppression.", toastBg: "danger" });
      setTimeout(() => this.setState({ show: false }), 3000);
    }
  }

  render() {
    return (
      <>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast show={this.state.show} message={this.state.toastMsg} bg={this.state.toastBg} />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Liste Voitures</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th><th>Modèle</th><th>Couleur</th>
                  <th>Année</th><th>Prix</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">Aucune Voiture n’est disponible</td>
                  </tr>
                ) : (
                  this.state.voitures.map((v, idx) => (
                    <tr key={idx}>
                      <td>{v.marque}</td>
                      <td>{v.modele}</td>
                      <td>{v.couleur}</td>
                      <td>{v.annee}</td>
                      <td>{v.prix}</td>
                      <td>
                        {/* Edit button could navigate to edit form (not covered in TP) */}
                        <Button size="sm" variant="outline-danger"
                                onClick={() => this.deleteVoiture(v)}>
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }
}

