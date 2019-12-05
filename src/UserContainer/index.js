import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react'

class UserContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			postcards: [],
			friends: [],
			inbox: [],
		}
	}
	render(props){
		return(
			<Grid>
				<Segment>
					<h1>This is the current user's home screen</h1>
					<p>Click the 'POSTCARD' button to display 'New Postcard Creation'</p>
					<p>Click the 'FRIENDS' button to display 'List of Friends'</p>
					<p>Click the 'HISTORY' button to display 'List of transactions'</p>
					<p>Click the 'INBOX' button to display 'Unread Postcards'</p>
				</Segment>
			</Grid>
		)
	}
}

export default UserContainer