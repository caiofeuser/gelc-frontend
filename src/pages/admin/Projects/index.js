import React from 'react';
import Header from '../../../components/Header';
import ProjectsList from '../../../components/ProjectsList';
import ParticipantsList from '../../../components/ParticipantsList';
import ProjectsForms from '../../../components/ProjectsForms';
import ImageForms from '../../../components/ImageForms';
import {Container,Row,Col,Tabs,Tab, Form, Button, Collapse} from 'react-bootstrap';
import api from '../../../resources/api';
import {getAuthenticatedUserPermission} from '../../../resources/auth';
import './style.css';

class Projects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {

            projects:[],
            projectsPagination: {},
            selectedProject: {},
            search: '',
            mode: 'add',
            addParticipantMode: false

        };
    }

    async componentDidMount() {

        try {

            let {docs:projects,...projectsPagination} = (await api.get('/project')).data;
            
            if(projects.length>0) {
                let selectedProject = projects[0];
                this.setState({projects,projectsPagination,selectedProject,mode:'update'});   
            }

        } catch(err) {

            alert('Não foi possível acessar o servidor! por favor tente novamente em alguns instantes.');
            throw new Error("unable to access server!");

        }

    }

    addProject = () => {

        let selectedProject = {
            
            _id: Math.random(),
            title: '',
            description: ''

        };

        let mode = 'add';
        this.setState({selectedProject,mode});

    };

    addParticipant = () => {

        let addParticipantMode = !this.state.addParticipantMode;
        this.setState({addParticipantMode});

    };

    saveProject = async (form) => {

        try {

            let title = form.get('title');
            let description = form.get('description');


            if(this.state.mode==='add') {


                if(!title || !description) {
                    return;
                }

                let {data:selectedProject} = await api.post('/project/',{title,description});
                this.setState({selectedProject,mode:'update'});
                this.setProjectPage();
                alert('Projeto cadastrado com sucesso!');
            
            } else if(this.state.mode==='update') {

                let project = {title,description};

                if(!title && !description) {
                    return;
                }

                if(!description) {
                    delete project.description;
                }

                let {data:selectedProject} = await api.put(`/project/${this.state.selectedProject._id}`,project);
                this.setState({selectedProject});
                this.setProjectPage();
                alert('Projeto alterado com sucesso!');   

            }

        } catch(err) {

            switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! Verifique a validade dos dados enviados tente novamente em alguns instantes.');
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

    saveParticipant = async (e) => {

        e.preventDefault();

        let form = new FormData(e.target);
        let email = form.get('email');
        let office = form.get('office');

        try {

            let {data:selectedProject} = await api.post(`/project/${this.state.selectedProject._id}/${office}/${email}`);
            this.setState({selectedProject});
            this.setProjectPage();
            alert('Novo membro cadastrado no projeto');

        } catch(err) {

            switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! tente novamente em alguns instantes.');
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

    selectProject = (project) => {

        let mode = 'update';
        this.setState({selectedProject:project,mode});

    };

    removeProject = async (project) => {
        
        const confirmation = window.confirm(`Deseja realmente remover o projeto ${project.title}?`);
        
        if(confirmation) {
            
            try {

                if(project.image) {
                    
                    (await api.delete(`/image/${project.image._id}`));
                
                }

                (await api.delete(`/project/${project._id}`));

                this.setProjectPage();

                if(project===this.state.selectedProject) {
                    
                    if(this.state.projects.length>0) {
                        
                        let selectedProject = this.state.projects[0];
                        this.setState({selectedProject});                   

                    }else {
                    
                        this.addProject();
                    
                    }

                }


            } catch(err) {
                
                switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! tente novamente em alguns instantes.');
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

        }

    };

    removeParticipant = async (participant) => {
        
        const confirmation = window.confirm(`Deseja realmente remover o participante ${participant.email} do projeto ${this.state.selectedProject.title}?`);

        if(confirmation) {

            try {
        
                let {email} = participant;
                let {data:selectedProject} = await api.delete(`/project/${this.state.selectedProject._id}/${email}`);
                this.setProjectPage();
                this.setState({selectedProject});

            } catch(err) {

                switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! tente novamente em alguns instantes.');
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

        }

        

    };

    updateImage = async (form) => {

        try {
            
            let image;

            if(form.get('file').name) {

                if(this.state.selectedProject.image && this.state.selectedProject.image._id) {
            
                    await api.delete(`image/${this.state.selectedProject.image._id}`);
            
                }
                
                image = (await api.post(`/image/project/${this.state.selectedProject._id}`,form)).data;

            }else if(form.get('alt')) {

                image = (await api.put(`/image/${this.state.selectedProject.image._id}`,{alt:form.get('alt')})).data;

            } else {

                return;
            
            }

            let selectedProject = {...this.state.selectedProject};
            selectedProject.image = image;
            this.setProjectPage();
            this.setState({selectedProject});
            alert('Arquivo enviado com sucesso!');

        } catch(err) {

            switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! tente novamente em alguns instantes.');
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

    setProjectPage = async (page) => {

        if(!page) {

            page = this.state.projectsPagination.page;

        }

        let params = {page};

        if(this.state.search) {

            params.search = this.state.search;
        
        }

        try {

            let {docs:projects,...projectsPagination} = (await api.get('/project',{params})).data;
            this.setState({projects,projectsPagination});

        } catch(err) {

            switch(err.response.status) {

                case 500:
                    alert('Ocorreu algum erro no servidor! Tente novamente em alguns instantes.');
                    break;
                default:
                    alert('Não foi possível acessar o servidor! Por favor tente novamente em alguns instantes.');
                    break;
                
            }

        }

    };

    searchProject = async (text) => {
        
        this.setState({search:text});
        this.setProjectPage();

    };

    specialList = (participant) => {

        if(this.state.selectedProject) {

            if(this.state.selectedProject.coordinator === participant._id) {
                return 'Coordenador';
            }

            if(this.state.selectedProject.secondCoordinator === participant._id) {
                return 'Sub-Coordenador';
            }


        }

        return false;

    };

    render() {
        
        return (
            <React.Fragment>
                <Header admin={getAuthenticatedUserPermission()} projects/>
                <main>
                	<Container className="my-4">
                        <h3 className="text-uppercase">Projetos</h3>
                        <h4>Gerencie os projetos desenvolvidos pelo grupo.</h4>
                        <p>Esta página foi elaborada para que você possa criar e editar projetos que podem ser visitados no site. Também é possível inserir e remover membros desses projetos desde que você tenha os privilégios necessários. É recomendável que você trabalhe apenas com uma postagem por vez, não alterne de item sem salvar as alterações realizadas, isso pode acarretar em perdas de dados.</p>
                        <hr/>
                        <Row>
                            <Col lg={4}>
                                <ProjectsList 
                                    list={this.state.projects}
                                    pagination={this.state.projectsPagination}
                                    onSetPage={this.setProjectPage}
                                    onSelectProject={this.selectProject}
                                    onAddProject={this.addProject}
                                    onRemoveProject={this.removeProject}
                                    onSearch={this.searchProject}
                                />
                            </Col>
                            <Col lg={8}>
                                <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
                                    <Tab eventKey="project" title="Projeto">
                                        <ProjectsForms key={this.state.selectedProject._id} project={this.state.selectedProject} mode={this.state.mode} onSubmit={this.saveProject}/>
                                    </Tab>
                                    <Tab eventKey="participants" title="Participantes" disabled={(this.state.mode==='add')}>
                                        <ParticipantsList 
                                            list={this.state.selectedProject.members}
                                            special={this.specialList}
                                            onAddParticipant={this.addParticipant}
                                            onRemoveParticipant={this.removeParticipant}
                                        />
                                        <Collapse in={this.state.addParticipantMode}>
                                            <Form className="p-2 bg-light" onSubmit={this.saveParticipant}>
                                              <Row>
                                                <Col lg={6} className="my-2">
                                                  <Form.Control name="email" required type="email" placeholder="Email do participante"/>
                                                    <Form.Text className="text-muted">O e-mail deve pertencer a um participante já cadastrado no sistema.</Form.Text>
                                                </Col>
                                                <Col lg={4} className="my-2">
                                                  <Form.Control as="select" required name="office">
                                                    <option value="member">Membro</option>
                                                    <option value="secondcoordinator">Sub-Coordenador</option>
                                                    <option value="coordinator">Coordenador</option>
                                                  </Form.Control>
                                                    <Form.Text className="text-muted">Após ser definido o Coordenador e Sub-Coordenador, somente esses poderão alterar o projeto.</Form.Text>
                                                </Col>
                                                <Col lg={2} className="my-2">
                                                    <Button type="submit" variant="success" className="w-100">Salvar</Button>
                                                </Col>
                                              </Row>
                                            </Form>
                                        </Collapse>
                                    </Tab>
                                    <Tab eventKey="image" title="Imagem" disabled={(this.state.mode==='add')}>
                                        <ImageForms image={this.state.selectedProject.image} onSubmit={this.updateImage}/>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </React.Fragment>
        );
    
    }
}

export default Projects;