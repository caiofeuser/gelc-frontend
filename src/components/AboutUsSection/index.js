import React from 'react';
import {Container, Row, Col, Figure} from 'react-bootstrap';
import defaultImg from './img/default.svg';
import './style.css';

function AboutUsSection(props) {

    return (
        <section className="row mx-0" id="aboutus-section">
            <Container className="my-5">
                <Row>
                    <Col lg={7}>
                        <h2 className="mb-5 mt-2 text-center">QUEM SOMOS</h2>
                        <p className="text-justify"> O estudo sobre as tecnologia da linguagem é uma área altamente interdisciplinar que envolve a combinação das competências de informáticos, linguistas, matemáticos, filósofos e psicolinguistas, entre outros. No Brasil, essa área ainda é conhecida em várias universidades tanto no plano da investigação quanto na aplicação nos espaços educativos. Por isso, temos o propósito de demonstrar alguns dos resultados da nossa atividade de investigação em ciência cognitiva e processamento de linguagem natural. Pesquisas sobre modelização computacional da linguagem humana e tratamento automático das línguas naturais. Desenvolvimento e aperfeiçoamento de modelos teóricos, algoritmos e sistemas de análise automática em todos os níveis da investigação linguística. Estes serviços são oferecidas gratuitamente online, dentro dos limites da capacidade disponível, para apoiar o ensino, a investigação e o desenvolvimento no domínio da ciência e tecnologia da linguagem natural.</p>
                    </Col>
                    <Col lg={5}>
                        <Figure className="mt-4">
                            <Figure.Image src={props.img || defaultImg} alt={props.caption}/>
                            <Figure.Caption>{props.caption || 'Grupo de Estudo em Linguística Computacional'}</Figure.Caption>
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </section>
    );

}

export default AboutUsSection;