import React from 'react';
import {Container, Row,Col, Figure, Media} from 'react-bootstrap';
import './style.css';
import speakingImg from './img/speaking.svg';
import tagImg from './img/tag.svg';
import cutImg from './img/scissors.svg';
import brainImg from './img/brain.svg';

function WhatWeDoSection() {

    return (
        <section className="row mx-0" id="whatwedo-section">
            <Container className="my-5">
                <Row>
                    <Col className="text-center">
                        <h1>O QUE FAZEMOS</h1>
                        <p className="my-5">O uso da tecnologia da linguagem funciona muitas vezes “nos bastidores”, de forma invisível dentro de sistemas de software complexos, ajudando-nos em tarefas como na verificação ortografia e na correção gramatical como ocorre nos processadores de texto; na tradução automática de páginas da web ou de palavras e expressões. Pensando assim, apresentamos algumas pesquisas que fazemos e que pretendemos desenvolver.</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Media className="my-2">
                            <Media.Body>
                                <h2 className="text-right">CONVERSOR GRÁFICO FÔNICO</h2>
                                <p className="text-justify">Os conversores gráfico fônico são sistemas que fazem a transcrição das formas ortográficas para a forma fonética ou fonológica de uma língua.</p>
                            </Media.Body>
                            <Figure className="ml-3"><Figure.Image src={speakingImg} fluid/></Figure>
                        </Media>
                    </Col>
                    <Col lg={6}>
                        <Media className="my-2">
                            <Figure className="mr-3"><Figure.Image src={tagImg} fluid/></Figure>
                            <Media.Body>
                                <h2 className="text-left">ETIQUETADORES MORFOSSINTÁTICOS</h2>
                                <p className="text-justify">Os analisadores morfológicos decompõem a sentença de um texto em itens lexicais e verificam a estrutura associada a um determinado item, atribuindo-lhes uma etiqueta.</p>
                            </Media.Body>
                        </Media>
                    </Col>
                    <Col lg={6}>
                        <Media className="my-2">
                            <Media.Body>
                                <h2 className="text-right">SEPARADOR SILÁBICO</h2>
                                <p className="text-justify">Os separadores silábicos são sistemas que fazem a separação das palavras em sílabas da língua.</p>
                            </Media.Body>
                            <Figure className="ml-3"><Figure.Image src={cutImg} fluid/></Figure>
                        </Media>
                    </Col>
                    <Col lg={6}>
                        <Media className="my-2">
                            <Figure className="mr-3"><Figure.Image src={brainImg} fluid/></Figure>
                            <Media.Body>
                                <h2 className="text-left">MODELOS DE APRENDIZAGEM DE MÁQUINA</h2>
                                <p className="text-justify">O aprendizado de máquina é uma área da inteligência artificial que procura desenvolver algoritmos e técnicas que permitam ao computador aprender, isto é, que permitam ao computador aperfeiçoar seu desempenho em tarefa de conversão automática, etiquetagem, extração de informação, etc.</p>
                            </Media.Body>
                        </Media>
                    </Col>
                </Row>
            </Container>
        </section>
    );

}

export default WhatWeDoSection;