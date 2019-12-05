import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react'

import PostcardContainer from '../PostcardContainer'

class UserContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			postcards: [],
			friends: [],
			inbox: [],
			newPostcard: false,
			viewFriends: false,
			viewHistory: false,
			viewInbox: false
		}
	}
	render(props){
		return(
			<Segment>
				<h1>This is the current user's home screen</h1>
				<PostcardContainer/>
				<p>Click the 'FRIENDS' button to display 'List of Friends'</p>
				<p>Click the 'HISTORY' button to display 'List of transactions'</p>
				<p>Click the 'INBOX' button to display 'Unread Postcards'</p>
			</Segment>
		)
	}
}

export default UserContainer