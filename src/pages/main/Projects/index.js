import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PublicProjectsList from '../../../components/PublicProjectsList';
import PublicPagination from '../../../components/PublicPagination';
import PublicSearchField from '../../../components/PublicSearchField';
import Preloader from '../../../components/Preloader';
import {Container,Row,Col} from 'react-bootstrap';
import api from '../../../resources/api';
import './style.css';

export default function Projects() {

    const [projects,setProjects] = useState([]);
    const [projectsPagination,setProjectsPagination] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        async function loadProjects() {

            let params = {page,search,public:true};
            let {docs,...projectsPagination} = (await api.get('/project',{params})).data;
            setProjects(docs);
            setProjectsPagination(projectsPagination);

        }
        
        setLoading(true);
        loadProjects();
        setLoading(false);

    },[page,search]);

    function searchProject(text) { 

        setSearch(text);
        setPage(1);

    }

    return (
        <React.Fragment>
            <Header projects/>
            <main id="projects-page-main">
                <Container>
                    <h1 className="text-center my-5">Projetos</h1>
                    <p className="text-center text-muted mt-2 mb-5">Conheça os projetos desenvolvidos pelo nosso grupo.</p>
                    <Row className="my-2">
                        <Col lg={9}></Col>
                        <Col lg={3}><PublicSearchField onSearch={searchProject}/></Col>
                    </Row>
                    {loading?<Preloader/>:<PublicProjectsList projects={projects}/>}
                    <Row>
                        <Col><PublicPagination pagination={projectsPagination} onSetPage={setPage}/></Col>
                    </Row>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}