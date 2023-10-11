import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const routeToEventKey: Record<string, string> = {
	'/': 'Home',
	'/blog': 'Blog',
	'/contact-me': 'ContactMe',
	'/maps': 'Maps',
	'/projects': 'Projects',
	'/resume': 'Resume'
};

const getInitKey = (): string => {
	return routeToEventKey[window.location.pathname] || 'Home';
};

function NavBar() {
	const [key, setKey] = useState<string | null>(getInitKey());

	return (
		<>
			<Nav className="justify-content-center" activeKey={key || ''} onSelect={key => setKey(key)}>
				<Nav.Item>
					<Nav.Link eventKey="Home" as={Link} to="/" >Home</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="Blog" as={Link} to="/blog">Blog</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="Projects" as={Link} to="/projects">Projects</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="Maps" as={Link} to="/maps">Maps</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="resume" as={Link} to="/resume">Resume</Nav.Link>
				</Nav.Item>
			</Nav>
		</>
	);
}

export default NavBar;
