import React from 'react';
import ProjectCard, {
	ProjectCardInterface
} from './ProjectCard';
import {
	Github
} from 'react-bootstrap-icons';
import MapRoomBackground from './images/MapRoomBackground.png';

const projects: ProjectCardInterface[] = [
	{
		title: 'MapTogether',
		description: 'A GIS Web application written in Django. Users can create maps and save point, line, and polygon data. All changes to the map are synchronized across all web page viewers in real-time.',
		image: {
			src: MapRoomBackground,
			alt: 'Map Together Background Image'
		},
		projectIcons: [
			{
				icon: <Github />,
				url: 'https://github.com/zacharilius/map_together'
			}
		]
	}
];

function Projects() {
	return (
		<>
            Projects
			{
				projects.map((project) => {
					return <ProjectCard {...project} />
				})
			}

		</>
	);
}

export default Projects;
