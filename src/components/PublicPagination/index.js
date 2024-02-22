import React from 'react';
import {Pagination} from 'react-bootstrap';
import './style.css';

export default function PublicProjectsList({pagination={}, onSetPage=(page)=>{}}) {

	let {page, totalPages, hasPrevPage, hasNextPage} = pagination;

    return (
		<Pagination className="justify-content-center mt-2 mb-5" id="public-pagination">
		  	<Pagination.First disabled={!hasPrevPage} onClick={()=>onSetPage(1)}/>
		  	<Pagination.Prev disabled={!hasPrevPage} onClick={()=>onSetPage(page-1)}/>
		  	{ page-2 > 0 && <Pagination.Item onClick={()=>onSetPage(page-2)}>{page-2}</Pagination.Item> }
		  	{ hasPrevPage && <Pagination.Item onClick={()=>onSetPage(page-1)}>{page-1}</Pagination.Item> }
		  	<Pagination.Item active>{page || 1}</Pagination.Item>
		  	{ hasNextPage && <Pagination.Item onClick={()=>onSetPage(page+1)}>{page+1}</Pagination.Item> }
		  	{ page+2 <= totalPages && <Pagination.Item onClick={()=>onSetPage(page+2)}>{page+2}</Pagination.Item> }
		  	<Pagination.Next disabled={!hasNextPage} onClick={()=>onSetPage(page+1)}/>
			<Pagination.Last disabled={!hasNextPage} onClick={()=>onSetPage(totalPages)}/>
		</Pagination>
    );
}