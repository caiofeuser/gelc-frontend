import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import ProjectsList from "../../../components/ProjectsList";
import ParticipantsList from "../../../components/ParticipantsList";
import ProjectsForms from "../../../components/ProjectsForms";
import ImageForms from "../../../components/ImageForms";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  Button,
  Collapse,
} from "react-bootstrap";
import api from "../../../resources/api";
import { getAuthenticatedUserPermission } from "../../../resources/auth";
import "./style.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectsPagination, setProjectsPagination] = useState({});
  const [selectedProject, setSelectedProject] = useState({});
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("add");
  const [addParticipantMode, setAddParticipantMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let { docs: fetchedProjects, ...fetchedProjectsPagination } = (
          await api.get("/project")
        ).data;

        if (fetchedProjects.length > 0) {
          let defaultSelectedProject = fetchedProjects[0];
          setSelectedProject(defaultSelectedProject);
          setMode("update");
        }

        console.log("fecthdata, useEffetct", fetchedProjects);
        setProjects(fetchedProjects);
        setProjectsPagination(fetchedProjectsPagination);
      } catch (err) {
        alert(
          "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
        );
        throw new Error("unable to access server!");
      }
    }

    fetchData();
  }, []);

  const addProject = () => {
    let newSelectedProject = {
      _id: Math.random(),
      title: "",
      description: "",
    };

    setSelectedProject(newSelectedProject);
    setMode("add");
  };

  const addParticipant = () => {
    setAddParticipantMode(!addParticipantMode);
  };

  const saveProject = async (form) => {
    try {
      let title = form.get("title");
      let description = form.get("description");

      if (mode === "add") {
        if (!title || !description) {
          return;
        }

        let { data: newSelectedProject } = await api.post("/project/", {
          title,
          description,
        });

        setSelectedProject(newSelectedProject);
        setMode("update");
        setProjectPage();
        alert("Projeto cadastrado com sucesso!");
      } else if (mode === "update") {
        let project = { title, description };

        if (!title && !description) {
          return;
        }

        if (!description) {
          delete project.description;
        }

        let { data: updatedSelectedProject } = await api.put(
          `/project/${selectedProject._id}`,
          project
        );

        console.log("aqui qui  auqi", updatedSelectedProject);
        setSelectedProject(updatedSelectedProject);
        setProjectPage();
        alert("Projeto alterado com sucesso!");
      }
    } catch (err) {
      handleErrorResponse(err);
      // window.location.reload();
    }
  };

  useEffect(() => {
    console.log(selectedProject.members);
  }, [selectedProject]);

  const saveParticipant = async (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let email = form.get("email");
    let office = form.get("office");

    try {
      let { data: newSelectedProject } = await api.post(
        `/project/${selectedProject._id}/${office}/${email}`
      );

      console.log("saveParticipant", newSelectedProject);
      setSelectedProject(newSelectedProject);
      setProjectPage();
      alert("Novo membro cadastrado no projeto");
      window.location.reload();
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const selectProject = (project) => {
    setMode("update");
    setSelectedProject(project);
  };

  const removeProject = async (project) => {
    const confirmation = window.confirm(
      `Deseja realmente remover o projeto ${project.title}?`
    );

    if (confirmation) {
      try {
        if (project.image) {
          await api.delete(`/image/${project.image._id}`);
        }

        await api.delete(`/project/${project._id}`);

        setProjectPage();

        if (project === selectedProject) {
          if (projects.length > 0) {
            let newSelectedProject = projects[0];
            setSelectedProject(newSelectedProject);
          } else {
            addProject();
          }
        }
      } catch (err) {
        handleErrorResponse(err);
      }
    }
  };

  const removeParticipant = async (participant) => {
    const confirmation = window.confirm(
      `Deseja realmente remover o participante ${participant.email} do projeto ${selectedProject.title}?`
    );

    if (confirmation) {
      try {
        let { email } = participant;
        let { data: newSelectedProject } = await api.delete(
          `/project/${selectedProject._id}/${email}`
        );

        window.location.reload();
        setProjectPage();
        setSelectedProject(newSelectedProject);
      } catch (err) {
        handleErrorResponse(err);
      }
    }
  };

  const updateImage = async (form) => {
    try {
      let image;

      if (form.get("file").name) {
        if (selectedProject.image && selectedProject.image._id) {
          await api.delete(`image/${selectedProject.image._id}`);
        }

        image = (await api.post(`/image/project/${selectedProject._id}`, form))
          .data;
      } else if (form.get("alt")) {
        image = (
          await api.put(`/image/${selectedProject.image._id}`, {
            alt: form.get("alt"),
          })
        ).data;
      } else {
        return;
      }

      console.log(image._id);

      const updatedProject = await api.put(`/project/${selectedProject._id}`, {
        image: image._id,
      });

      let updatedSelectedProject = { ...selectedProject, image };
      setSelectedProject(updatedSelectedProject);
      alert("Arquivo enviado com sucesso!");
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const setProjectPage = async (page) => {
    if (!page) {
      page = projectsPagination.page;
    }

    let params = { page };

    if (search) {
      params.search = search;
    }

    try {
      let { docs: fetchedProjects, ...fetchedProjectsPagination } = (
        await api.get("/project", { params })
      ).data;

      console.log("setProjectPage", fetchedProjects);

      setProjects(fetchedProjects);
      setProjectsPagination(fetchedProjectsPagination);
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const searchProject = async (text) => {
    setSearch(text);
    setProjectPage();
  };

  const specialList = (participant) => {
    if (selectedProject) {
      if (selectedProject.coordinator === participant._id) {
        return "Coordenador";
      }

      if (selectedProject.secondCoordinator === participant._id) {
        return "Sub-Coordenador";
      }
    }

    return false;
  };

  const handleErrorResponse = (err) => {
    switch (err?.response?.status) {
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
    <React.Fragment>
      <Header admin={getAuthenticatedUserPermission()} projects />
      <main>
        <Container className="my-4">
          <h3 className="text-uppercase">Projetos</h3>
          <h4>Gerencie os projetos desenvolvidos pelo grupo.</h4>
          <p>
            Esta página foi elaborada para que você possa criar e editar
            projetos que podem ser visitados no site. Também é possível inserir
            e remover membros desses projetos desde que você tenha os
            privilégios necessários. É recomendável que você trabalhe apenas com
            uma postagem por vez, não alterne de item sem salvar as alterações
            realizadas, isso pode acarretar em perdas de dados.
          </p>
          <hr />
          <Row>
            <Col lg={4}>
              <ProjectsList
                list={projects}
                pagination={projectsPagination}
                onSetPage={setProjectPage}
                onSelectProject={selectProject}
                onAddProject={addProject}
                onRemoveProject={removeProject}
                onSearch={searchProject}
              />
            </Col>
            <Col lg={8}>
              <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
                <Tab eventKey="project" title="Projeto">
                  <ProjectsForms
                    key={selectedProject._id}
                    project={selectedProject}
                    mode={mode}
                    onSubmit={saveProject}
                  />
                </Tab>
                <Tab
                  eventKey="participants"
                  title="Participantes"
                  disabled={mode === "add"}
                >
                  <ParticipantsList
                    participants={selectedProject.members}
                    special={specialList}
                    onAddParticipant={addParticipant}
                    onRemoveParticipant={removeParticipant}
                    onSelectParticipant={addParticipant}
                  />
                  <Collapse in={addParticipantMode}>
                    <Form className="p-2 bg-light" onSubmit={saveParticipant}>
                      <Row>
                        <Col lg={6} className="my-2">
                          <Form.Control
                            name="email"
                            required
                            type="email"
                            placeholder="Email do participante"
                          />
                          <Form.Text className="text-muted">
                            O e-mail deve pertencer a um participante já
                            cadastrado no sistema.
                          </Form.Text>
                        </Col>
                        <Col lg={4} className="my-2">
                          <Form.Control as="select" required name="office">
                            <option value="member">Membro</option>
                            <option value="secondcoordinator">
                              Sub-Coordenador
                            </option>
                            <option value="coordinator">Coordenador</option>
                          </Form.Control>
                          <Form.Text className="text-muted">
                            Após ser definido o Coordenador e Sub-Coordenador,
                            somente esses poderão alterar o projeto.
                          </Form.Text>
                        </Col>
                        <Col lg={2} className="my-2">
                          <Button
                            type="submit"
                            variant="success"
                            className="w-100"
                          >
                            Salvar
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Collapse>
                </Tab>
                <Tab eventKey="image" title="Imagem" disabled={mode === "add"}>
                  <ImageForms
                    image={selectedProject.image}
                    onSubmit={updateImage}
                  />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default Projects;
