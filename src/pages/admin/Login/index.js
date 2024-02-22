import React from "react";
import LoginPanel from "../../../components/LoginPanel";
import api from "../../../resources/api";
import { login } from "../../../resources/auth";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  login = async (form) => {
    let email = form.get("email");
    let password = form.get("password");

    if (!email || !password) {
      return alert("Credenciais inválidas!");
    }

    try {
      login((await api.post("/auth", { email, password })).data);
      this.props.history.push("/admin/participante");
    } catch (err) {
      return alert("Credenciais inválidas!");
    }
  };

  render() {
    return (
      <main className="bg-light py-5" style={{ height: "100vh" }}>
        <LoginPanel onSubmit={this.login} />
      </main>
    );
  }
}

export default Login;
