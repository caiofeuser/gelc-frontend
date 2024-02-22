import React from 'react';
import {ListGroup,Figure,Media} from 'react-bootstrap';
import PrivateList from '../PrivateList';
import defaultImg from './img/default.svg';
import './style.css';

export default function DownloadsList(props) {
    
  function handleSelectDownload(e,download) {

    e.preventDefault();
    props.onSelectDownload(download);

  }

  function handleRemoveDownload(e,download) {

    e.preventDefault();
    props.onRemoveDownload(download);

  }

    return(
        
        <PrivateList list={props.list} onAdd={props.onAddDownload} onSetPage={props.onSetPage} pagination={props.pagination} onSearch={props.onSearch}>
            
            {(download,index)=>(

                <ListGroup.Item key={download._id || index} className="downloads-list-item">
                    <Media>
                      <Figure className="text-center my-auto mx-2 p-2">
                        <Figure.Image width={80} height={80} src={download.image?download.image.url:defaultImg}/>
                      </Figure>
                      <Media.Body className="my-auto">
                        <h5><a href="" className="text-success" onClick={(e)=>{handleSelectDownload(e,download)}}>{download.title}</a></h5>
                        <p>{download.description}</p>
                        <a href="" className="text-danger text-uppercase" onClick={(e)=>{handleRemoveDownload(e,download)}}>Remover download</a>
                      </Media.Body>
                    </Media>
                </ListGroup.Item>

            )}

        </PrivateList>
    
    );

}