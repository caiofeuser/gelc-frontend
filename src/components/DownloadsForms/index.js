import React from "react";
import CustomForms from "../../components/CustomForms";
import { Form } from "react-bootstrap";

export default function DownloadsForms(props) {
  if (!props.mode) {
    props.mode = "add";
  }

  return (
    <CustomForms onSubmit={props.onSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Título do download:</Form.Label>
        <Form.Control
          type="text"
          required
          maxLength={60}
          placeholder="título"
          name="title"
          defaultValue={props.download.title}
        />
        {props.mode === "add" && (
          <Form.Text className="text-muted">
            O título do download deve ser único dentre os demais.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Descrição do download:</Form.Label>
        <Form.Control
          as="textarea"
          maxLength={300}
          rows="4"
          required
          placeholder="descrição"
          name="description"
          defaultValue={props.download.description}
        />
        {props.mode === "add" && (
          <Form.Text className="text-muted">
            Faça apenas uma pequena descrição sobre o download, caso queira
            disponibilizar um arquivo e realizar uma descrição detalhada sobre
            esse, crie uma nova postagem.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="url">
        <Form.Label>Endereço do arquivo:</Form.Label>
        <Form.Control
          type="url"
          required
          placeholder="endereço"
          name="url"
          defaultValue={props.download.url}
        />
        {props.mode === "add" && (
          <Form.Text className="text-muted">
            É aconselhável que se utilize sistemas como o GoogleDrive ou Dropbox
            para armazenar os arquivos. Preencha esse campo com um <em>link</em>{" "}
            associado a esse.
          </Form.Text>
        )}
      </Form.Group>
    </CustomForms>
  );
}
