import React from 'react';
import {Figure,Form,Button,ButtonToolbar,Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheck } from '@fortawesome/free-solid-svg-icons';
import defaultImg from './img/default.svg';

class ImageForms extends React.Component {

	static defaultProps = { image:{url:defaultImg, alt:'',disabled:false} };

	constructor(props) {

		super(props);
		this.fileInput = React.createRef();
		
		this.state = {
		
			isFileUploaded:false,
			isAltChanged:false,
			isBeingSent:false
		
		};

	}

	handleFileInput = (e) => {

		e.preventDefault();
		this.fileInput.current.click();

	};

	handleFileInputChange = (e) => {

		let isFileUploaded = Boolean(e.target.value);
		this.setState({isFileUploaded});

	};

	handleAltInputChange = (e) => {

		let isAltChanged = Boolean(e.target.value);
		this.setState({isAltChanged});

	};

	handleFormSubmit = async (e) => {

		e.preventDefault();
		this.setState({isBeingSent:true});
		
		if(!this.state.isFileUploaded && !this.state.isAltChanged) {		
			return;
		}

		let form = new FormData(e.target);

		if(form.get('file').size>2072576) {

			alert('Arquivo muito grande! Somente imagens menores do que 2MB são suportadas!');
			this.setState({isBeingSent:false,isFileUploaded:false,isAltChanged:false});
			return;

		}
		
		(await this.props.onSubmit(form));
		this.setState({isBeingSent:false,isFileUploaded:false,isAltChanged:false});
	
	};

	render() {

		if(this.props.image===null) {
			return null;
		}

		return (
			<section className="p-2 bg-light my-2">
				<Figure className="text-center w-100">
					<Figure.Image src={this.props.image.url} thumbnail/>
					{ !this.props.disabled && <Figure.Caption>Somente imagens com a extesão .png .jpeg ou .jpg são suportadas. O tamanho máximo da imagem deve ser de 2MB.</Figure.Caption>}
				</Figure>
				{ !this.props.disabled &&
				<Form onSubmit={this.handleFormSubmit}>
					<Form.Group controlId="imageDescription">
						<Form.Label>Descrição da imagem:</Form.Label>
						<Form.Control type="text" maxLength={60} placeholder="descrição" name="alt" defaultValue={this.props.image.alt} onChange={this.handleAltInputChange}/>
						<Form.Control type="file" accept="image/x-png,image/jpeg" name="file" hidden ref={this.fileInput} onChange={this.handleFileInputChange}/>
						<Form.Text className="text-muted">Opcionalmente, você pode inserir uma descrição sobre a imagem.</Form.Text>
					</Form.Group>
					<ButtonToolbar>
						<Button variant="success" disabled={this.state.isFileUploaded} onClick={this.handleFileInput}><FontAwesomeIcon icon={faUpload} size="1x" className="mx-1"/>Upload</Button>
						<Button variant="success" disabled={!this.state.isFileUploaded && !this.state.isAltChanged} className="mx-1" type="submit">
							{this.state.isBeingSent?
							(<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>):
							(<FontAwesomeIcon icon={faCheck} size="1x" className="mx-1"/>)
							}
						</Button>
					</ButtonToolbar>
				</Form>
				}
			</section>
		);

	}

}


export default ImageForms;