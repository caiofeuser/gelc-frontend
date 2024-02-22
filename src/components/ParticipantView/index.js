import React from 'react';
import {Row,Col,Image,ListGroup,Badge} from 'react-bootstrap';
import defaultImg from './img/default.svg';
import style from './style.module.css';
import {parseISO, format} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faUsers, faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

function ParticipantView({participant}) {
    
    if(!participant.profile) {
        return null;
    }
    
    return (
        <>
            <Row className="px-md-5">
                <Col md={4} className="my-2">
                    <Row className="p-2">
                        <Image 
                            src={participant.profile.image?participant.profile.image.url:defaultImg}
                            alt={participant.profile.image?participant.profile.image.alt:'participante do grupo'}
                            fluid
                            className="mx-auto"
                        />
                    </Row>
                    <Row className="px-4 py-2">
                        <ListGroup className="mx-auto w-100">
                            <ListGroup.Item className="text-truncate" action href={`mailto:${participant.email}`}>
                                <FontAwesomeIcon icon={faEnvelope} size="lg" color="#28a745" className="mr-2 fa-fw"/>
                                  {participant.email}
                            </ListGroup.Item>
                            <ListGroup.Item className="text-truncate" action href={participant.profile.lattes}>
                                <FontAwesomeIcon icon={faFlask} size="lg" color="#28a745" className="mr-2 fa-fw"/>
                                  {participant.profile.lattes}
                            </ListGroup.Item>                            
                            <ListGroup.Item action as={Link} to="/projetos">
                                <FontAwesomeIcon icon={faUsers} size="lg" color="#28a745" className="mr-2 fa-fw"/>
                                 Projetos: 
                                <Badge variant="success" className="mx-1 p-2">{participant.projects.length}</Badge>
                            </ListGroup.Item>
                            <ListGroup.Item action as={Link} to="/postagens">
                                <FontAwesomeIcon icon={faEdit} size="lg" color="#28a745" className="mr-2 fa-fw"/>
                                Postagens:
                                <Badge variant="success" className="mx-1 p-2">{participant.posts.length}</Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Row>
                </Col>
                <Col md={8} className="text-center text-md-left my-2">
                    <h2 className="text-uppercase">{`${participant.profile.name} ${participant.profile.lastname}`}</h2>
                    <p className="text-muted text-uppercase">{participant.office}</p>
                    <hr/>
                    <p className={style.bio} className="py-4 text-justify">{participant.profile.bio}</p>
                    <hr/>
                    <small>{participant.email} - perfil atualizado em: {format(parseISO(participant.updatedAt),'dd/MM/yyyy')}</small>
                </Col>
            </Row>
        </>
    )
}

export default ParticipantView;
