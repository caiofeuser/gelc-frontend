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
  const [tools, setTools] = useState([]);
  const [toolsPagination, setToolsPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTools() {
      let params = { page, search };
      let { docs, ...toolsPagination } = (await api.get("/tool", { params }))
        .data;
      setToolsPagination(toolsPagination);
      setTools(docs);
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
                  return <ToolsCard key={index} tools={tool} />;
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
