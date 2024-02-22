import React from 'react';
import {FormControl} from 'react-bootstrap';

export default function SearchField(props) {

	let typingTimeout;

	function handleSearch(e) {
				
		if(typingTimeout) {
			clearTimeout(typingTimeout);
		}

		let searchText = e.target.value;

		typingTimeout = setTimeout(() => {

			props.onSearch(searchText);

		},800);

	}

	return(<FormControl type="search" placeholder="Pesquisar" name="search" className={props.className} onChange={handleSearch}/>);

}