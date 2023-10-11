import React from 'react';
import {
	Github,
	Linkedin
} from 'react-bootstrap-icons';
import './Footer.scss';

function Footer() {
	return (
		<>
			<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
				<div className="col-md-4 d-flex align-items-center">
					<a
						className="me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
						href="https://zacharilius.me"
						style={{color: 'var(--bs-primary)'}}
					>
						© 2023 - zacharilius.me
					</a>
				</div>

				<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
					<li className="ms-3">
						<a className="text-body-secondary" href="https://github.com/zacharilius">
							<Github
								size={30}
								color='#171515'
							/>
						</a>
					</li>
					<li className="ms-3">
						<a className="text-body-secondary" href="https://www.linkedin.com/in/zabensley">
							<Linkedin
								size={30}
								color='#0077B5'
							/>
						</a>
					</li>
				</ul>
			</footer>
		</>
	);
}

export default Footer;
