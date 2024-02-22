import React from 'react';
import {Container, Card} from 'react-bootstrap';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faFlask } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

function PublicationsSection(props) {

    const responsive = {
        
        extraSuperLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 4,
            slidesToSlide: 4,
        },

        superLargeDesktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 4,
            slidesToSlide: 4,
        },
        
        desktop: {
            breakpoint: { max: 992, min: 768 },
            items: 3,
            slidesToSlide: 3,
        },
        
        tablet: {
            breakpoint: { max: 768, min: 576 },
            items: 2,
            slidesToSlide: 2,
        },
        
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    
    };

    function carouselBeforeChange(nextSlide) {

        if(nextSlide===props.participants.length-1) {
            
            props.loadMoreParticipants();

        }

    }

    return (
        <section className="row bg-light mx-0" id="team-section">
            <Container className="my-5">
                <h1 className="text-center mb-5">Nossa Equipe</h1>
                <Carousel responsive={responsive} className="my-4" draggable={true} itemClass="mx-1" beforeChange={carouselBeforeChange}>
                {
                    props.participants.map(participant=> (

                        <Card key={participant._id} className="mx-auto">
                            <figure>
                                <Card.Img variant="top" src={participant.profile.image.url} className="fluid"/>
                                <figcaption className="text-center py-3">
                                    <a href={participant.profile.lattes} className="mx-3"><FontAwesomeIcon icon={faFlask} size="1x" color="#fff"/></a>
                                    <Link to={"/participantes/"+participant._id} className="mx-3"><FontAwesomeIcon icon={faUser} size="1x" color="#fff"/></Link>
                                </figcaption>
                            </figure>
                            <Card.Body className="align-text-bottom">
                                <Card.Title className="text-white text-center text-truncate">{participant.profile.name + ' ' +participant.profile.lastname}</Card.Title>
                                <Card.Subtitle className="mb-2 text-white text-center text-uppercase text-truncate">{participant.office}</Card.Subtitle>
                            </Card.Body>
                        </Card>

                    ))     
                }
                </Carousel>
            </Container>
        </section>
    );

}

PublicationsSection.defaultProps = { participants:[] };

export default PublicationsSection;