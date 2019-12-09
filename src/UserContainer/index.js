import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react'

import PostcardContainer from '../PostcardContainer'
import FriendsContainer from '../FriendsContainer'

class UserContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			users: [],
			postcards: [],
			friendships: [],
			transactions: [],
			newPostcard: false,
			viewFriends: false,
			viewHistory: false,
			viewInbox: false
		}
	}

	componentDidMount(){
		this.getUsers();
		this.getPostcards();
		this.getFriendships();
		this.getTransactions();
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
			this.setState({
				users: parsedUsers.data
			});
		} catch (err) {
			console.log(err);
		}
	}

	getPostcards = async () => {
		try {
			const pCards = await fetch(process.env.REACT_APP_API_URL + '/api/v1/postcards/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const parsedPCards = await pCards.json();
			this.setState({
				postcards: parsedPCards.data
			});
		} catch (err) {
			console.log(err);
		}		
	}

	getFriendships = async () => {
		try {
			const fShips = await fetch(process.env.REACT_APP_API_URL + '/api/v1/friendships/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const parsedFShips = await fShips.json();
			this.setState({
				friendships: parsedFShips.data
			});
		} catch (err) {
			console.log(err);
		}
	}

	getTransactions = async () => {
		try {
			const transactions = await fetch(process.env.REACT_APP_API_URL + '/api/v1/transactions/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const parsedTrans = await transactions.json();
			this.setState({
				transactions: parsedTrans.data
			});
		} catch (err) {
			console.log(err);
		}			
	}

	render(props){
		console.log(this.state.friendships, "<--this is friendships");
		console.log(this.state.postcards, "<--this is postcards");
		console.log(this.state.transactions, "<--this is transactions");
		return(
			<Segment>
				<h1>This is the current user's home screen</h1>
				<PostcardContainer/>
				{this.state.friendships.length > 0 ?
					<FriendsContainer
						users={this.state.users}
						friends={this.state.friendships}
						loggedInUsername={this.props.loggedInUsername}
					/>
				:
					<h1>waiting for friends</h1>
				}
				<p>Click the 'HISTORY' button to display 'List of transactions'</p>
				<p>Click the 'INBOX' button to display 'Unread Postcards'</p>
			</Segment>
		)
	}
}

export default UserContainer