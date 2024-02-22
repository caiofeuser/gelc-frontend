import React from 'react';
import {Row,Col,Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {format,parseISO} from 'date-fns';
import {pt} from 'date-fns/locale';
import defaultImg from './img/default.svg';
import style from './style.module.css';

function PublicPublicationsList({posts}) {

    if(!posts || posts.length === 0) {
        return null;
    }

    let [main, ...rest] = posts;

    let renderSubPosts = (post,index) => (
                    
        <Col key={post._id || index} md={4} className={style.publication}>
            <Image src={post.image?post.image.url:defaultImg} fluid/>
            <small>{ post.createdAt && format(parseISO(post.createdAt),"dd 'de' MMMM, yyyy",{locale:pt}) }</small>
            <h2><Link to={`/postagens/${post._id}`}>{post.title?post.title:'Postagem'}</Link></h2>
            <p className="text-muted text-justify">{post.description?post.description:'Descrição da Postagem'}</p>
            <Link to={`/postagens/${post._id}`}>Leia Mais+</Link>
        </Col>
            
    );

    let renderMainPost = (post)=> (

        <React.Fragment>
            <Col md={7}>
                <Image src={post.image?post.image.url:defaultImg} fluid/>
            </Col>
            <Col md={5}  className={style.mainPublication}>
                <small>{ post.createdAt && format(parseISO(post.createdAt),"dd 'de' MMMM, yyyy",{locale:pt}) }</small>
                <h2><Link to={`/postagens/${post._id}`}>{post.title?post.title:'Postagem'}</Link></h2>
                <p className="text-muted text-justify">{post.description?post.description:'Descrição da Postagem'}</p>
                <Link to={`/postagens/${post._id}`}>Leia Mais+</Link>
            </Col>
        </React.Fragment>

    );

    return (

        <React.Fragment>
            <Row className="my-2 px-sm-5 d-none d-md-flex">
                {renderMainPost(main)}
            </Row>
            <Row className="px-5 my-4 d-none d-md-flex">
                <span className="border-bottom w-100"></span>
            </Row>
            <Row className="my-2 px-sm-5 d-flex d-md-none">
                {renderSubPosts(main)}
            </Row>
            <Row className="my-2 px-sm-5">
                {rest.map(renderSubPosts)}
            </Row>
        </React.Fragment>
    );

}

export default PublicPublicationsList;
