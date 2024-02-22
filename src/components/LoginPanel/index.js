import React from 'react';
import {Image, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './style.css';
import logo from './img/logo.png';

function LoginPanel(props) {
    
    const handleFormSubmit = async (e) => {

    	e.preventDefault();
    	let form = new FormData(e.target);
    	await props.onSubmit(form);

    }

    return (
        <div id="login-panel" className="p-5 bg-white shadow-sm">
        	<Form onSubmit={handleFormSubmit}>

        		<div className="text-center mt-2 mb-4 mw-100"><Image src={logo}/></div>

			 	<Form.Group controlId="email">
			    	<Form.Label>E-mail:</Form.Label>
			    	<Form.Control type="email" name="email" placeholder="Entre com seu e-mail" required/>
			  	</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Senha:</Form.Label>
					<Form.Control type="password" name="password" placeholder="Digite sua senha" required/>
				</Form.Group>

				<Button variant="success" type="submit" className="w-100">Entrar</Button>
			</Form>
            <hr/>
            <Link to='/admin/recuperarsenha'>Esqueci minha senha</Link>
        </div>
    );
}

export default LoginPanel;