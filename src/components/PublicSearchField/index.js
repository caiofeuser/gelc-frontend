import React from 'react';
import SearchField from '../SearchField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {InputGroup} from 'react-bootstrap';

export default function PublicProjectsList({onSearch=()=>{}}) {
    return (
		<InputGroup className="mb-3">
		    <InputGroup.Prepend>
		      <InputGroup.Text className="w-100 bg-success rounded-left text-white border border-success">
		      	<FontAwesomeIcon icon={faSearch} size="1x" color="#fff"/>
		      </InputGroup.Text>
		    </InputGroup.Prepend>
			<SearchField className="border border-success rounded-right" onSearch={onSearch}/>
		</InputGroup>
    );
}