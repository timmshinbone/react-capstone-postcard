import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react'

import PostcardContainer from '../PostcardContainer'
import FriendsContainer from '../FriendsContainer'
import ViewUsersList from '../ViewUsersList'
import HistoryContainer from '../HistoryContainer'
import InboxContainer from '../InboxContainer'

class UserContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			users: [],
			friendships: [],
			transactions: [],
			acceptedFriends: [],
			newPostcard: false,
			viewFriends: false,
			viewHistory: false,
			viewInbox: false
		}
	}

	componentDidMount(){
		this.getUsers();
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
		this.getAcceptedFriends();
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

	getAcceptedFriends(props){
		
		const currentFriendships = this.state.friendships.filter((friend) => 
			friend.user_one.username === this.props.loggedInUsername
			||
			friend.user_two.username === this.props.loggedInUsername
		)
		
		//display friends where status is 1(accepted)
		const acceptedFriends = currentFriendships.filter((req) => req.status === 1)
		
		const friends = acceptedFriends.reduce((arr, person) => {
			if(person.user_one.username !== this.props.loggedInUsername){
				return arr.concat(person.user_one)
			} else if(person.user_two.username !== this.props.loggedInUsername){
				return arr.concat(person.user_two)
			} else {
				return arr
			}
		}, [])
		
		this.setState({
			acceptedFriends: friends
		})
	}

	render(props){
		// console.log(this.state.postcards, "<--this is postcards");
		// console.log(this.state.transactions, "<--this is transactions");
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
				<p>Click the 'INBOX' button to display 'Unread Postcards'</p>
				<ViewUsersList
					users={this.state.users}
					loggedInUsername={this.props.loggedInUsername}
					currentUser={this.props.currentUser}
					friends={this.state.friendships}
				/>
				{this.state.acceptedFriends.length > 0 ?
					<HistoryContainer
						postcards={this.state.postcards}
						friends={this.state.acceptedFriends}
						currentUser={this.props.currentUser}
					/>
				:
					<p>waiting for friends</p>

				}
				<InboxContainer
					transactions={this.state.transactions}
					currentUser={this.props.currentUser}
				/>
			</Segment>
		)
	}
}

export default UserContainer