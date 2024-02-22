import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PublicDownloadsList from "../../../components/PublicDownloadsList";
import PublicPagination from "../../../components/PublicPagination";
import PublicSearchField from "../../../components/PublicSearchField";
import { Container, Row, Col } from "react-bootstrap";
import api from "../../../resources/api";
import "./style.css";
import Preloader from "../../../components/Preloader";
import ToolsCard from "../../../components/ToolsCard";

export default function Tools() {
  // const [tools, setTools] = useState([]);
  const tools = [
    {
      title: "Ferramenta 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.google.com",
      image: "https://picsum.photos/200/300?random=2",
    },
    {
      title: "Ferramenta 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=3",
    },
    {
      title: "Ferramenta 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=4",
    },
    {
      title: "Ferramenta 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=5",
    },
    {
      title: "Ferramenta 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=6",
    },
    {
      title: "Ferramenta 7",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=7",
    },
    {
      title: "Ferramenta 8",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=8",
    },
    {
      title: "Ferramenta 9",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=9",
    },
    {
      title: "Ferramenta 10",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=10",
    },
    {
      title: "Ferramenta 11",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=11",
    },
    {
      title: "Ferramenta 12",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=12",
    },
    {
      title: "Ferramenta 13",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=13",
    },
    {
      title: "Ferramenta 14",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=14",
    },
    {
      title: "Ferramenta 15",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=15",
    },
    {
      title: "Ferramenta 16",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      link: "https://www.example.com",
      image: "https://picsum.photos/200/300?random=16",
    },
  ];
  const [toolsPagination, setToolsPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTools() {
      let params = { page, search };
      let { docs, ...toolsPagination } = (await api.get("/tools", { params }))
        .data;
      setToolsPagination(toolsPagination);
    }

    setLoading(true);
    loadTools();
    setLoading(false);
  }, [page, search]);

  function searchTools(text) {
    setSearch(text);
    setPage(1);
  }

  return (
    <React.Fragment>
      <Header tools />
      <main id="downloads-page-main">
        <Container>
          <h1 className="text-center my-5">ferramentas</h1>
          <p className="text-center text-muted mt-2 mb-5">
            Realize <em>Ferramentas</em> de arquivos compartilhados.
          </p>
          <Row className="my-2">
            <Col lg={9}></Col>
            <Col lg={3}>
              <PublicSearchField onSearch={searchTools} />
            </Col>
          </Row>
          <div id="tools-container">
            {loading ? (
              <Preloader />
            ) : (
              <>
                {tools.map((tool, index) => {
                  return <ToolsCard tools={tool} />;
                })}
              </>
            )}
          </div>
          <Row>
            <Col>
              <PublicPagination
                pagination={toolsPagination}
                onSetPage={setPage}
              />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
