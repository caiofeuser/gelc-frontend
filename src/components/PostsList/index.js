import React from 'react';
import {ListGroup,Figure,Media} from 'react-bootstrap';
import PrivateList from '../PrivateList';
import defaultImg from './img/default.svg';

export default function PostsList(props) {
    
  function handleSelectPost(e,post) {

    e.preventDefault();
    props.onSelectPost(post);

  }

  function handleRemovePost(e,post) {

    e.preventDefault();
    props.onRemovePost(post);

  }

  function handleAcceptPost(e,post) {

    e.preventDefault();
    props.onAcceptPost(post);

  }

    return(
        
        <PrivateList list={props.list} onAdd={props.onAddPost} onSetPage={props.onSetPage} pagination={props.pagination} onSearch={props.onSearch}>
            
            {(post,index)=>(

                <ListGroup.Item key={post._id || index}>
                    <Media>
                      <Figure className="text-center my-auto mx-2 p-2">
                        <Figure.Image width={80} height={80} src={defaultImg}/>
                      </Figure>
                      <Media.Body className="my-auto text-truncate">
                        <h5 className="h6 text-uppercase"><a href="" className="text-success" onClick={(e)=>{handleSelectPost(e,post)}}>{post.title}</a></h5>
                        <p>Autor: <em>{post.author && post.author.email}</em><br/>
                        <span className="text-muted">{post.accepted?'Publicado':'Em avaliação'}</span></p>
                        {!post.accepted && props.options &&<a href="" className="text-success text-uppercase mr-1" onClick={(e)=>{handleAcceptPost(e,post)}}>Aceitar</a>}
                        {props.options && <a href="" className="text-danger text-uppercase" onClick={(e)=>{handleRemovePost(e,post)}}>Remover</a>}
                      </Media.Body>
                    </Media>
                </ListGroup.Item>

            )}

        </PrivateList>
    
    );

}