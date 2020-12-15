import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Seanse</Link>
				</li>

				<li>
					<Link to="/movies">Filmy</Link>
				</li>

				<li>
					<Link to="/rooms">Sale</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
