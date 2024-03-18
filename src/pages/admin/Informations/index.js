import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import InformationsForms from "../../../components/InformationsForms";
import ImageForms from "../../../components/ImageForms";
import { Container, Col, Row } from "react-bootstrap";
import api from "../../../resources/api";
import { getAuthenticatedUserPermission } from "../../../resources/auth";

const Informations = () => {
  const [informations, setInformations] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/info");
        setInformations(response.data);
      } catch (err) {
        alert(
          "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
        );
      }
    };
    fetchData();
  }, []);

  const updateInformations = async (form) => {
    try {
      let changedInformations = {};

      form.forEach((value, property) => {
        if (informations[property] !== value) {
          changedInformations[property] = value;
        }
      });

      if (Object.entries(changedInformations).length === 0) {
        return;
      }

      const response = await api.put("/info", changedInformations);
      setInformations(response.data);
      alert("Informações salvas com sucesso!");
    } catch (err) {
      handleRequestError(err);
    }
  };

  const updateImage = async (form) => {
    try {
      let image;

      if (form.get("file").name) {
        if (informations.image && informations.image._id) {
          await api.delete(`image/${informations.image._id}`);
        }
        image = (await api.post(`/image/info/${informations._id}`, form)).data;
      } else if (form.get("alt")) {
        image = (
          await api.put(`/image/${informations.image._id}`, {
            alt: form.get("alt"),
          })
        ).data;
      } else {
        return;
      }

      // const updateImageInfo = await api.put(`/info/${informations._id}`, {
      //   image: image._id,
      // });

      let updatedInformations = { ...informations, image };
      setInformations(updatedInformations);
      alert("Arquivo enviado com sucesso!");
    } catch (err) {
      handleRequestError(err);
    }
  };

  const handleRequestError = (err) => {
    switch (err.response.status) {
      case 500:
        alert(
          "Ocorreu algum erro no servidor! Verifique a validade dos dados enviados e tente novamente."
        );
        break;
      case 403:
        alert("Você não tem permissão para realizar essa operação!");
        break;
      case 401:
        alert("É necessário se autenticar para realizar essa operação!");
        break;
      case 400:
        alert("Há algum problema com os dados fornecidos!");
        break;
      default:
        alert(
          "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
        );
        break;
    }
  };

  return (
    <>
      <Header admin={getAuthenticatedUserPermission()} info />
      <main>
        <Container className="my-4">
          <h3 className="text-uppercase">Informações</h3>
          <h4>Gerencie as informações presentes no seu site.</h4>
          <p>
            Nesta página você pode alterar algumas informações que são exibidas
            nas páginas do seu site. Além disso, você pode alterar informações
            de contato e a imagem presente na página principal.
          </p>
          <hr />
          <Row>
            <Col lg={7}>
              <InformationsForms
                informations={informations}
                onSubmit={updateInformations}
              />
            </Col>
            <Col lg={5}>
              <ImageForms image={informations.image} onSubmit={updateImage} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Informations;
