import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faFlask } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import defaultImg from './img/default.svg';

export default function PublicParticipantsList({participants=[]}) {

    return (
		<ul className="list-group list-group-horizontal-md list-unstyled justify-content-center my-4 mw-100">
		{ 
			participants.map(participant=> (
				<li className="mx-2" key={participant._id}>
                <Card key={participant._id} className="participant-card mx-auto my-2">
                    <Card.Img variant="top" src={participant.profile.image?participant.profile.image.url:defaultImg}/>
                    <Card.Body className="align-text-bottom text-center">
                        <Card.Title className="text-white text-truncate">{participant.profile.name + ' ' +participant.profile.lastname || defaultImg}</Card.Title>
                        <Card.Subtitle className="text-white mb-2 text-uppercase text-truncate">{participant.office || 'Membro do Grupo'}</Card.Subtitle>                	    
                    	<div className="mt-4 mb-2">
                    	<Card.Link className="mx-2" href={participant.profile.lattes||'http://lattes.cnpq.br/'}><FontAwesomeIcon icon={faFlask} size="lg" color="#fff" className="mr-2"/>Lattes</Card.Link>
                        <Card.Link className="mx-2" as={Link} to={"/participantes/"+participant._id || '/participantes'}><FontAwesomeIcon icon={faUser} size="lg" color="#fff" className="mr-2" />Perfil</Card.Link>
                    	</div>
                    </Card.Body>
                </Card>
                </li>
            ))
		 }
		</ul>
    );
}