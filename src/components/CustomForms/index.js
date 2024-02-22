import React from 'react';
import {Form, Button} from 'react-bootstrap';

class CustomForms extends React.Component {

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
						{this.props.children}
						<Button variant="success" type="submit">{this.state.isBeingSent?'Enviando...':'Salvar Informações'}</Button>
					</Form>
	        </section>
		);

	}
	
}

export default CustomForms;