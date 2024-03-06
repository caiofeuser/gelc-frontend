import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import ParticipantsForms from "../../../components/ParticipantsForms";
import ParticipantsList from "../../../components/ParticipantsList";
import ImageForms from "../../../components/ImageForms";
import api from "../../../resources/api";
import {
  getAuthenticatedUserId,
  getAuthenticatedUserPermission,
} from "../../../resources/auth";

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState({
    profile: {},
  });
  const [participantsPagination, setParticipantsPagination] = useState({});
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("add");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/participant");
        const { docs, ...pagination } = response.data;
        if (docs.length > 0) {
          setSelectedParticipant(docs[0]);
          setMode("view");
        }
        setParticipants(docs);
        setParticipantsPagination(pagination);
      } catch (err) {
        alert(
          "Não foi possível acessar o servidor! Por favor, tente novamente em alguns instantes."
        );
        throw new Error("unable to access server!");
      }
    }
    fetchData();
  }, []);

  const viewParticipant = (participant) => {
    setMode("view");
    setSelectedParticipant(participant);
  };

  const addParticipant = () => {
    const selectedParticipant = {
      _id: Math.random(),
      email: "",
      password: "",
      permission: "student",
      office: "",
    };
    setMode("add");
    setSelectedParticipant(selectedParticipant);
  };

  const removeParticipant = async (participant) => {
    const confirmation = window.confirm(
      `Deseja realmente remover o participante ${
        participant.name || participant.email
      }?`
    );
    if (confirmation) {
      try {
        if (participant.profile && participant.profile.image) {
          await api.delete(`/image/${participant.profile.image._id}`);
        }
        await api.delete(`/participant/${participant._id}`);
        setParticipantsPage();
        if (participant === selectedParticipant) {
          if (participants.length > 0) {
            setSelectedParticipant(participants[0]);
          } else {
            addParticipant();
          }
        }
      } catch (err) {
        switch (err.response?.status) {
          case 500:
            alert(
              "Ocorreu algum erro no servidor! Tente novamente em alguns instantes."
            );
            break;
          case 403:
            alert("Você não tem permissão para realizar essa operação!");
            break;
          case 401:
            alert("É necessário se autenticar para realizar essa operação!");
            break;
          default:
            alert(
              "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
            );
            break;
        }
      }
    }
  };

  const saveParticipant = async (form) => {
    try {
      const participant = {
        email: form.get("email"),
        office: form.get("office"),
        permission: form.get("permission"),
        password: form.get("password"),
      };
      await api.post("/participant", participant);
      setParticipantsPage();
      alert("Novo participante salvo com sucesso!");
    } catch (err) {
      switch (err.response?.status) {
        case 500:
          alert(
            "Ocorreu algum erro no servidor! tente novamente em alguns instantes."
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
    }
  };

  const setParticipantsPage = async (page) => {
    if (!page) {
      page = participantsPagination.page;
    }
    const params = { page };
    if (search) {
      params.search = search;
    }
    try {
      const response = await api.get("/participant", { params });
      const { docs, ...pagination } = response.data;
      setParticipants(docs);
      setParticipantsPagination(pagination);
    } catch (err) {
      switch (err.response?.status) {
        case 500:
          alert(
            "Ocorreu algum erro no servidor! Tente novamente em alguns instantes."
          );
          break;
        default:
          alert(
            "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
          );
          break;
      }
    }
  };

  const searchParticipant = async (text) => {
    setSearch(text);
    setParticipantsPage();
  };

  return (
    <React.Fragment>
      <Header admin={getAuthenticatedUserPermission()} participants />
      <main onClick={() => console.log(participants)}>
        <Container className="my-4">
          <Row>
            <Col>
              <h3 className="text-uppercase">Participantes</h3>
              <h5>Gerencie os membros participantes do grupo.</h5>
              <p>
                Esta página foi desenvolvida para que você possa inserir novos
                participantes no sistema, visualizar suas informações ou
                removê-los. Os participantes com permissão de estudante não
                possuem acesso a essa área quando logados.
              </p>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <ParticipantsList
                participants={participants}
                special={(p) => p._id === getAuthenticatedUserId() && "Logado"}
                pagination={participantsPagination}
                onSetPage={setParticipantsPage}
                onAddParticipant={addParticipant}
                onRemoveParticipant={removeParticipant}
                onSelectParticipant={viewParticipant}
                onSearch={searchParticipant}
              />
            </Col>
            <Col lg={7}>
              {selectedParticipant.profile && (
                <ImageForms
                  image={selectedParticipant.profile.image}
                  disabled
                />
              )}
              <ParticipantsForms
                participant={selectedParticipant}
                key={selectedParticipant._id}
                mode={mode}
                onSubmit={saveParticipant}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default Participants;
