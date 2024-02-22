import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCheck,faDesktop,faUsers } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function GroupActionsSection() {

    return (
        <section className="row mx-0 bg-light" id="groupactions-section">
            <Container className="my-5">
                <Row>
                    <Col lg={3} sm={6} className="text-center">
                        <FontAwesomeIcon icon={faSearch} size="3x" color="#4eab4b" className="mt-1"/>
                        <h2>LINHAS DE PESQUISA</h2>
                        <ul className="text-justify list-unstyled">
                            <li>Tecnologia da Linguagem natural.</li>
                            <li>Desenvolvimento de software.</li>
                            <li>Aprendizado de máquina.</li>
                            <li>Anotação de corpora.</li>
                        </ul>
                    </Col>
                    <Col lg={3} sm={6}  className="text-center">
                        <FontAwesomeIcon icon={faCheck} size="3x" color="#4eab4b" className="mt-1"/>
                        <h2>OBJETIVOS</h2>
                        <ul className="text-justify list-unstyled">
                            <li>Desenvolver e oferecer sistemas computacionais gratuitos que auxiliam os pesquisadores em tecnologia da linguagem natural, tanto na teoria quanto na descrição e análise linguística.</li>
                            <li>Implementar e criar ferramentas com interfaces simples para o ensino da língua portuguesa nas escolas ou a distancia.</li>
                            <li>Modelar sistemas estatísticos para as línguas naturais por meio algoritmo de aprendizagem de máquina.</li>
                            <li>Construir corpora de referência para a língua portuguesa que sirvam para análise linguística e desenvolvimento de sistemas linguísticos.</li>
                        </ul>
                    </Col>
                    <Col lg={3} sm={6}  className="text-center">
                        <FontAwesomeIcon icon={faDesktop} size="3x" color="#4eab4b" className="mt-1"/>
                        <h2>ABORDAGENS COMPUTACIONAIS</h2>
                        <p className="text-justify">Para o desenvolvimento de seus sistemas o GELC utiliza dois tipos principais de abordagens computacionais. As abordagens estatísticas que permitem obter conhecimentos linguísticos a partir de vastas coleções de exemplos concretos em textos orais e escritos. A outra abordagem baseada em regras linguísticas que consiste na construção de regras feitas por peritos nas áreas da Linguística e Linguística Computacional e são codificadas para a análise gramatical - regras gramaticais - e compiladas as listas de vocabulário - léxicos. </p>
                    </Col>
                    <Col lg={3} sm={6}  className="text-center">
                        <FontAwesomeIcon icon={faUsers} size="3x" color="#4eab4b" className="mt-1"/>
                        <h2>CONTRIBUIÇÕES</h2>
                        <ul className="text-justify list-unstyled">
                            <li>O GELC contribui para o desenvolvimento das pesquisas em teoria e funcionamento das línguas naturais, disponibilizando sistemas computacionais paras a investigação e descrição dos fenômenos linguísticos</li>
                            <li>Subsidia os professores de ensino fundamental e médio através de suas ferramentas que podem ser utilizadas na prática escolar; Ampara e corrobora no estudo interdisciplinar da Linguística com outras áreas do conhecimento como a informática, a matemática, e outras</li>
                            <li>Construção de corpora orais e escritos de referência a língua portuguesa</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    );

}

export default GroupActionsSection;