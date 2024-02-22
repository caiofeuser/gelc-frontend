import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PublicParticipantsList from '../../../components/PublicParticipantsList';
import PublicPagination from '../../../components/PublicPagination';
import PublicSearchField from '../../../components/PublicSearchField';
import {Container,Row,Col} from 'react-bootstrap';
import api from '../../../resources/api';
import './style.css';
import Preloader from '../../../components/Preloader';


export default function Participants() {

    const [participants,setParticipants] = useState([]);
    const [participantsPagination,setParticipantsPagination] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);


    useEffect(()=> {

        async function loadParticipants() {

            let params = {page,search,public:true};
            let {docs,...participantsPagination} = (await api.get('/participant',{params})).data;
            setParticipants(docs);
            setParticipantsPagination(participantsPagination);

        }

        setLoading(true);
        loadParticipants();
        setLoading(false);

    },[page,search]);

    function searchParticipant(text) { 

        setSearch(text);
        setPage(1);

    }

    return (
        <React.Fragment>
            <Header participants/>
            <main id="participants-page-main">
                <Container>
                    <h1 className="text-center my-5">Participantes</h1>
                    <p className="text-center text-muted mt-2 mb-5">Conheça os participantes do nosso grupo.</p>
                    <Row className="my-2">
                        <Col lg={9}></Col>
                        <Col lg={3}><PublicSearchField onSearch={searchParticipant}/></Col>
                    </Row>
                    <Row>
                        <Col>{loading?<Preloader/>:<PublicParticipantsList participants={participants}/>}</Col>
                    </Row>
                    <Row>
                        <Col><PublicPagination pagination={participantsPagination} onSetPage={setPage}/></Col>
                    </Row>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}