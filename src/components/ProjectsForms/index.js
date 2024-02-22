import React from 'react';
import {Form, Button} from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';

class ProjectsForms extends React.Component {

	constructor(props) {
		
		super(props);
		this.state = {isBeingSent:false,descriptionValue:''};
	
	}

	handleFormSubmit = async (e) => {
		
		e.preventDefault();
		this.setState({isBeingSent:true});
		let form = new FormData(e.target);
		(await this.props.onSubmit(form));
		this.setState({isBeingSent:false});


	};

	render() {

		let buttonText;

		switch(this.props.mode) {

			case 'add':
				buttonText = 'Adionar Projeto';
				break;
			case 'update':
				buttonText = 'Salvar Alterações';
				break;
			default:
				buttonText = 'Salvar Alterações';
				break;

		}

		return (
	        <section className="my-2">
	        		<Form onSubmit={this.handleFormSubmit}>
						<Form.Group controlId="title">
							<Form.Label>Título do projeto:</Form.Label>
							<Form.Control type="text" required placeholder="título" name="title" defaultValue={this.props.project.title}/>
							<Form.Text className="text-muted">O título do projeto deve ser único. Verifique essa condição antes de enviar os dados.</Form.Text>
						</Form.Group>
						<Form.Group controlId="description">
							<input type="hidden" name="description" value={this.state.descriptionValue}/>
							<TextEditor defaultValue={this.props.project.description} onChange={(text)=>this.setState({descriptionValue:text})}/>
							<Form.Text className="text-muted">Descreva com detalhes o projeto, o editor de texto contém vários recursos que podem ser utilizados para deixar sua descrição mais rica.</Form.Text>
						</Form.Group>
						<Button variant="success" type="submit">{this.state.isBeingSent?'Enviando...':buttonText}</Button>
					</Form>
	        </section>
		);

	}
	
}

export default ProjectsForms;