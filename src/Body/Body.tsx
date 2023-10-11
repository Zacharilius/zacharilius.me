import React from 'react';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';

function Body() {
	return (
		<Container fluid>
			<Outlet />
		</Container>
	);
}

export default Body;
