import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";


const ProjectsForms = (props) => {
  const [isBeingSent, setIsBeingSent] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(props.project.description);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsBeingSent(true);
    let form = new FormData(e.target);
    await props.onSubmit(form);
    setIsBeingSent(false);
  };

  let buttonText;
  switch (props.mode) {
    case "add":
      buttonText = "Adionar Projeto";
      break;
    case "update":
      buttonText = "Salvar Alterações";
      break;
    default:
      buttonText = "Salvar Alterações";
      break;
  }

  

  return (
    <section className="my-2">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Título do projeto:</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="título"
            name="title"
            defaultValue={props.project.title}
          />
          <Form.Text className="text-muted">
            O título do projeto deve ser único. Verifique essa condição antes de
            enviar os dados.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrição do projeto:</Form.Label>
          <Form.Control
            as="textarea"
            required
            placeholder="descrição"
            name="description"
            style={{ minHeight: "200px" }}
            defaultValue={props.project.description}
          />
          {/* <SimpleMDE
            onChange={(text) => setDescriptionValue(text)}
            value={descriptionValue}
          /> */}
          <Form.Text className="text-muted">
            Descreva com detalhes o projeto, o editor de texto contém vários
            recursos que podem ser utilizados para deixar sua descrição mais
            rica.
          </Form.Text>
        </Form.Group>
        <Button variant="success" type="submit">
          {isBeingSent ? "Enviando..." : buttonText}
        </Button>
      </Form>
    </section>
  );
};

export default ProjectsForms;
