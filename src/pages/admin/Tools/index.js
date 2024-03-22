import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Container, Col, Row } from "react-bootstrap";
import { ListGroup, Figure, Media } from "react-bootstrap";
import PrivateList from "../../../components/PrivateList";
import defaultImg from "../../../components/DownloadsList/img/default.svg";
import ImageForms from "../../../components/ImageForms";
import api from "../../../resources/api";
import { getAuthenticatedUserPermission } from "../../../resources/auth";
import { Form, Button } from "react-bootstrap";
import defaultImageTools from "./tool.png";

export default function PrivateTools() {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState({});
  const [toolsPagination, setToolsPagination] = useState({});
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("add");
  // forms states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const fetchData = async () => {
    try {
      const { docs: fetchedDownloads, ...fetchedDownloadsPagination } = (
        await api.get("/tool")
      ).data;
      if (fetchedDownloads.length > 0) {
        setSelectedTool(fetchedDownloads[0]);
        setMode("update");
      }
      setTools(fetchedDownloads);
      setToolsPagination(fetchedDownloadsPagination);
    } catch (err) {
      alert(
        "Não foi possível acessar o servidor! Por favor, tente novamente em alguns instantes."
      );
      throw new Error("unable to access server!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTool = () => {
    const newSelectedDownload = {
      _id: Math.random(),
      title: "",
      description: "",
      url: "",
    };
    setSelectedTool(newSelectedDownload);
    setMode("add");
    setTitle("");
    setDescription("");
    setUrl("");
  };

  const selectTool = (e, tool) => {
    e.preventDefault();
    setSelectedTool(tool);
    setMode("update");
  };

  const saveTool = async (form) => {
    try {
      if (!title || !description || !url) {
        alert("Há algum problema com os dados fornecidos.");
        return;
      }

      let selectedTool;
      if (mode === "add") {
        const { data: newTool } = await api.post("/tool/", {
          title,
          description,
          url,
        });
        selectedTool = newTool;
        setMode("update");
        alert("Download disponibilizado com sucesso!");
      } else if (mode === "update") {
        const updatedTool = { title, description, url };
        const { data: updatedSelectedTool } = await api.put(
          `/tool/${selectedTool._id}`,
          updatedTool
        );
        selectedTool = updatedSelectedTool;
        alert("Download alterado com sucesso!");
      }
      setTools((prevDownloads) => [
        selectedTool,
        ...prevDownloads.filter((item) => item._id !== selectedTool._id),
      ]);
      setSelectedTool(selectedTool);
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
            "Não foi possível acessar o servidor! Por favor, tente novamente em alguns instantes."
          );
          break;
      }
    }
  };

  const removeTool = async (e, tool) => {
    const confirmation = window.confirm(
      `Deseja realmente remover a ferramenta ${tool.title}?`
    );
    if (confirmation) {
      try {
        await api.delete(`/tool/${tool._id}`);
        // Remove a ferramenta da lista após a exclusão bem-sucedida
        setTools((prevTool) =>
          prevTool.filter((item) => item._id !== tool._id)
        );
        // Lógica para selecionar uma nova ferramenta se a ferramenta excluída estava selecionada
        if (tool === selectedTool) {
          if (tools.length > 0) {
            setSelectedTool(tools[0]);
          } else {
            addTool();
          }
        }
        // Atualiza a lista de ferramentas após a exclusão
        if (tool.image) {
          await api.delete(`/image/${tool.image._id}`);
        }
        const { docs: fetchedDownloads, ...fetchedDownloadsPagination } = (
          await api.get("/tool")
        ).data;
        setTools(fetchedDownloads);
        setToolsPagination(fetchedDownloadsPagination);
      } catch (err) {
        // Tratamento de erros
      }
    }
  };

  const updateImage = async (form) => {
    try {
      let image;
      if (form.get("file").name) {
        if (selectedTool.image && selectedTool.image._id) {
          await api.delete(`image/${selectedTool.image._id}`);
        }
        image = (await api.post(`/image/tool/${selectedTool._id}`, form)).data;
      } else if (form.get("alt")) {
        image = (
          await api.put(`/image/${selectedTool.image._id}`, {
            alt: form.get("alt"),
          })
        ).data;
      } else {
        return;
      }
      console.log(image);
      console.log(selectedTool._id);

      const updatedTool = await api.put(`/tool/${selectedTool._id}`, {
        image: image._id,
      });

      const updatedSelectedTool = { ...selectedTool, image };
      setSelectedTool(updatedSelectedTool);
      setTools((prevDownloads) => [
        updatedSelectedTool,
        ...prevDownloads.filter((item) => item._id !== updatedSelectedTool._id),
      ]);
      alert("Arquivo enviado com sucesso!");
    } catch (err) {
      switch (err.response.status) {
        case 500:
          alert(
            "Ocorreu algum erro no servidor! Verifique a validade dos dados enviados tente novamente em alguns instantes."
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

  const setToolPage = async (page) => {
    if (!page) {
      page = toolsPagination.page;
    }
    const params = { page };
    if (search) {
      params.search = search;
    }
    try {
      const { docs: fetchedTool, ...fetchedToolPagination } = (
        await api.get("/tool", { params })
      ).data;
      setTools(fetchedTool);
      setToolsPagination(fetchedToolPagination);
    } catch (err) {
      switch (err.response.status) {
        case 500:
          alert(
            "Ocorreu algum erro no servidor! Tente novamente em alguns instantes."
          );
          break;
        default:
          alert(
            "Não foi possível acessar o servidor! Por favor, tente novamente em alguns instantes."
          );
          break;
      }
    }
  };

  const searchTool = async (text) => {
    setSearch(text);
    setToolPage();
  };

  return (
    <React.Fragment>
      <Header admin={getAuthenticatedUserPermission()} tools />
      <main onClick={() => console.log(selectedTool._id)}>
        <Container className="my-4">
          <h3 className="text-uppercase">Ferramentas</h3>
          <h4>Adicione ou remova ferramentas disponíveis em seu site</h4>
          <p className="text-justify">
            Não é aconselhável enviar qualquer arquivo exceto imagens para o
            sistema, utilize aplicações como GoogleDrive ou Dropbox para
            armazenar os arquivos que deseja compartilhar no seu site. Não é
            recomendável utilizar <em>links</em> externos de outros sites, visto
            que isso pode comprometer a segurança do seu sistema.
          </p>
          <hr />
          <Row>
            <Col lg={6}>
              <PrivateList
                list={tools}
                pagination={toolsPagination}
                onAdd={addTool}
                onSearch={searchTool}
                onSetPage={setToolPage}
              >
                {(tool, index) => (
                  <ListGroup.Item
                    key={tool._id || index}
                    className="downloads-list-item"
                  >
                    <Media>
                      <Figure className="text-center my-auto mx-2 p-2">
                        <Figure.Image
                          width={80}
                          height={80}
                          src={tool.image ? tool.image.url : defaultImageTools}
                        />
                      </Figure>
                      <Media.Body className="my-auto">
                        <h5>
                          <a
                            href=""
                            className="text-success"
                            onClick={(e) => {
                              selectTool(e, tool);
                            }}
                          >
                            {tool.title}
                          </a>
                        </h5>
                        <p>{tool.description}</p>
                        <a
                          href=""
                          className="text-danger text-uppercase"
                          onClick={(e) => {
                            removeTool(e, tool);
                          }}
                        >
                          Remover download
                        </a>
                      </Media.Body>
                    </Media>
                  </ListGroup.Item>
                )}
              </PrivateList>
            </Col>
            <Col lg={6} onClick={() => console.log(selectedTool)}>
              {selectedTool._id && mode === "update" && (
                <ImageForms image={selectedTool.image} onSubmit={updateImage} />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <Form.Label>Título da ferramenta</Form.Label>
                  <Form.Text>O título deve ser único</Form.Text>
                  <Form.Control
                    type="text"
                    required
                    maxLength={60}
                    placeholder="título"
                    defaultValue={selectedTool.title || ""}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Form.Label>Descrição da ferramenta</Form.Label>
                  <Form.Control
                    as="textarea"
                    maxLength={300}
                    rows="4"
                    required
                    placeholder="descrição"
                    name="description"
                    defaultValue={selectedTool.description || ""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Form.Text>Uma breve descrição sobre a ferramenta</Form.Text>
                  <Form.Label>Endereço da ferramenta</Form.Label>
                  <Form.Control
                    type="url"
                    required
                    placeholder="endereço"
                    name="url"
                    defaultValue={selectedTool.url || ""}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                  />
                  <Form.Text>Link para a ferramenta</Form.Text>
                </div>
              </div>
              <Button
                className="my-2"
                onClick={() => {
                  saveTool();
                }}
                variant="success"
              >
                {mode === "add" ? "Adicionar" : "Salvar informações"}
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </React.Fragment>
  );
}
