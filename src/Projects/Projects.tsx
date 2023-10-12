import React from 'react';
import ProjectCard, {
	ProjectCardInterface
} from './ProjectCard';
import {
	Github, Twitter
} from 'react-bootstrap-icons';
import ForgetMeKnot from './images/ForgetMeKnot.png';
import MapRoomBackground from './images/MapRoomBackground.png';
import RummyCumulativeWinner from './images/RummyCumulativeWinner.png';
import WilliamShakespurr from './images/WilliamShakespurr.png';
import ZombieEscape from './images/ZombieEscape.png';

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
	},
	{
		title: 'Zombie Escape',
		description: 'A top down game written in PyGame that you play as a zombie who tries to eat as many brains as possible before one of Van Helsing daughters finds and kills you.',
		image: {
			src: ZombieEscape,
			alt: 'Picture of Zombie Escape Game'
		},
		projectIcons: [
			{
				icon: <Github />,
				url: 'https://github.com/Zacharilius/zombie_escape'
			}
		]
	},
	{
		title: 'Forget-me-knot',
		description: 'Forget-Me-Knot is a RESTful MEAN Stack web application. Users can create reminders and then Forget-Me-Knot notifies user by their preferred message type either email or SMS.',
		image: {
			src: ForgetMeKnot,
			alt: 'Screenshot of Forget-me-knot app'
		},
		projectIcons: [
			{
				icon: <Github />,
				url: 'https://github.com/Zacharilius/forget-me-knot'
			}
		]
	},
	{
		title: 'Shakespurrian Bot',
		description: 'A X (twitter) bot written in Python that posts a Shakespeare quote that was translated from English into Cat. Special thanks to http://kittify.herokuapp.com/ for the English to Cat translations.',
		image: {
			src: WilliamShakespurr,
			alt: 'Picture of William Shakespurr'
		},
		projectIcons: [
			{
				icon: <Github />,
				url: 'https://github.com/Zacharilius/shakespurrean-twitter-bot'
			},
			{
				icon: <Twitter />,
				url: 'https://twitter.com/shakespurrean'
			}
		]
	},
	{
		title: 'Rummy Cumulative Winner',
		description: 'My wife and I have been playing the same game of Rummy since January 2017. I thought it would be fun to create some summary statistics and charts to track the winner.',
		image: {
			src: RummyCumulativeWinner,
			alt: 'Screenshot of Line chart showing cumulative winner'
		},
		projectIcons: [
			{
				icon: <Github />,
				url: 'https://github.com/Zacharilius/zacharilius.github.io/blob/master/static/js/rummy.js'
			}
		]
	}
];

function Projects() {
	return <div className="col-12">
		<div className="row">
			{
				projects.map((project) => {
					return <ProjectCard {...project} />
				})
			}

		</div>
	</div>
}

export default Projects;
