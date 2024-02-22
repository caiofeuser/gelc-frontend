import React from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function CredentialForms(props) {

	return(
		<React.Fragment>
			<Form.Group controlId="email">
				<Form.Label>Endereço de e-mail:</Form.Label>
				<Form.Control type="email" maxLength={60} placeholder="e-mail" required defaultValue={props.email} name="email" disabled={props.disabled}/>
				{!props.disabled && <Form.Text className="text-muted">O e-mail deve ser válido e único, é com ele que o participante pode ter acesso à administração do sistema.</Form.Text>}
			</Form.Group>
			<Form.Group controlId="office">
				<Form.Label>Cargo ou função do membro dentro do grupo:</Form.Label>
				<Form.Control type="text" maxLength={60} placeholder="cargo/função" required defaultValue={props.office} name="office" disabled={props.disabled}/>
				{!props.disabled && <Form.Text className="text-muted">O que o participante faz dentro do grupo? é somente um membro? o presidente? informe nesse campo essa questão.</Form.Text>}
			</Form.Group>
		</React.Fragment>
	);

}


function AuthorizationDataForms(props) {

	return (
		<Form.Row>
			<Form.Group controlId="permission" as={Col}>
				<Form.Label>Permissões:</Form.Label>
				<Form.Control as="select" name="permission" disabled={props.disabled} required>
			      	<option value="student">Estudante</option>
			      	<option value="teacher">Professor</option>
			    </Form.Control>
				<Form.Text className="text-muted text-justify">Defina os privilégios do novo participante dentro do sistema. Um docente pode cadastrar projetos e novos participantes, um estudante apenas pode alterar seu perfil e sugerir publicações dentro do site.</Form.Text>
			</Form.Group>
			<Form.Group controlId="password" as={Col}>
				<Form.Label>Senha:</Form.Label>
				<Form.Control maxLength={60} type="password" placeholder="senha" required defaultValue={props.participant.password} name="password" disabled={props.disabled}/>
				<Form.Text className="text-muted text-justify">Defina a senha do novo participante, quando esse entrar no sistema será possível alterá-la.</Form.Text>
			</Form.Group>
		</Form.Row>

	);

}

function ProfileForms(props) {
	
	return (
		<React.Fragment>
			<Form.Row>
				<Form.Group controlId="name" as={Col}>
					<Form.Label>Nome do participante:</Form.Label>
					<Form.Control type="text" maxLength={30} placeholder="nome" required defaultValue={props.name} name="name" disabled={props.disabled}/>
					{!props.disabled && <Form.Text className="text-muted text-justify">Seu primeiro nome.</Form.Text>}
				</Form.Group>
				<Form.Group controlId="lastname" as={Col}>
					<Form.Label>Sobrenome do participante:</Form.Label>
					<Form.Control type="text" placeholder="sobrenome" maxLength={30} required defaultValue={props.lastname} name="lastname" disabled={props.disabled}/>
					{!props.disabled && <Form.Text className="text-muted text-justify">Seu sobrenome.</Form.Text>}
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="lattes">
				<Form.Label>Endereço do currículo na plataforma Lattes:</Form.Label>
				<Form.Control type="url" placeholder="lattes" required defaultValue={props.lattes} name="lattes" disabled={props.disabled}/>
				{!props.disabled && <Form.Text className="text-muted text-justify">Insira o endereço eletrônico para seu currículo na plataforma <em>Lattes</em>. Caso não tenha ainda um perfil nessa plataforma, por favor crie-o neste momento e então preencha este campo.</Form.Text>}
			</Form.Group>
			<Form.Group controlId="bio">
				<Form.Label>Descrição:</Form.Label>
			    <Form.Control as="textarea" rows="5" maxLength={850} required defaultValue={props.bio} name="bio" disabled={props.disabled}/>
				{!props.disabled && <Form.Text className="text-muted text-justify">Descreva um pouco sobre você, escreva o que faz, o que estuda ou o que gosta por exemplo.</Form.Text>}
			</Form.Group>
		</React.Fragment>
	);

}

class ParticipantsForms extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isBeingSent:false};
	}

	handleFormSubmit = async (e)=> {

		e.preventDefault();
		this.setState({isBeingSent:true});
		let form = new FormData(e.target);
		(await this.props.onSubmit(form));
		this.setState({isBeingSent:false});

	};

	render() {


		switch(this.props.mode) {

			case 'view':
				return(
					<section className="my-2">
					        <Form>
								<CredentialForms email={this.props.participant.email} office={this.props.participant.office} disabled/>
								{this.props.participant.profile && <ProfileForms {...this.props.participant.profile} disabled/>}
							</Form>
			        </section>
				);

			case 'update':
				return(
					<section className="my-2">
					        <Form onSubmit={this.handleFormSubmit}>
								<CredentialForms email={this.props.participant.email} office={this.props.participant.office}/>
								<ProfileForms {...this.props.participant.profile} disabled={false}/>
								<Button variant="success" type="submit" className="mr-2">{this.state.isBeingSent?'Enviando...':'Salvar Alterações'}</Button>
								<Link to="/admin/recuperarsenha" className="btn btn-danger">Alterar Senha</Link>
							</Form>
			        </section>
				);

			case 'add':
				return(
					<section className="my-2">
					        <Form onSubmit={this.handleFormSubmit}>
								<CredentialForms email={this.props.participant.email} office={this.props.participant.office}/>
								<AuthorizationDataForms participant={this.props.participant}/>
								<Button variant="success" type="submit">{this.state.isBeingSent?'Enviando...':'Adicionar Participante'}</Button>
							</Form>
			        </section>
				);

			default:
				return null;

		}
	}
}


ParticipantsForms.propTypes = {
	mode: PropTypes.string
};

export default ParticipantsForms;