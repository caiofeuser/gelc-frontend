import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PublicDownloadsList from '../../../components/PublicDownloadsList';
import PublicPagination from '../../../components/PublicPagination';
import PublicSearchField from '../../../components/PublicSearchField';
import {Container,Row,Col} from 'react-bootstrap';
import api from '../../../resources/api';
import './style.css';
import Preloader from '../../../components/Preloader';


export default function Projects() {

    const [downloads,setDownloads] = useState([]);
    const [downloadsPagination,setdownloadsPagination] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);


    useEffect(()=> {

        async function loadDownloads() {

            let params = {page,search};
            let {docs,...downloadsPagination} = (await api.get('/download',{params})).data;
            setDownloads(docs);
            setdownloadsPagination(downloadsPagination);

        }

        setLoading(true);
        loadDownloads();
        setLoading(false);

    },[page,search]);

    function searchDownlaods(text) { 

        setSearch(text);
        setPage(1);

    }

    return (
        <React.Fragment>
            <Header downloads/>
            <main id="downloads-page-main">
                <Container>
                    <h1 className="text-center my-5">Downloads</h1>
                    <p className="text-center text-muted mt-2 mb-5">Realize <em>Downloads</em> de arquivos compartilhados.</p>
                    <Row className="my-2">
                        <Col lg={9}></Col>
                        <Col lg={3}><PublicSearchField onSearch={searchDownlaods}/></Col>
                    </Row>
                    <Row>
                        <Col>
                            {loading?<Preloader/>:<PublicDownloadsList downloads={downloads}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col><PublicPagination pagination={downloadsPagination} onSetPage={setPage}/></Col>
                    </Row>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}