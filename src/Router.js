import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/main/Home";
import Projects from "./pages/main/Projects";
import Project from "./pages/main/Project";
import Participants from "./pages/main/Participants";
import Participant from "./pages/main/Participant";
import Downloads from "./pages/main/Downloads";
import Publications from "./pages/main/Publications";
import Publication from "./pages/main/Publication";
import Login from "./pages/admin/Login";
import Informations from "./pages/admin/Informations";
import PrivateParticipants from "./pages/admin/Participants";
import PrivateParticipant from "./pages/admin/Participant";
import PrivateProjects from "./pages/admin/Projects";
import Posts from "./pages/admin/Posts";
import PrivateDownloads from "./pages/admin/Downloads";
import ForgotPass from "./pages/admin/ForgotPass";
import Tools from "./pages/main/Tools";
import { isAuthenticated, isAuthorized } from "./resources/auth";

function PrivateRoute({ component: Component, permission, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthorized(permission) ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/admin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/projetos" exact={true} element={<Projects />} />
        <Route path="/projetos/:id" element={<Project />} />
        <Route path="/postagens" exact={true} element={<Publications />} />
        <Route path="/postagens/:id" element={<Publication />} />
        <Route path="/participantes" exact={true} element={<Participants />} />
        <Route path="/participantes/:id" element={<Participant />} />
        <Route path="/downloads" exact={true} element={<Downloads />} />
        <Route path="/tools" exact={true} element={<Tools />} />
        <Route path="/admin" exact={true} element={<Login />} />
        <Route
          path="/admin/recuperarsenha"
          exact={true}
          element={<ForgotPass />}
        />
        <Route
          element={
            <PrivateRoute
              permission="max"
              path="/admin/informacoes"
              exact={true}
              element={Informations}
            />
          }
        />
        <Route
          element={
            <PrivateRoute
              permission="mid"
              path="/admin/participantes"
              exact={true}
              component={PrivateParticipants}
            />
          }
        />
        <Route
          element={
            <PrivateRoute
              permission="min"
              path="/admin/participante"
              exact={true}
              component={PrivateParticipant}
            />
          }
        />
        <Route
          element={
            <PrivateRoute
              permission="mid"
              path="/admin/projetos"
              exact={true}
              component={PrivateProjects}
            />
          }
        />
        <Route
          element={
            <PrivateRoute
              permission="max"
              path="/admin/downloads"
              exact={true}
              component={PrivateDownloads}
            />
          }
        />
        <Route
          element={
            <PrivateRoute
              permission="min"
              path="/admin/postagens"
              exact={true}
              component={Posts}
            />
          }
        />

        <Route path="*" element={() => <h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

{
  /* <Route
element={
  <StandardPage
    children={<PrivateRoute element={Home} />}
  />
}
path="/dashboard"
/> */
}
