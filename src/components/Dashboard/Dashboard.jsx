import React from 'react';
import { AuthedUserContext } from '../../App';

const Dashboard = () => {
	const user = React.useContext(AuthedUserContext);

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			<p>Content for the Dashboard</p>
		</div>
	);
};

export default Dashboard;
