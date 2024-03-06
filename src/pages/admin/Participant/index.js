import React from "react";
import Header from "../../../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import ParticipantsForms from "../../../components/ParticipantsForms";
import ImageForms from "../../../components/ImageForms";
import api from "../../../resources/api";
import {
  getAuthenticatedUserId,
  getAuthenticatedUserPermission,
} from "../../../resources/auth";

class Participant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant: {
        email: "",
        office: "",
        profile: {
          name: "",
          lastname: "",
          lattes: "",
          bio: "",
        },
      },
    };
  }

  async componentDidMount() {
    try {
      let participant = (
        await api.get(`/participant/${getAuthenticatedUserId()}`)
      ).data;
      this.setState({ participant });
    } catch (err) {
      alert(
        "Não foi possível acessar o servidor! por favor tente novamente em alguns instantes."
      );
      throw new Error("unable to access server!");
    }
  }

  updateParticipant = async (form) => {
    try {
      let participant = { profile: {} };

      participant.email = form.get("email");
      participant.office = form.get("office");
      participant.profile.name = form.get("name");
      participant.profile.lastname = form.get("lastname");
      participant.profile.lattes = form.get("lattes");
      participant.profile.bio = form.get("bio");
      participant = (
        await api.put(`/participant/${this.state.participant._id}`, participant)
      ).data;
      this.setState({ participant });
      alert("Alterações salvas com sucesso!");
    } catch (err) {
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
    }
  };

  updateImage = async (form) => {
    try {
      let image;

      if (form.get("file").name) {
        if (
          this.state.participant.profile.image &&
          this.state.participant.profile.image._id
        ) {
          await api.delete(`image/${this.state.participant.profile.image._id}`);
        }

        image = (
          await api.post(
            `/image/participant/${this.state.participant._id}`,
            form
          )
        ).data;
      } else if (form.get("alt")) {
        image = (
          await api.put(`/image/${this.state.participant.profile.image._id}`, {
            alt: form.get("alt"),
          })
        ).data;
      } else {
        return;
      }

      const updatedParticipant = await api.put(
        `/participant/${this.state.participant._id}`,
        {
          profile: {
            image: image._id,
            name: this.state.participant.profile.name,
            lastname: this.state.participant.profile.lastname,
            lattes: this.state.participant.profile.lattes,
            bio: this.state.participant.profile.bio,
          },
        }
      );

      let participant = { ...this.state.participant };
      participant.profile.image = image;
      this.setState({ participant });
      alert("Arquivo enviado com sucesso!");
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

  render() {
    return (
      <React.Fragment>
        <Header admin={getAuthenticatedUserPermission()} participant />
        <main>
          <Container className="my-4">
            <Row>
              <Col>
                <h3 className="text-uppercase">
                  {this.state.participant.profile &&
                  this.state.participant.profile.name
                    ? this.state.participant.profile.name
                    : this.state.participant.email}
                </h3>
                <h4>Seja muito bem-vindo.</h4>
                {this.state.participant.profile ? (
                  <p>
                    Nesta página você pode alterar suas informações dentro do
                    sistema do GELC, sinta-se a vontade também para alterar seu
                    avatar caso deseje.
                  </p>
                ) : (
                  <p>
                    Parece que algumas informações sobre você ainda não foram
                    cadastradas no nosso sistema, por favor preencha os campos
                    em falta, assim os visitantes do site poderão conhecê-lo,
                    também não esqueça de enviar sua melhor imagem :)
                  </p>
                )}
                <hr />
              </Col>
            </Row>
            <Row>
              <Col lg={7}>
                <ParticipantsForms
                  key={this.state.participant._id}
                  participant={this.state.participant}
                  mode="update"
                  onSubmit={this.updateParticipant}
                />
              </Col>
              <Col lg={5}>
                <ImageForms
                  image={
                    this.state.participant.profile
                      ? this.state.participant.profile.image
                      : undefined
                  }
                  onSubmit={this.updateImage} // Pass the onSubmit function here
                  disabled={!this.state.participant.profile}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default Participant;
