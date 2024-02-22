import React,{useState,useEffect} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import api from '../../../resources/api';
import style from './style.module.css';
import {Container} from 'react-bootstrap';
import ParticipantView from '../../../components/ParticipantView';
import Preloader from '../../../components/Preloader';


const Participant = ({match}) => {

    const [participant,setParticipant] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(()=> {

        async function loadParticipant() {

            let {data:doc} = await api.get(`participant/${match.params.id}`);
            setParticipant(doc);

        }
        
        setLoading(true);
        loadParticipant();
        setLoading(false);

    },[match.params.id]);

    return (
        <>
            <Header participants/>
            <main className={style.main}>
                <Container className="my-5 px-md-5">
                    {loading?<Preloader/>:<ParticipantView participant={participant}/>}
                </Container>
            </main>
            <Footer/>
        </>
    )
}

export default Participant;
