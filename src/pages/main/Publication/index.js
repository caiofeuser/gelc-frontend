import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import api from "../../../resources/api";
import style from "./style.module.css";
import { Container } from "react-bootstrap";
import PostView from "../../../components/PostView";
import Preloader from "../../../components/Preloader";
import { useParams } from "react-router-dom";

function Publication({ match }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function loadPost() {
      let { data: doc } = await api.get(`post/${id}`);
      setPost(doc);
    }

    setLoading(true);
    loadPost();
    setLoading(false);
  }, [id]);

  return (
    <>
      <Header posts />
      <main className={style.main}>
        <Container className={style.container}>
          {loading ? <Preloader /> : <PostView post={post} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Publication;
