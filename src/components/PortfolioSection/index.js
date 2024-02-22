import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt,faFlagCheckered,faTrophy } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function PortfolioSection({articles,awards,projects}) {

    return (
        <section className="row mx-0 py-2" id="portfolio-section">
            <Container className="my-5 w-50">
                <Row className="my-2">
                    <Col className="text-center">
                        <FontAwesomeIcon icon={faFileAlt} size="2x" color="#fff" className="my-4"/>
                        <p><span className="counter">{articles}</span><br/> Artigos Publicados</p>
                    </Col>
                    <Col  className="text-center">
                        <FontAwesomeIcon icon={faFlagCheckered} size="2x" color="#fff" className="my-4"/>
                        <p><span className="counter">{projects}</span><br/>Projetos Desenvolvidos</p>
                    </Col>
                    <Col  className="text-center">
                        <FontAwesomeIcon icon={faTrophy} size="2x" color="#fff" className="my-4"/>
                        <p><span className="counter">{awards}</span><br/> Premiações Conquistadas</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );

}

PortfolioSection.defaultProps = { articles:1, awards:1, projects:1 };

export default PortfolioSection;