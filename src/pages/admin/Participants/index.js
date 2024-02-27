import React from "react";
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

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      selectedParticipant: { profile: {} },
      participantsPagination: {},
      search: "",
      mode: "add",
    };
  }

  async componentDidMount() {
    try {
      let { docs: participants, ...participantsPagination } = (
        await api.get("/participant")
      ).data;

      if (participants.length > 0) {
        let selectedParticipant = participants[0];
        let mode = "view";
        this.setState({
          participants,
          selectedParticipant,
          participantsPagination,
          mode,
        });
      }
    } catch (err) {
      alert(
        "Não foi possível acessar o servidor! por favor tente novamente em alguns instantes."
      );
      throw new Error("unable to access server!");
    }
  }

  viewParticipant = (participant) => {
    let mode = "view";
    this.setState({ selectedParticipant: participant, mode });
  };

  addParticipant = () => {
    let selectedParticipant = {
      _id: Math.random(),
      email: "",
      password: "",
      permission: "student",
      office: "",
    };

    let mode = "add";
    this.setState({ selectedParticipant, mode });
  };

  removeParticipant = async (participant) => {
    const confirmation = window.confirm(
      `Deseja realmente remover o participante ${
        participant.name || participant.email
      }?`
    );

    if (confirmation) {
      try {
        if (participant.profile) {
          await api.delete(`/image/${participant.profile.image._id}`);
        }
        await api.delete(`/participant/${participant._id}`);
        this.setParticipantPage();

        if (participant === this.state.selectedParticipant) {
          if (this.state.participants.length > 0) {
            let selectedParticipant = this.state.participants[0];
            this.setState({ selectedParticipant });
          } else {
            this.addParticipant();
          }
        }
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

          default:
            alert(
              "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
            );
            break;
        }
      }
    }
  };

  saveParticipant = async (form) => {
    try {
      let participant = {};
      participant.email = form.get("email");
      participant.office = form.get("office");
      participant.permission = form.get("permission");
      participant.password = form.get("password");
      await api.post("/participant", participant);
      this.setParticipantPage();
      alert("Novo participante salvo com sucesso!");
    } catch (err) {
      switch (err.response.status) {
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

  async setParticipantPage(page) {
    if (!page) {
        page = this.state.participantsPagination.page;
    }

    let params = { page };

    if (this.state.search) {
        params.search = this.state.search;
    }

    try {
        const response = await api.get("/participant", { params });
        const { docs: participants, ...participantsPagination } = response.data;
        this.setState({ participants, participantsPagination });
    } catch (err) {
        switch (err.response?.status) {
            case 500:
                alert("Ocorreu algum erro no servidor! Tente novamente em alguns instantes.");
                break;
            default:
                alert("Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes.");
                break;
        }
    }
}

viewParticipant = participant => {
    let mode = "view";
    this.setState({ selectedParticipant: participant, mode });
};

addParticipant = () => {
    let selectedParticipant = {
        _id: Math.random(),
        email: "",
        password: "",
        permission: "student",
        office: "",
    };

    let mode = "add";
    this.setState({ selectedParticipant, mode });
};

removeParticipant = async participant => {
    const confirmation = window.confirm(`Deseja realmente remover o participante ${participant.name || participant.email}?`);

    if (confirmation) {
        try {
            if (participant.profile && participant.profile.image) {
                await api.delete(`/image/${participant.profile.image._id}`);
            }
            await api.delete(`/participant/${participant._id}`);
            this.setParticipantPage();
            if (participant === this.state.selectedParticipant) {
                if (this.state.participants.length > 0) {
                    let selectedParticipant = this.state.participants[0];
                    this.setState({ selectedParticipant });
                } else {
                    this.addParticipant();
                }
            }
        } catch (err) {
            switch (err.response?.status) {
                case 500:
                    alert("Ocorreu algum erro no servidor! tente novamente em alguns instantes.");
                    break;
                case 403:
                    alert("Você não tem permissão para realizar essa operação!");
                    break;
                case 401:
                    alert("É necessário se autenticar para realizar essa operação!");
                    break;
                default:
                    alert("Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes.");
                    break;
            }
        }
    }
};

async saveParticipant(form) {
    try {
        let participant = {
            email: form.get("email"),
            office: form.get("office"),
            permission: form.get("permission"),
            password: form.get("password"),
        };
        await api.post("/participant", participant);
        this.setParticipantPage();
        alert("Novo participante salvo com sucesso!");
    } catch (err) {
        switch (err.response?.status) {
            case 500:
                alert("Ocorreu algum erro no servidor! tente novamente em alguns instantes.");
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
                alert("Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes.");
                break;
        }
    }
};


  searchParticipant = async (text) => {
    this.setState({ search: text });
    this.setParticipantPage();
  };

  render() {
    return (
      <React.Fragment>
        <Header admin={getAuthenticatedUserPermission()} participants />
        <main>
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
                  list={this.state.participants}
                  special={(p) =>
                    p._id === getAuthenticatedUserId() && "Logado"
                  }
                  pagination={this.state.participantsPagination}
                  onSetPage={this.setParticipantPage}
                  onAddParticipant={this.addParticipant}
                  onRemoveParticipant={this.removeParticipant}
                  onSelectParticipant={this.viewParticipant}
                  onSearch={this.searchParticipant}
                />
              </Col>
              <Col lg={7}>
                {this.state.selectedParticipant.profile && (
                  <ImageForms
                    image={this.state.selectedParticipant.profile.image}
                    disabled
                  />
                )}
                <ParticipantsForms
                  participant={this.state.selectedParticipant}
                  key={this.state.selectedParticipant._id}
                  mode={this.state.mode}
                  onSubmit={this.saveParticipant}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default Participants;
