import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Container, Col, Row } from "react-bootstrap";
import DownloadsList from "../../../components/DownloadsList";
import DownloadsForms from "../../../components/DownloadsForms/";
import ImageForms from "../../../components/ImageForms";
import api from "../../../resources/api";
import { getAuthenticatedUserPermission } from "../../../resources/auth";

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [selectedDownload, setSelectedDownload] = useState({});
  const [downloadsPagination, setDownloadsPagination] = useState({});
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("add");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { docs: fetchedDownloads, ...fetchedDownloadsPagination } = (
          await api.get("/download")
        ).data;
        if (fetchedDownloads.length > 0) {
          setSelectedDownload(fetchedDownloads[0]);
          setMode("update");
        }
        setDownloads(fetchedDownloads);
        setDownloadsPagination(fetchedDownloadsPagination);
      } catch (err) {
        alert(
          "Não foi possível acessar o servidor! Por favor, tente novamente em alguns instantes."
        );
        throw new Error("unable to access server!");
      }
    };
    fetchData();
  }, []);

  const addDownload = () => {
    const newSelectedDownload = {
      _id: Math.random(),
      title: "",
      description: "",
      url: "",
    };
    setSelectedDownload(newSelectedDownload);
    setMode("add");
  };

  const selectDownload = (download) => {
    setSelectedDownload(download);
    setMode("update");
  };

  const saveDownload = async (form) => {
    try {
      const title = form.get("title");
      const description = form.get("description");
      const url = form.get("url");

      if (!title || !description || !url) {
        alert("Há algum problema com os dados fornecidos.");
        return;
      }

      let selectedDownload;
      if (mode === "add") {
        const { data: newDownload } = await api.post("/download/", {
          title,
          description,
          url,
        });
        selectedDownload = newDownload;
        setMode("update");
        alert("Download disponibilizado com sucesso!");
      } else if (mode === "update") {
        const updatedDownload = { title, description, url };
        const { data: updatedSelectedDownload } = await api.put(
          `/download/${selectedDownload._id}`,
          updatedDownload
        );
        selectedDownload = updatedSelectedDownload;
        alert("Download alterado com sucesso!");
      }
      setDownloads((prevDownloads) => [
        selectedDownload,
        ...prevDownloads.filter((item) => item._id !== selectedDownload._id),
      ]);
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

  const removeDownload = async (download) => {
    const confirmation = window.confirm(
      `Deseja realmente remover o download ${download.title}?`
    );
    if (confirmation) {
      try {
        await api.delete(`/download/${download._id}`);
        if (download.image) {
          await api.delete(`/image/${download.image._id}`);
        }
        setDownloads((prevDownloads) =>
          prevDownloads.filter((item) => item._id !== download._id)
        );
        if (download === selectedDownload) {
          if (downloads.length > 0) {
            setSelectedDownload(downloads[0]);
          } else {
            addDownload();
          }
        }
      } catch (err) {
        switch (err.response.status) {
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
              "Não foi possível acessar o servidor! Por favor, tente novamente em alguns instantes."
            );
            break;
        }
      }
    }
  };

  const updateImage = async (form) => {
    try {
      let image;
      if (form.get("file").name) {
        if (selectedDownload.image && selectedDownload.image._id) {
          await api.delete(`image/${selectedDownload.image._id}`);
        }
        image = (
          await api.post(`/image/download/${selectedDownload._id}`, form)
        ).data;
      } else if (form.get("alt")) {
        image = (
          await api.put(`/image/${selectedDownload.image._id}`, {
            alt: form.get("alt"),
          })
        ).data;
      } else {
        return;
      }
      const updatedSelectedDownload = { ...selectedDownload, image };
      setSelectedDownload(updatedSelectedDownload);
      setDownloads((prevDownloads) => [
        updatedSelectedDownload,
        ...prevDownloads.filter(
          (item) => item._id !== updatedSelectedDownload._id
        ),
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

  const setDownloadPage = async (page) => {
    if (!page) {
      page = downloadsPagination.page;
    }
    const params = { page };
    if (search) {
      params.search = search;
    }
    try {
      const { docs: fetchedDownloads, ...fetchedDownloadsPagination } = (
        await api.get("/download", { params })
      ).data;
      setDownloads(fetchedDownloads);
      setDownloadsPagination(fetchedDownloadsPagination);
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

  const searchDownload = async (text) => {
    setSearch(text);
    setDownloadPage();
  };

  return (
    <React.Fragment>
      <Header admin={getAuthenticatedUserPermission()} downloads />
      <main>
        <Container className="my-4">
          <h3 className="text-uppercase">Downloads</h3>
          <h4>Adicione ou remova downloads disponíveis em seu site</h4>
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
              <DownloadsList
                list={downloads}
                pagination={downloadsPagination}
                onAddDownload={addDownload}
                onRemoveDownload={removeDownload}
                onSelectDownload={selectDownload}
                onSetPage={setDownloadPage}
                onSearch={searchDownload}
              />
            </Col>
            <Col lg={6} onClick={() => console.log(selectedDownload.image)}>
              {selectedDownload._id && mode === "update" && (
                <ImageForms
                  
                  image={selectedDownload.image}
                  onSubmit={updateImage}
                />
              )}
              <DownloadsForms
                key={selectedDownload._id}
                download={selectedDownload}
                onSubmit={saveDownload}
                mode={mode}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Downloads;
