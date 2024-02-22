import React from 'react';
import {Form, Button,Row, Col} from 'react-bootstrap';

class InformationsForms extends React.Component {

	constructor(props) {
		
		super(props);
		this.state = {isBeingSent:false};
	
	}

	handleFormSubmit = async (e) => {
		
		e.preventDefault();
		this.setState({isBeingSent:true});
		let form = new FormData(e.target);
		(await this.props.onSubmit(form));
		this.setState({isBeingSent:false});


	};

	render() {

		return (
	        <section className="my-2">
	        		<Form onSubmit={this.handleFormSubmit}>
						<Form.Group controlId="publicationsNumber" as={Row}>
							<Form.Label column sm={7}>Quantidade de artigos publicados:</Form.Label>
							<Col sm={5}>
								<Form.Control type="number" min="0" required placeholder="nº de publicações" name="publicationsNumber" defaultValue={this.props.informations.publicationsNumber}/>
							</Col>
						</Form.Group>
						<Form.Group controlId="projectsNumber" as={Row}>
							<Form.Label column sm={7}>Quantidade de projetos desenvolvidos:</Form.Label>
							<Col sm={5}>
								<Form.Control type="number" min="0" required placeholder="nº de projetos" name="projectsNumber" defaultValue={this.props.informations.projectsNumber}/>
							</Col>
						</Form.Group>
						<Form.Group controlId="awardsNumber" as={Row}>
							<Form.Label column sm={7}>Quantidade de premiações obtidas:</Form.Label>
							<Col sm={5}>
								<Form.Control type="number" min="0" required placeholder="nº de prêmios" name="awardsNumber" defaultValue={this.props.informations.awardsNumber}/>
							</Col>
						</Form.Group>
						<Form.Group controlId="email" as={Row}>
							<Form.Label column sm={7}>Endereço de e-mail:</Form.Label>
							<Col sm={5}>
								<Form.Control type="email" min="0" required placeholder="e-mail" name="email" defaultValue={this.props.informations.email}/>
							</Col>
						</Form.Group>
						<Form.Group controlId="phone" as={Row}>
							<Form.Label column sm={7}>Número de telefone:</Form.Label>
							<Col sm={5}>
								<Form.Control type="tel" min="0" required placeholder="telefone" name="phone" defaultValue={this.props.informations.phone}/>
							</Col>
						</Form.Group>
						<Button variant="success" type="submit">{this.state.isBeingSent?'Enviando...':'Salvar Alterações'}</Button>
					</Form>
	        </section>
		);

	}
	
}

export default InformationsForms;