import React from 'react';
import Header from '../../../components/Header';
import InformationsForms from '../../../components/InformationsForms';
import ImageForms from '../../../components/ImageForms';
import {Container,Col,Row} from 'react-bootstrap';
import api from '../../../resources/api';
import {getAuthenticatedUserPermission} from '../../../resources/auth';

class Informations extends React.Component {
    
    constructor(props) {

        super(props);
        this.state = {informations:{}};
    
    }

    async componentDidMount() {

        try {
            
            const informations = (await api.get('/info')).data;
            this.setState({informations});

        }catch(err) {

            alert('Não foi possível acessar o servidor! por favor tente novamente em alguns instantes.');

        }

    }

    updateInformations = async (form) => {

        try {
            
            let changedInformations = {};

            form.forEach((value,property) => {

                if(this.state.informations[property]!=value) {
                    changedInformations[property] = value;
                }

            });

            if(Object.entries(changedInformations).length === 0) {
                return;
            }

            let informations = (await api.put('/info',changedInformations)).data;
            this.setState({informations});
            alert('Informações salvas com sucesso!');


        } catch(err) {

            switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! Verifique a validade dos dados enviados e tente novamente.');
                    break;

                case 403:
                    alert('Você não tem permissão para realizar essa operação!');
                    break;

                case 401:
                    alert('É necessário se autenticar para realizar essa operação!');
                    break;

                case 400:
                    alert('Há algum problema com os dados fornecidos!');
                    break;

                default:
                    alert('Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes.');
                    break;
            }

        }

    };

    updateImage = async (form) => {

        try {
            
            let image;

            if(form.get('file').name) {

                if(this.state.informations.image && this.state.informations.image._id) {
            
                    await api.delete(`image/${this.state.informations.image._id}`);
            
                }
                
                image = (await api.post(`/image/info/${this.state.informations._id}`,form)).data;

            }else if(form.get('alt')) {

                image = (await api.put(`/image/${this.state.informations.image._id}`,{alt:form.get('alt')})).data;

            } else {

                return;
            
            }

            let informations = {...this.state.informations};
            informations.image = image;
            this.setState({informations});
            alert('Arquivo enviado com sucesso!');

        } catch(err) {

            switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! Verifique a validade dos dados enviados e tente novamente.');
                    break;

                case 403:
                    alert('Você não tem permissão para realizar essa operação!');
                    break;

                case 401:
                    alert('É necessário se autenticar para realizar essa operação!');
                    break;

                case 400:
                    alert('Há algum problema com os dados fornecidos!');
                    break;

                default:
                    alert('Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes.');
                    break;
            }

        }   

    };

    render() {
        
        return (
            <React.Fragment>
                <Header admin={getAuthenticatedUserPermission()} info/>
                <main>
                	<Container className="my-4">
                        <h3 className="text-uppercase">Informações</h3>
                        <h4>Gerencie as informações presentes no seu site.</h4>
                        <p>Nesta página você pode alterar algumas informações que são exibidas nas páginas do seu site. Além disso, você pode alterar informações de contato e a imagem presente na página principal.</p>
                        <hr/>
                        <Row>
                            <Col lg={7}>
                                <InformationsForms informations={this.state.informations} onSubmit={this.updateInformations}/>
                            </Col>
                            <Col lg={5}>
                                <ImageForms image={this.state.informations.image} onSubmit={this.updateImage}/>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </React.Fragment>
        );
    
    }
}

export default Informations;