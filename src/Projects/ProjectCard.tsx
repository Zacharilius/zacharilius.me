import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProjectCard.scss';

export interface ProjectCardInterface {
	title: string;
    description: string;
	image: ProjectBackgroundImage;
    projectIcons: ProjectIcons[]
}

interface ProjectBackgroundImage {
	src: string;
	alt: string;
}

interface ProjectIcons {
	// TODO: Add better type
    icon: any;
    url: string;
}

const ProjectCard = ({title, description, image, projectIcons}: ProjectCardInterface): React.ReactElement => {
	return (
		<Card className='Project-card col-sm-4 d-flex flex-column'>
			<Card.Img variant="top" src={image.src} alt={image.alt} />
			<Card.Body className="Project-card-body">
				<Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
				{
					projectIcons.map((projectIcon) => {
						return <>
							<Button className="project-card-icons" key={projectIcon.url} variant="link" href={projectIcon.url}>
								{projectIcon.icon}
							</Button>
						</>
					})
				}
			</Card.Body>
		</Card>
	);
};

export default ProjectCard;