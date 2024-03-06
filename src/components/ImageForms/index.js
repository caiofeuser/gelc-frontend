import React, { useState, useRef } from "react";
import { Figure, Form, Button, ButtonToolbar, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheck } from "@fortawesome/free-solid-svg-icons";
import defaultImg from "./img/default.svg";
import api from "../../resources/api";

const ImageForms = ({
  image = { url: defaultImg, alt: "", disabled: false },
  onSubmit,
}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isAltChanged, setIsAltChanged] = useState(false);
  const [isBeingSent, setIsBeingSent] = useState(false);
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleFileInputChange = (e) => {
    setIsFileUploaded(Boolean(e.target.value));
  };

  const handleAltInputChange = (e) => {
    setIsAltChanged(Boolean(e.target.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsBeingSent(true);

    if (!isFileUploaded && !isAltChanged) {
      return;
    }

    const form = new FormData(e.target);

    if (form.get("file").size > 2072576) {
      alert(
        "Arquivo muito grande! Somente imagens menores do que 2MB são suportadas!"
      );
      setIsBeingSent(false);
      setIsFileUploaded(false);
      setIsAltChanged(false);
      return;
    }

    await onSubmit(form);
    setIsBeingSent(false);
    setIsFileUploaded(false);
    setIsAltChanged(false);
  };

  // if (image === null) {
  //   return null;
  // }

  return (
    <section className="p-2 bg-light my-2">
      <Figure className="text-center w-100">
        <Figure.Image src={image?.url} thumbnail />
        <Figure.Caption>
          Somente imagens com a extensão .png, .jpeg ou .jpg são suportadas. O
          tamanho máximo da imagem deve ser de 2MB.
        </Figure.Caption>
      </Figure>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="imageDescription">
          <Form.Label>Descrição da imagem:</Form.Label>
          <Form.Control
            type="text"
            maxLength={60}
            placeholder="descrição"
            name="alt"
            defaultValue={image?.alt}
            onChange={handleAltInputChange}
          />
          <Form.Control
            type="file"
            accept="image/x-png,image/jpeg"
            name="file"
            hidden
            ref={fileInput}
            onChange={handleFileInputChange}
          />
          <Form.Text className="text-muted">
            Opcionalmente, você pode inserir uma descrição sobre a imagem.
          </Form.Text>
        </Form.Group>
        <ButtonToolbar>
          <Button
            variant="success"
            disabled={isFileUploaded}
            onClick={handleFileInput}
          >
            <FontAwesomeIcon icon={faUpload} size="1x" className="mx-1" />
            Upload
          </Button>
          <Button
            variant="success"
            disabled={!isFileUploaded && !isAltChanged}
            className="mx-1"
            type="submit"
          >
            {isBeingSent ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <FontAwesomeIcon icon={faCheck} size="1x" className="mx-1" />
            )}
          </Button>
        </ButtonToolbar>
      </Form>
    </section>
  );
};

export default ImageForms;
