import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";
import defaultImageTools from "../../pages/admin/Tools/tool.png";
export default function ToolsCard(props) {
  return (
    <div id="tool-card" onClick={() => console.log(props.tools.image)}>
      <img id="tool-img" src={props.tools.image?.url || defaultImageTools} />
      <div id="title-container">
        <h3 id="tool-title">{props?.tools?.title}</h3>
        <p id="text-desc">{props.tools?.description}</p>
      </div>
      <div>
        <Button
          id="button"
          variant="success"
          onClick={() => window.open(props.tools.url)}
        >
          Acessar
        </Button>
      </div>
    </div>
  );
}
