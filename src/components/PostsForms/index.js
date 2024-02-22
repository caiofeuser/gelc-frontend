import React,{useState} from 'react';
import CustomForms from '../../components/CustomForms';
import TextEditor from '../../components/TextEditor';
import {Form} from 'react-bootstrap';


export default function PostsForms(props) {
    
    const [postContent,setPostContent] = useState('');

    return(
        
        <CustomForms onSubmit={props.onSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Título:</Form.Label>
                <Form.Control type="text" maxLength={120} required placeholder="título" name="title" defaultValue={props.post.title}/>
                {props.mode === 'add' && <Form.Text className="text-muted">O título da postagem deve ser único.</Form.Text>}
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control type="text" maxLength={200} required placeholder="descrição" name="description" defaultValue={props.post.description}/>
                {props.mode === 'add' && <Form.Text className="text-muted">Insira uma pequena descrição sobre a postagem.</Form.Text>}
            </Form.Group>
            <Form.Group controlId="content">
                <TextEditor onChange={(text)=>setPostContent(text)} defaultValue={props.post.content}/>
                <input type="hidden" name="content" value={postContent}/>
                {props.mode === 'add' && <Form.Text className="text-muted">Utilize o editor para inserir o conteúdo da postagem.</Form.Text>}
            </Form.Group>
        </CustomForms>
    
    );

}