import React,{useState,useEffect} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import {Col,Row,Container} from 'react-bootstrap';
import PublicSearchField from '../../../components/PublicSearchField';
import PublicPagination from '../../../components/PublicPagination';
import PublicPublicationsList from '../../../components/PublicPublicationsList';
import api from '../../../resources/api';
import Preloader from '../../../components/Preloader';


import './style.css';

function Publications() {

    const [posts,setPosts] = useState([]);
    const [postsPagination,setPostsPagination] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);

    useEffect(()=> {

        async function loadPosts() {

            let params = {page,search,public:true};
            let {docs,...postsPagination} = (await api.get('/post',{params})).data;
            setPosts(docs);
            setPostsPagination(postsPagination);

        }

        setLoading(true);
        loadPosts();
        setLoading(false);

    },[page,search]);

    function searchPosts(text) { 

        setSearch(text);
        setPage(1);

    }

    return(
        <React.Fragment>
            <Header posts/>
            <main id="publications-page-main">
                <Container>
                <h1 className="text-center my-5">Publicações</h1>
                <p className="text-center text-muted mt-2 mb-5">Fique por dentro das notícias compartilhadas pelo nosso grupo.</p>
                <Row className="my-2">
                    <Col lg={9}></Col>
                    <Col lg={3}><PublicSearchField onSearch={searchPosts}/></Col>
                </Row>
                {loading?<Preloader/>:<PublicPublicationsList posts={posts}/>}
                <Row className="mt-4">
                    <Col><PublicPagination pagination={postsPagination} onSetPage={setPage}/></Col>
                </Row>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
        );

}

export default Publications;
