import React, {useState} from 'react';
import {Image, Form, Button} from 'react-bootstrap';
import logo from './img/logo.png';

export default function ForgotPanel(props) {
    
    const [email,setEmail] = useState('');
    const [token,setToken] = useState('');

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        let form = new FormData(e.target);

        if(email) {
            
            if(token) {

                try {

                    form.append('email',email);
                    form.append('token',token);
                    await props.onResetPassword(form);
                    alert('Senha alterada com sucesso!');
                    props.onRedirect();

                } catch (err) {

                    setToken('');

                    switch(err.response.status) {

                        case 400:
                            alert('O código de acesso é inválido ou está expirado, por favor, insira um novo código.');
                            break;
                        default:
                            alert('Não foi possível acessar o servidor, tente novamente em alguns instantes!');
                            break;

                    }

                } 

            }else {

                setToken(form.get('token'));
            
            }

        }else {
            
            try {

                await props.onSendEmail(form.get('email'));
                setEmail(form.get('email'));

            }catch(err) {

                switch(err.response.status) {
                    
                    case 400:
                        alert('O e-mail especificado não pertence a nenhum participante do grupo ou algum problema ocorreu quando a menssagem foi enviada.');
                        break;

                    default:
                        alert('Não foi possível acessar o servidor, tente novamente em alguns instantes!');
                        break;

                }

            }
        
        }

    }

    return (
        <div id="login-panel" className="p-5 bg-white shadow-sm">
        	<Form onSubmit={handleFormSubmit}>

        		<div className="text-center mt-2 mb-4 mw-100"><Image src={logo}/></div>

                { !email &&
			 	<Form.Group controlId="email">
			    	<Form.Label>Por favor, insira seu e-mail de acesso para alterar sua senha:</Form.Label>
			    	<Form.Control type="email" name="email" placeholder="E-mail" required/>
                    <Form.Text className="text-muted">Uma menssagem será enviada para seu endereço de e-mail contendo um código que pode ser utilizado para alterar sua senha de acesso.</Form.Text>
			  	</Form.Group>
                }

                { email && !token &&
                <Form.Group controlId="token">
                    <Form.Label>Um código de acesso foi enviado para seu endereço de e-mail, insira-o abaixo:</Form.Label>
                    <Form.Control type="text" autoComplete="off" name="token" placeholder="código de verificação" required/>
                    <Form.Text className="text-muted">Verifique inclusive a caixa de SPAN em seu e-mail pessoal.</Form.Text>
                </Form.Group>
                }

				{ email && token && 
                <Form.Group controlId="password">
					<Form.Label>Digite sua nova senha:</Form.Label>
					<Form.Control type="password" name="password" placeholder="Nova senha" required/>
                    <Form.Text className="text-muted">Insira a nova senha para ter acesso ao sistema.</Form.Text>
                </Form.Group>
                }

				<Button variant="success" type="submit" className="w-100">Enviar</Button>
			</Form>
        </div>
    );
}