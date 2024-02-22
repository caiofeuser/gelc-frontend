import React from 'react';
import {Row, Col, Image, ListGroup} from 'react-bootstrap';
import {parseISO, format} from 'date-fns';
import {pt} from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import defaultImg from './img/default.svg';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function PublicDownloadsList({downloads=[]}) {

    return (
        
        <ListGroup variant="flush" id="public-downloads-list" className="px-md-5">
		{ 
			downloads.map(download=> (
				
            <ListGroup.Item key={download._id} className="downloads">
                <Row>
                    <Col md={2} className="text-center">
                        <Image fluid className="p-2" src={download.image?download.image.url:defaultImg} alt="Generic placeholder"/>
                    </Col>
                    <Col md={10} className="text-center text-md-left">
                        <Row>
                            <Col lg={9}>
                                <h5 className="mt-4 text-uppercase text-truncate">{download.title}</h5>
                            </Col>
                            <Col lg={3} className="text-center text-md-right px-0">
                                <a href={download.url} className="btn btn-success text-white">
                                    <FontAwesomeIcon icon={faDownload} size="lg" color="#fff" className="mr-2"/>
                                    Download
                                </a>
                            </Col>
                        </Row>
                        <small className="text-muted">{format(parseISO(download.createdAt),"dd 'de' MMMM, yyyy",{locale:pt})}</small>
                        <p>{download.description}</p>
                    </Col>
                </Row>
            </ListGroup.Item>
            
            ))
		 }
        </ListGroup>

    );
}