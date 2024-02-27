// import React from "react";
// import LoginPanel from "../../../components/LoginPanel";
// import api from "../../../resources/api";
// import { login } from "../../../resources/auth";
// import { withRouter } from "react-router-dom";

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   login = async (form) => {
//     let email = form.get("email");
//     let password = form.get("password");

//     if (!email || !password) {
//       return alert("Credenciais inválidas!");
//     }

//     // try {
//       login(
//         (
//           await api
//             .post("/auth", {email, password })
//             // .then((r) => console.log(r))
//         )?.data
//       );
//       this.props?.history.push("/admin/participante");
//     // } catch (err) {
//     //   console.log(err);
//     //   return alert("Credenciais inválidas!");
//     // }
//   };

//   render() {
//     return (
//       <main className="bg-light py-5" style={{ height: "100vh" }}>
//         <LoginPanel onSubmit={this.login} />
//       </main>
//     );
//   }
// }

// export default Login;

import React from "react";
import LoginPanel from "../../../components/LoginPanel";
import api from "../../../resources/api";
import { login } from "../../../resources/auth";
import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (form) => {
    let email = form.get("email");
    let password = form.get("password");

    if (!email || !password) {
      return alert("Credenciais inválidas!");
    }

    // try {
    login(
      // .then((r) => console.log(r))
      (await api.post("/auth", { email, password }))?.data
    );
    navigate("/admin/participante");
    // } catch (err) {
    //   console.log(err);
    //   return alert("Credenciais inválidas!");
    // }
  };

  return (
    <main className="bg-light py-5" style={{ height: "100vh" }}>
      <LoginPanel onSubmit={handleLogin} />
    </main>
  );
}
