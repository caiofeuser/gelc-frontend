import React from 'react';
import {Navbar,Nav, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {logout} from '../../resources/auth';
import logo from './img/logo.png';
import './style.css';

function Header(props) {

    const publicLinks = (
                    <React.Fragment>
                        <Nav.Link as={Link} to="/" active={props.home}>Início</Nav.Link>
                        <Nav.Link as={Link} to="/projetos" active={props.projects}>Projetos</Nav.Link>
                        <Nav.Link as={Link} to="/postagens" active={props.posts}>Postagens</Nav.Link>
                        <Nav.Link as={Link} to="/participantes" active={props.participants}>Participantes</Nav.Link>
                        <Nav.Link as={Link} to="/downloads" active={props.downloads}>Downloads</Nav.Link>
                        <Nav.Link as={Link} to="/tools" active={props.tools}>Ferramnentas</Nav.Link>
                    </React.Fragment>
                    );

    const adminMaster = (
                        <React.Fragment>
                            <Nav.Link as={Link} to="/admin/informacoes" active={props.info}>Informações</Nav.Link>
                            <Nav.Link as={Link} to="/admin/projetos" active={props.projects}>Projetos</Nav.Link>
                            <Nav.Link as={Link} to="/admin/postagens" active={props.posts}>Postagens</Nav.Link>
                            <Nav.Link as={Link} to="/admin/downloads" active={props.downloads}>Downloads</Nav.Link>
                            <Nav.Link as={Link} to="/admin/participantes" active={props.participants}>Participantes</Nav.Link>
                            <Nav.Link as={Link} to="/admin/participante" active={props.participant}>Seu Perfil</Nav.Link>
                            <Nav.Link as={Link} to="/admin/tools" active={props.tools}>Ferramentas</Nav.Link>
                            <Nav.Link as={Link} to="/admin" onClick={logout}>Sair</Nav.Link>
                        </React.Fragment>
                        );
    
    const adminTeacher = (
                        <React.Fragment>
                            <Nav.Link as={Link} to="/admin/projetos" active={props.projects}>Projetos</Nav.Link>
                            <Nav.Link as={Link} to="/admin/postagens" active={props.posts}>Postagens</Nav.Link>
                            <Nav.Link as={Link} to="/admin/participantes" active={props.participants}>Participantes</Nav.Link>
                            <Nav.Link as={Link} to="/admin/participante" active={props.participant}>Seu Perfil</Nav.Link>
                            <Nav.Link as={Link} to="/admin" onClick={logout}>Sair</Nav.Link>
                        </React.Fragment>
                        );

    const adminStudent = (
                        <React.Fragment>
                            <Nav.Link as={Link} to="/admin/postagens" active={props.posts}>Postagens</Nav.Link>
                            <Nav.Link as={Link} to="/admin/participante" active={props.participant}>Seu Perfil</Nav.Link>
                            <Nav.Link as={Link} to="/admin" onClick={logout}>Sair</Nav.Link>
                        </React.Fragment>
                        );

    let navlinks = publicLinks;

    if(props.admin) {

        switch(props.admin) {
            
            case 'master':
                navlinks = adminMaster;
                break;
            case 'teacher':
                navlinks = adminTeacher;
                break;
            case 'student':
                navlinks = adminStudent;
                break;
            default:
                return null;
        
        }

    }

    return (
        <header>
        <Navbar className="bg-white shadow-sm" expand="md">
        <Navbar.Brand className="m-3"><Image src={logo} fluid/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {navlinks}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </header>
    );
}

export default Header;