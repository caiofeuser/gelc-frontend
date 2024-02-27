import React, { useState, useCallback } from "react";
import { Form, Button } from "react-bootstrap";

const CustomForms = (props) => {
  const [isBeingSent, setIsBeingSent] = useState(false);

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsBeingSent(true);
      const form = new FormData(e.target);
      await props.onSubmit(form);
      setIsBeingSent(false);
    },
    [props]
  );

  return (
    <section className="my-2">
      <Form onSubmit={handleFormSubmit}>
        {props.children}
        <Button variant="success" type="submit">
          {isBeingSent ? "Enviando..." : "Salvar Informações"}
        </Button>
      </Form>
    </section>
  );
};

export default CustomForms;
