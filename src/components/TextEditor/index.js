import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './style.css';

function TextEditor(props) {

	let editorOptions = {

		autofocus: true,
		spellChecker: false,
		hideIcons:['image'],
		initialValue:props.defaultValue
	};

	return(<SimpleMDE onChange={props.onChange} options={editorOptions}/>);

}

export default TextEditor;