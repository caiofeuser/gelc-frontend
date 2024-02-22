import React from 'react';
import {Row,Col, Image} from 'react-bootstrap';
import defaultImg from './img/default.svg';
import {parseISO,format} from 'date-fns';
import {pt} from 'date-fns/locale';
import style from './style.module.css';
import {sanitize} from 'dompurify';
import {marked} from 'marked';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import ParticipantsList from '../../components/ParticipantsList';

function ProjectView({project}) {

    if(!project || !project.title || !project.description) {
        return null;
    }

    let coordinator = 'Não especificado';
    let secondCoordinator = 'Não especificado';

    if(project.coordinator) {
        
        coordinator = project.coordinator.email;
        
        if(project.coordinator.profile) {
            coordinator = `${project.coordinator.profile.name} ${project.coordinator.profile.lastname}`;;
        }

    }

    if(project.secondCoordinator) {
        secondCoordinator = project.secondCoordinator.email;
        if(project.secondCoordinator.profile) {
            secondCoordinator = `${project.secondCoordinator.profile.name} ${project.secondCoordinator.profile.lastname}`;;
        }
    }

    function membersTags(member) {

        if(project.coordinator) {
            
            if(member._id === project.coordinator._id) {
                return 'Coordenador';
            }

        }

        if(project.secondCoordinator) {
            
            if(member._id === project.secondCoordinator._id) {
                return 'Vice-Coordenador';
            }

        }
        
        return 'Membro';

    }

    return (
        <>
            <Row>
                <Col md={4} className="text-center">
                    <Image src={project.image?project.image.url:defaultImg} className={style.img}/>
                </Col>
                <Col md={8}>
                    <h2 className="mt-md-5 text-success text-uppercase text-center text-md-left">{project.title}</h2>
                    <small className="text-muted">{format(parseISO(project.createdAt),"dd 'de' MMMM, yyyy",{locale:pt})}</small>
                    <p>
                        <FontAwesomeIcon icon={faUser} size="1x" color="#28a745" className="mr-2"/>
                        Coordenador: {coordinator}
                        <br/>
                        <FontAwesomeIcon icon={faUser} size="1x" color="#28a745" className="mr-2"/>
                        Vice-Coordenador: {secondCoordinator}
                    </p>
                    
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col className={style.description} dangerouslySetInnerHTML={{__html:marked(project.description)}}></Col>
            </Row>
            <Row className="mb-5">
                <Col>
                <h4 className="text-success text-uppercase text-center text-md-left">Membros do Projeto</h4>
                <hr/>
                <ParticipantsList list={project.members} special={membersTags}/>
                </Col>
            </Row>
        </>
    );

}

export default ProjectView;
