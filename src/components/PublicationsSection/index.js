import React from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {format,parseISO} from 'date-fns';
import {pt} from 'date-fns/locale';
import './style.css';
import defaultImg from './img/default.svg';

function PublicationsSection(props) {

    if(props.posts.length===0) {
        return null;
    }

    let posts = props.posts;

    if(props.posts.length>3) {

        posts.length = 3;
    
    }
    
    return (
        <section className="row mx-0" id="publications-section">
            <Container className="my-5">
                <Row className="py-2">
                    <Col>
                        <h1 className="text-center mb-4">PUBLICAÇÕES</h1>
                    </Col>
                </Row>
                <Row className="py-2 px-md-5">
                    {
                        posts.map((post,index)=> (
                            <Col sm={4} className="publication my-2" key={index}>
                                <Image src={post.image?post.image.url:defaultImg} fluid alt={post.image?post.image.alt:post.title}/>
                                <small>{ post.createdAt && format(parseISO(post.createdAt),"dd 'de' MMMM, yyyy",{locale:pt}) }</small>
                                <h2 className="text-uppercase text-justify"><Link to={`/postagens/${post._id}`}>{post.title?post.title:'Postagem'}</Link></h2>
                                <p className="text-muted text-justify">{post.description?post.description:'Descrição da Postagem'}</p>
                                <Link to={`/postagens/${post._id}`}>Leia Mais+</Link>
                            </Col>
                    
                        ))
                    }
                </Row>
                <Row className="my-2">
                    <Col className="text-center">
                        <hr/>
                        <Link to="postagens/" className="text-uppercase text-success">+ Publicações</Link>
                    </Col>
                </Row>
            </Container>
        </section>
    );

}

PublicationsSection.defaultProps = {posts:[{}]};
export default PublicationsSection;