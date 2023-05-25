"use client";

import { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <section id="hero">
      <div className="backdrop-container">
        <div className="backdrop-wrapper">
          <div className="hero-text mx-auto max-w-3xl text-center py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Suivez les films que vous avez regardés. <br />
              Dites à vos amis ce qui est bon. <br />
              Sauvegardez ceux que vous voulez voir. <br />
            </h2>
            <Button className="btn btn-secondary" onPress={handler} size="lg">
              Commencez-maintenant
            </Button>
            <p className="mt-6">
              <strong className="block">
                Le réseau social des amoureux de films.
              </strong>
              Bientôt disponible sur{" "}
              <a href="/apps/" className="icons">
                <i className="bi bi-android2"></i> &{" "}
                <i className="bi bi-apple"></i> *
              </a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Inscrivez-vous pour accéder au contenu de
            <Text b size={18}>
              Cinéflix!
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" onPress={closeHandler}>
            S'inscrire
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
