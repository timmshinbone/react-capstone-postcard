import React from 'react'
import { Segment, List, Icon, Header, Button } from 'semantic-ui-react';

function FriendsContainer(props){
	// get a list of friendships for the current user
	const currentFriendships = props.friends.filter((friends) => 
		friends.user_one.username === props.loggedInUsername
		||
		friends.user_two.username === props.loggedInUsername
	)
	// console.log(currentFriendships, "<--currentFriendships");
	//display friends where status is 1(accepted)
	const friends = currentFriendships.filter((req) => req.status === 1)
	// console.log(friends, "<-This is friends");

	const friendsNames = friends.reduce((arr, person) => {
		if(person.user_one.username !== props.loggedInUsername){
			return arr.concat(person.user_one.username)
		} else if(person.user_two.username !== props.loggedInUsername){
			return arr.concat(person.user_two.username)
		} else {
			return arr
		}
	}, [])
	// console.log(friendsNames, '<--this is friendsNames');
	const friendList = friendsNames.map((fren) => {
		return(
			<List.Item key={fren}>
				<List.Header><Icon name='user outline'/>{fren}</List.Header>
			</List.Item>
		)
	})
	//display pending requests 
	const requests = currentFriendships.filter((req) => 
		req.user_two.username === props.loggedInUsername && req.status === 0)
	
	//accept friend
	const acceptFriend = async (id) => {

		console.log("this is id", id);
		try{
			const url = await fetch(process.env.REACT_APP_API_URL + '/api/v1/friendships/' + id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					status: 1
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
		catch (err) {
			console.log(err);
		}
	}
	//deny friend
	const denyFriend = async (id) => {

		console.log("this is id", id);
		try{
			const url = await fetch(process.env.REACT_APP_API_URL + '/api/v1/friendships/' + id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					status: 2
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
		catch (err) {
			console.log(err);
		}
	}

	const requestList = requests.map((req) => {
		return(
			<List.Item key={req.id}>
				<List.Header>{req.user_one.username} wants to be friends!</List.Header>
				<Button.Group size="mini">
					<Button size="mini" basic color="green" onClick={() => acceptFriend(req.id)}>
						<Icon name="thumbs up" color="green"/>
					</Button>
					<Button.Or />
					<Button size="mini" basic color="red" onClick={() => denyFriend(req.id)}>
						<Icon name="thumbs down" color="red"/>
					</Button>
				</Button.Group>
			</List.Item>
		)
	})


	return(
		<Segment>
		{friendList.length > 0 ?
			<Segment>
				<Header>Friends</Header>
				<List>
					{ friendList }
				</List>
			</Segment>
		:
			<h3>You don't have any friends yet</h3>
		}
		{requests.length > 0 ?
			<Segment>
				<Header>Requests</Header>
				<List>
					{ requestList }
				</List>
			</Segment>
		:
			<h3>No pending friend requests</h3>
		}
		</Segment>
	)
}



export default FriendsContainer