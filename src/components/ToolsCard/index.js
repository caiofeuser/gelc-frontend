import React from "react";
import { ListGroup, Figure, Media } from "react-bootstrap";
import PrivateList from "../PrivateList";
import defaultImg from "./default.svg";
import "./style.css";

export default function ToolsCard(props) {
  return (
    <div id="tool-card">
      <img id="tool-img" src={props.tools.image || defaultImg}></img>
      <div id="title-container">
        <h3 id="tool-title">{props?.tools?.title}</h3>
        <p id="text-desc">{props.tools?.description}</p>
      </div>
    </div>
  );
}
