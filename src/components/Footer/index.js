import React from 'react';
import {Row,Col,Container,Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import gelcImg from './img/gelc.png';
import './style.css';

function Footer({github,email}) {
    return (
         <footer className="h-100 pt-5">
            <Container className="text-center text-md-left">
            <Row>
                <Col md={5} className="mt-md-0">
                    <h2 className="my-2 h3"><Image src={gelcImg} className="mr-2 mb-2"/><strong>GELC</strong></h2>
                    <p><strong>Grupo de Estudo em Linguística Computacional</strong></p>
                </Col>
                <Col md={4} className="mb-mb-0">
                    <h2 className="my-2 h3 text-uppercase">Contatos</h2>
                    <ul className="list-unstyled">
                        <li><FontAwesomeIcon icon={faGithub} size="lg" color="rgb(78,171,75)" className="mt-2 mr-2"/>{github||'github.com/GELC'}</li>
                        <li><FontAwesomeIcon icon={faEnvelope} size="lg" color="rgb(78,171,75)" className="mt-2 mr-2"/>{email||'gelcgrupodeestudo@gmail.com'}</li>
                    </ul>
                </Col>
                <Col md={3} className="mb-mb-0">
                    <h2 className="my-2 h3 text-uppercase">Localização</h2>
                    <ul className="list-unstyled">
                        <li>RN-233</li>
                        <li>Caraúbas - RN</li>
                        <li>CEP: 59780-000</li>
                    </ul>
                </Col>
            </Row>
            </Container>
            <div className="pt-4 pb-2 mt-4 copyright h-100">
                <p className="text-center"><strong>© {(new Date()).getFullYear()} - Todos os Direitos Reservados</strong></p>
            </div>
        </footer>
    );
}

export default Footer;