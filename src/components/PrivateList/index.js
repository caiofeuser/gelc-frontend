import React from "react";
import {
  Button,
  ButtonToolbar,
  ListGroup,
  Alert,
  Pagination,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SearchField from "../../components/SearchField";

function PrivateList(props) {
  function handleAdd(e) {
    e.preventDefault();
    props.onAdd();
  }

  function handleSetPage(e, page) {
    e.preventDefault();
    props.onSetPage(page);
  }

  let list = props.list.map(props.children);

  return (
    <section className="p-2">
      <ButtonToolbar className="my-2">
        <Button variant="success" onClick={handleAdd}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="1x"
            color="#fff"
            className="mx-2"
          />
          Adicionar
        </Button>
      </ButtonToolbar>
      <SearchField className="my-2" onSearch={props.onSearch} />
      <ListGroup>
        {list.length > 0 ? (
          list
        ) : (
          <Alert variant="success">Não há registros</Alert>
        )}
      </ListGroup>
      {props.pagination && (
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
      )}
    </section>
  );
}

PrivateList.defaultProps = {
  list: [],
};

export default PrivateList;
