import React from "react";
import Header from "../../../components/Header";
import { Container, Col, Row, Tabs, Tab } from "react-bootstrap";
import PostsList from "../../../components/PostsList";
import PostsForms from "../../../components/PostsForms";
import ImageForms from "../../../components/ImageForms";
import api from "../../../resources/api";
import {
  getAuthenticatedUserId,
  getAuthenticatedUserPermission,
} from "../../../resources/auth";

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: Math.random(),
      posts: [],
      selectedPost: {},
      postsPagination: {},
      search: "",
      mode: "add",
    };
  }

  async componentDidMount() {
    try {
      let { docs: posts, ...postsPagination } = (await api.get("/post")).data;

      if (posts.length > 0) {
        let selectedPost = posts[0];
        let mode = "update";
        this.setState({ posts, selectedPost, postsPagination, mode });
      }
    } catch (err) {
      alert(
        "Não foi possível acessar o servidor! por favor tente novamente em alguns instantes."
      );
      throw new Error("unable to access server!");
    }
  }

  addPost = () => {
    let selectedPost = {
      title: "",
      description: "",
      content: "",
    };

    let mode = "add";
    this.setState({ selectedPost, mode });
  };

  selectPost = (post) => {
    let mode = "update";
    this.setState({ selectedPost: post, mode });
  };

  savePost = async (form) => {
    try {
      let title = form.get("title");
      let description = form.get("description");
      let content = form.get("content");
      let image = form?.get("file");
      let author = getAuthenticatedUserId();

      if (this.state.mode === "add") {
        if (!title || !description || !content || !author) {
          return;
        }

        let { data: selectedPost } = await api.post("/post/", {
          title,
          description,
          content,
          author,
          image,
        });
        this.setState({ selectedPost, mode: "update" });
        this.setPostsPage();
        alert("Publicação realizada com sucesso!");
      } else if (this.state.mode === "update") {
        let post = { title, description, content, author };

        if (!title && !description && !content && !author) {
          return;
        }

        let { data: selectedPost } = await api.put(
          `/post/${this.state.selectedPost._id}`,
          post
        );
        this.setState({ selectedPost, mode: "update" });
        this.setPostsPage();
        alert("Postagem alterada com sucesso!");
      }
    } catch (err) {
      window.location.reload();
    }
  };

  removePost = async (post) => {
    const confirmation = window.confirm(
      `Deseja realmente remover a publicação ${post.title}?`
    );

    if (confirmation) {
      try {
        if (post.image) {
          await api.delete(`/image/${post.image._id}`);
        }

        await api.delete(`/post/${post._id}`);

        this.setPostsPage();

        if (post === this.state.selectedPost) {
          if (this.state.posts.length > 0) {
            let selectedPost = this.state.posts[0];
            this.setState({ selectedPost });
          } else {
            this.addPost();
          }
        }
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

          default:
            alert(
              "Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes."
            );
            break;
        }
      }
    }
  };

  acceptPost = async (post) => {
    try {
      let { data: selectedPost } = await api.put(`/post/${post._id}`, {
        accepted: true,
      });
      this.setState({ selectedPost, mode: "update" });
      this.setPostsPage();
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
        if (this.state.selectedPost.image && this.state.selectedPost.image._id) {
          await api.delete(`image/${this.state.selectedPost.image._id}`);
        }
  
        image = (await api.post(`/image/post/${this.state.selectedPost._id}`, form)).data;
      } else if (form.get("alt")) {
        image = (await api.put(`/image/${this.state.selectedPost.image._id}`, { alt: form.get("alt") })).data;
      } else {
        return;
      }
  
      
      // Send the image ObjectId without wrapping it in "ObjectId()"
      const updatedPost = await api.put(`/post/${this.state.selectedPost._id}`, {
        image: image._id
      });
  
      let selectedPost = { ...this.state.selectedPost };
      selectedPost.image = image;
      this.setPostsPage();
      this.setState({ selectedPost });
      alert("Arquivo enviado com sucesso!");
    } catch (err) {
      console.log(err);
      switch (err.response.status) {
        case 500:
          alert("Ocorreu algum erro no servidor! Verifique a validade dos dados enviados e tente novamente em alguns instantes.");
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
  

  setPostsPage = async (page) => {
    if (!page) {
      page = this.state.postsPagination.page;
    }

    let params = { page };

    if (this.state.search) {
      params.search = this.state.search;
    }

    try {
      let { docs: posts, ...postsPagination } = (
        await api.get("/post", { params })
      ).data;
      this.setState({ posts, postsPagination });
    } catch (err) {
      switch (err.response.status) {
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

  searchPosts = async (text) => {
    this.setState({ search: text });
    this.setPostsPage();
  };

  render() {
    return (
      <React.Fragment>
        <Header admin={getAuthenticatedUserPermission()} posts />
        <main>
          <Container className="my-4">
            <h3 className="text-uppercase">Postagens</h3>
            <h4>
              Crie e edite pequenas postagens que podem ser acessadas em seu
              sistema.
            </h4>
            <p>
              É recomendável que você trabalhe apenas com uma postagem por vez,
              não alterne de item sem salvar as alterações realizadas, isso pode
              acarretar em perdas de dados.
            </p>
            <hr />
            <Row>
              <Col lg={5}>
                <PostsList
                  list={this.state.posts}
                  pagination={this.state.postsPagination}
                  onAddPost={this.addPost}
                  onSelectPost={this.selectPost}
                  onRemovePost={this.removePost}
                  onSetPage={this.setPostsPage}
                  onSearch={this.searchPosts}
                  onAcceptPost={this.acceptPost}
                  options={getAuthenticatedUserPermission() === "master"}
                />
              </Col>
              <Col lg={7}>
                <Tabs defaultActiveKey="post" id="uncontrolled-tab">
                  <Tab eventKey="post" title="Postagem">
                    <PostsForms
                      key={this.state.selectedPost._id}
                      mode={this.state.mode}
                      post={this.state.selectedPost}
                      onSubmit={this.savePost}
                    />
                  </Tab>
                  <Tab
                    eventKey="image"
                    title="Imagem"
                    disabled={this.state.mode === "add"}
                  >
                    <ImageForms
                      image={this.state.selectedPost.image}
                      onSubmit={this.updateImage}
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
}

export default Posts;
