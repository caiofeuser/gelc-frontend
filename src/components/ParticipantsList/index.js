import React from "react";
import {
  Button,
  ButtonToolbar,
  ListGroup,
  Alert,
  Pagination,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import SearchField from "../SearchField";

function ParticipantsList(props) {
  function handleAddParticipant(e) {
    e.preventDefault();
    props.onAddParticipant();
  }

  function handleSelectParticipant(e, participant) {
    e.preventDefault();
    props.onSelectParticipant(participant);
  }

  function handleRemoveParticipant(e, participant) {
    e.preventDefault();
    props.onRemoveParticipant(participant);
  }

  function handleSetPage(e, page) {
    e.preventDefault();
    props.onSetPage(page);
  }

  return (
    <section className="p-2">
      {props.onAddParticipant && (
        <ButtonToolbar className="my-2">
          <Button variant="success" onClick={handleAddParticipant}>
            <FontAwesomeIcon
              icon={faUserPlus}
              size="1x"
              color="#fff"
              className="mx-2"
            />
            Adicionar
          </Button>
        </ButtonToolbar>
      )}
      {props.onSearch && (
        <SearchField className="my-2" onSearch={props.onSearch} />
      )}
      <ListGroup>
        {props.participants?.length > 0 ? (
          props?.participants.map((participant, index) => (
            <ListGroup.Item
              key={index}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <a
                href=""
                onClick={(e) => handleSelectParticipant(e, participant)}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="1x"
                  color="#4eab4b"
                  className="mx-2"
                />
              </a>
              {(!props.special || !props.special(participant)) && (
                <a
                  href=""
                  onClick={(e) => handleRemoveParticipant(e, participant)}
                >
                  <FontAwesomeIcon
                    icon={faUserMinus}
                    size="1x"
                    color="#DC143C"
                    className="mx-2"
                  />
                </a>
              )}
              <span className="mx-2">
                {participant.profile
                  ? participant.profile.name +
                    " " +
                    participant.profile.lastname
                  : participant.email}
              </span>
              {props.special && (
                <Badge pill variant="success" className="p-1">
                  {props.special(participant)}
                </Badge>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <Alert variant="success">Não há participantes</Alert>
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

ParticipantsList.defaultProps = {
  list: [],
};

export default ParticipantsList;
