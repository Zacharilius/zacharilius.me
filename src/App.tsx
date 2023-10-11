import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './Navbar/Navbar';
import Resume from './Resume/Resume';
import Home from './Home/Home';
import NoMatch from './NoMatch/NoMatch';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import Blog from './Blog/Blog';
import Projects from './Projects/Projects';
import Maps from './Maps/Maps';

function App() {
  return (
		<div className="container">
			<div className="App">
				<header className="App-header">
					<Nav />
				</header>

				<div className="App-routes-container">
					{/* Routes nest inside one another. Nested route paths build upon
						parent route paths, and nested route elements render inside
						parent route elements. See the note about <Outlet> below. */}
					<Routes>
						<Route path="/" element={<Body />}>
							<Route index element={<Home />} />
							<Route path="blog" element={<Blog />} />
							<Route path="projects" element={<Projects />} />
							<Route path="maps" element={<Maps />} />
							<Route path="resume" element={<Resume />} />

							{/* Using path="*"" means "match anything", so this route
								acts like a catch-all for URLs that we don't have explicit
								routes for. */}
							<Route path="*" element={<NoMatch />} />
						</Route>
					</Routes>
				</div>

				<Footer />
			</div>
		</div>
  );
}

export default App;
