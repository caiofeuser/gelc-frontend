import React from 'react';
import Header from '../../../components/Header';
import {Container,Col,Row} from 'react-bootstrap';
import DownloadsList from '../../../components/DownloadsList';
import DownloadsForms from '../../../components/DownloadsForms/';
import ImageForms from '../../../components/ImageForms';
import api from '../../../resources/api';
import {getAuthenticatedUserPermission} from '../../../resources/auth';

class Downloads extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            
            downloads:[],
            selectedDownload:{},
            downloadsPagination:{},
            search: '',
            mode:'add'

        };
    
    }

    async componentDidMount() {

        try {
        
            let {docs:downloads,...downloadsPagination} = (await api.get('/download')).data;
            
            if(downloads.length>0) {
                
                let selectedDownload = downloads[0];
                let mode = 'update';
                this.setState({downloads,selectedDownload,downloadsPagination,mode});
            
            }
        
        } catch(err) {

            alert('Não foi possível acessar o servidor! por favor tente novamente em alguns instantes.');
            throw new Error("unable to access server!");

        }
    
    }

    addDownload = () => {
        
        let selectedDownload = {
            _id: Math.random(),
            title: '',
            description: '',
            url: ''
        
        };

        let mode = 'add';
        this.setState({selectedDownload,mode});

    };

    selectDowload = (download) => {
        
        let mode = 'update';
        this.setState({selectedDownload:download,mode});
    
    };

    saveDownload = async (form) => {

        try {

            let title = form.get('title');
            let description = form.get('description');
            let url = form.get('url');

            if(this.state.mode==='add') {


                if(!title || !description || !url) {

                    alert('Há algum problema com os dados fornecidos.');
                    return;

                }

                let {data:selectedDownload} = await api.post('/download/',{title,description,url});
                this.setDownloadPage();
                this.setState({selectedDownload,mode:'update'});
                alert('Download disponibilizado com sucesso!');
            
            } else if(this.state.mode==='update') {

                let download = {title,description,url};

                if(!title && !description && !url) {

                    alert('Há algum problema com os dados fornecidos.');
                    return;

                }

                let {data:selectedDownload} = await api.put(`/download/${this.state.selectedDownload._id}`,download);
                this.setDownloadPage();
                this.setState({selectedDownload});
                alert('Download alterado com sucesso!');   

            }

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

    removeDownload = async (download) => {
        
        const confirmation = window.confirm(`Deseja realmente remover o download ${download.title}?`);
        
        if(confirmation) {
            
            try {

                (await api.delete(`/download/${download._id}`));

                if(download.image) {
                    
                    (await api.delete(`/image/${download.image._id}`));
                
                }
                
                this.setDownloadPage();

                if(download===this.state.selectedDownload) {
                
                    if(this.state.downloads.length>0) {
                        
                        let selectedDownload = this.state.downloads[0];
                        this.setState({selectedDownload});                   

                    }else {
                    
                        this.addDownload();
                    
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

    updateImage = async (form) => {

        try {
            
            let image;

            if(form.get('file').name) {

                if(this.state.selectedDownload.image && this.state.selectedDownload.image._id) {
            
                    await api.delete(`image/${this.state.selectedDownload.image._id}`);
            
                }
                
                image = (await api.post(`/image/download/${this.state.selectedDownload._id}`,form)).data;

            }else if(form.get('alt')) {

                image = (await api.put(`/image/${this.state.selectedDownload.image._id}`,{alt:form.get('alt')})).data;

            } else {

                return;
            
            }

            let selectedDownload = {...this.state.selectedDownload};
            selectedDownload.image = image;
            this.setDownloadPage();
            this.setState({selectedDownload});
            alert('Arquivo enviado com sucesso!');

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

    setDownloadPage = async (page) => {

        if(!page) {

            page = this.state.downloadsPagination.page;

        }

        let params = {page};

        if(this.state.search) {

            params.search = this.state.search;
        
        }

        try {

            let {docs:downloads,...downloadsPagination} = (await api.get('/download',{params})).data;
            this.setState({downloads,downloadsPagination});

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

    searchDownload = async (text) => {
        
        this.setState({search:text});
        this.setDownloadPage();

    };

    render() {
        
        return (
            <React.Fragment>
                <Header admin={getAuthenticatedUserPermission()} downloads/>
                <main>
                	<Container className="my-4">
                        <h3 className="text-uppercase">Downloads</h3>
                        <h4>Adicione ou remova downloads disponíveis em seu site</h4>
                        <p className="text-justify">
                            Não é aconselhável enviar qualquer arquivo exceto imagens para o sistema,
                            utilize aplicações como GoogleDrive ou Dropbox para armazenar os arquivos que deseja
                            compartilhar no seu site. Não é recomendável utilizar <em>links</em> externos de outros 
                            sites, visto que isso pode comprometer a segurança do seu sistema.
                        </p>
                        <hr/>
                        <Row>
                            <Col lg={6}>
                                <DownloadsList 
                                    list={this.state.downloads}
                                    pagination={this.state.downloadsPagination}
                                    onAddDownload={this.addDownload}
                                    onRemoveDownload={this.removeDownload}
                                    onSelectDownload={this.selectDowload}
                                    onSetPage={this.setDownloadPage}
                                    onSearch={this.searchDownload}
                                />
                            </Col>
                            <Col lg={6}>
                                {this.state.selectedDownload._id && this.state.mode==='update' && <ImageForms image={this.state.selectedDownload.image} onSubmit={this.updateImage}/>}
                                <DownloadsForms 
                                    key={this.state.selectedDownload._id}
                                    download={this.state.selectedDownload}
                                    onSubmit={this.saveDownload}
                                    mode={this.state.mode}
                                />
                            </Col>
                        </Row>
                    </Container>
                </main>
            </React.Fragment>
        );
    
    }
}

export default Downloads;