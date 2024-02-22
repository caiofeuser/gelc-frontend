import React from 'react';
import {Spinner} from 'react-bootstrap';
import style from './style.module.css';

const Preloader = () => (
    <div className={style.preloader}>
        <p><Spinner animation="border" variant="success" className="m-2"/> <br/>Carregando...</p>
    </div>
);

export default Preloader;
