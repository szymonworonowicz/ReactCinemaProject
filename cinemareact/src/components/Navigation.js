import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const linkStyle = {
	color: 'white',
	textDecoration: 'none',
};

function Navigation() {
	return (
		<AppBar position="static">
			<Toolbar>
				<Button color="inherit">
					<Link to="/" style={linkStyle}>Seanse</Link>
				</Button>
				<Button color="inherit">
					<Link to="/movies" style={linkStyle}>Filmy</Link>
				</Button>
				<Button color="inherit">
					<Link to="/rooms" style={linkStyle}>Sale</Link>
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Navigation;
