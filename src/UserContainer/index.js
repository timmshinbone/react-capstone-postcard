import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react'

import PostcardContainer from '../PostcardContainer'

class UserContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			postcards: [],
			friends: [],
			users: [],
			inbox: [],
			newPostcard: false,
			viewFriends: false,
			viewHistory: false,
			viewInbox: false
		}
	}

	componentDidMount(){
		this.getUsers();
	}

	getUsers = async () => {
		try {
			const users = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const parsedUsers = await users.json();
			console.log(parsedUsers.data)
			this.setState({
				users: parsedUsers.data
			});
		} catch (err) {
			console.log(err);
		}
	}
	render(props){
		console.log(this.state.users, '<---this is users')
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