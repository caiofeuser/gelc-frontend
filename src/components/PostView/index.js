import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import defaultImg from "./img/default.svg";
import style from "./style.module.css";
import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";
import { marked } from "marked";
import { sanitize } from "dompurify";

function PostView({ post }) {
  if (!post || !post.accepted) {
    return null;
  }

  return (
    <>
      <Row className="mt-5 mb-2">
        <Col md={10} className="my-2">
          <Image src={post.image ? post.image.url : defaultImg} fluid />
        </Col>
        <Col md={2} className="mt-auto mb-0 my-2 h4">
          <div className="bg-success text-white px-3 py-4 mx-0 d-none d-md-block">
            {format(parseISO(post.createdAt), "dd/MM")}
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <hr />
          <small className="text-muted d-md-none">
            {format(parseISO(post.createdAt), "dd 'de' MMMM, yyyy", {
              locale: pt,
            })}
          </small>
          <h1 className={style.title}>{post.title}</h1>
          <p className="text-muted">{post.description}</p>
        </Col>
      </Row>
      <Row>
        <Col
          className={style.content}
          dangerouslySetInnerHTML={{ __html: sanitize(marked(post.content)) }}
        ></Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <hr />
          <div className="text-right">
            <em>
              {post.author.profile.name} {post.author.profile.lastname}
            </em>
            <br />
            <small>
              Última atualização:{" "}
              {format(parseISO(post.updatedAt), "dd 'de' MMMM, yyyy", {
                locale: pt,
              })}
            </small>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default PostView;
