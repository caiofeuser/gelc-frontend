import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProjectView from "../../../components/ProjectView";
import { Container } from "react-bootstrap";
import style from "./style.module.css";
import api from "../../../resources/api";
import Preloader from "../../../components/Preloader";
import { useParams } from "react-router-dom";

function Project({ match }) {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function loadProject() {
      let { data: doc } = await api.get(`project/${id}`);
      setProject(doc);
    }

    setLoading(true);
    loadProject();
    setLoading(false);
    console.log(match);
  }, [id]);

  return (
    <>
      <Header projects />
      <main className={style.main}>
        <Container className={style.container}>
          {loading ? <Preloader /> : <ProjectView project={project} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Project;
