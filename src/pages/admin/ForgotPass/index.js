import React from 'react';
import ForgotPanel from '../../../components/ForgotPanel';
import api from '../../../resources/api';

export default function Login(props) {
    
	async function sendEmail(email) {

		await api.post('/auth/forgotpassword',{email});

	}

	async function resetPassword(form) {

		let email = form.get('email');
		let token = form.get('token');
		let password = form.get('password');

		await api.post('/auth/resetpassword',{email,token,password});

	}

	function redirect() {
		props.history.push('/admin');
	}

	return (
        <main className="bg-light py-5" style={{height:"100vh"}}>
        	<ForgotPanel onSendEmail={sendEmail} onResetPassword={resetPassword} onRedirect={redirect}/>
        </main>
    );

}