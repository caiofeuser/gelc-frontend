import React from "react";
import {
  Button,
  ButtonToolbar,
  ListGroup,
  Media,
  Figure,
  Alert,
  Pagination,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import defaultImg from "./img/default.svg";
import SearchField from "../SearchField";
import "./style.css";

function ProjectsList(props) {
  function handleAddProject(e) {
    e.preventDefault();
    props.onAddProject();
  }

  function handleSelectProject(e, project) {
    e.preventDefault();
    props.onSelectProject(project);
  }

  function handleRemoveProject(e, project) {
    e.preventDefault();
    props.onRemoveProject(project);
  }

  function handleSetPage(e, page) {
    e.preventDefault();
    props.onSetPage(page);
  }

  let projects = props.list.map((project, index) => (
    <ListGroup.Item key={index}>
      <Media>
        <Figure className="text-center my-auto mx-2 p-2">
          <Figure.Image
            width={80}
            height={80}
            src={project.image ? project.image.url : defaultImg}
          />
        </Figure>
        <Media.Body
          className="my-auto"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <span>
            <a
              href=""
              className="my-2 text-uppercase text-success font-weight-bold"
              onClick={(e) => handleSelectProject(e, project)}
            >
              {project.title}
            </a>
          </span>
          <br />
          <span className="text-muted">
            {project.members.length}/10 Membros
          </span>
          <br />
          <a
            href=""
            className="text-danger text-uppercase"
            onClick={(e) => handleRemoveProject(e, project)}
          >
            Remover Projeto
          </a>
        </Media.Body>
      </Media>
    </ListGroup.Item>
  ));

  return (
    <section className="p-2">
      <ButtonToolbar className="my-2">
        <Button variant="success" onClick={handleAddProject}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="1x"
            color="#fff"
            className="mx-2"
          />
          Adicionar
        </Button>
      </ButtonToolbar>
      {props.onSearch && (
        <SearchField className="my-2" onSearch={props.onSearch} />
      )}
      <ListGroup>
        {projects.length > 0 ? (
          projects
        ) : (
          <Alert variant="success">Não há projetos cadastrados</Alert>
        )}
      </ListGroup>
      <Pagination className="my-2 mx-auto">
        <Pagination.First
          disabled={!props.pagination.hasPrevPage}
          onClick={(e) => handleSetPage(e, 1)}
        />
        <Pagination.Prev
          disabled={!props.pagination.hasPrevPage}
          onClick={(e) => handleSetPage(e, props.pagination.prevPage)}
        />
        {props.pagination.prevPage && (
          <Pagination.Item
            onClick={(e) => handleSetPage(e, props.pagination.prevPage)}
          >
            {props.pagination.prevPage}
          </Pagination.Item>
        )}
        <Pagination.Item>{props.pagination.page || 1}</Pagination.Item>
        {props.pagination.nextPage && (
          <Pagination.Item
            onClick={(e) => handleSetPage(e, props.pagination.nextPage)}
          >
            {props.pagination.nextPage}
          </Pagination.Item>
        )}
        <Pagination.Next
          disabled={!props.pagination.hasNextPage}
          onClick={(e) => handleSetPage(e, props.pagination.nextPage)}
        />
        <Pagination.Last
          disabled={!props.pagination.hasNextPage}
          onClick={(e) => handleSetPage(e, props.pagination.totalPages)}
        />
      </Pagination>
    </section>
  );
}

ProjectsList.defaultProps = {
  list: [],
};

export default ProjectsList;
