import React from 'react';
import {Row, Col, Media} from 'react-bootstrap';
import './style.css';
import defaultImg from './img/default.svg';
import {parseISO, format} from 'date-fns';
import {pt} from 'date-fns/locale';
import {Link} from 'react-router-dom';

export default function PublicProjectsList({projects=[]}) {

	let projectsLeft = projects.slice(projects.length/2);
	let projectsRight = projects.slice(0,projects.length/2);

	function renderProjects(project) {

		let coordinator = 'Não especificado';

		project.members.forEach(member => {
			
			if(member._id===project.coordinator) {
				try {
					coordinator = `${member.profile.name} ${member.profile.lastname}`;
				} catch(err) {
					coordinator = member.email;
				}
			}

		});

		return (

			<Media className="border p-2 mb-4 project-item" key={project._id}>
			  <img className="mr-2 p-2" src={project.image?project.image.url:defaultImg} alt="Generic placeholder"/>
			  <Media.Body className="align-middle">
			    <h5 className="mt-4"><Link className="text-success text-uppercase" to={`/projetos/${project._id}`}>{project.title}</Link></h5>
			    <small className="text-muted">{format(parseISO(project.createdAt),"dd 'de' MMMM, yyyy",{locale:pt})}</small>
			    <p>({project.members.length}) {project.members.length>1?'Partipantes':'Participante'}<br/>Coordenador: {coordinator}</p>
			  </Media.Body>
			</Media>

		);

	}

    return (
		<Row id="public-projects-list">
			<Col lg={6}>
				{ projectsLeft.map(renderProjects) }
			</Col>
			<Col lg={6}>
				{ projectsRight.map(renderProjects) }
			</Col>
		</Row>
    );
}