import React from 'react';
import { List, Icon, Header, Button, Popup, Segment, Grid	} from 'semantic-ui-react'

function ViewUsersList(props){
	
	const nonLoggedInUsers = props.users.filter((user) => user.username !== props.loggedInUsername)
	console.log(nonLoggedInUsers, "<-this is nonLoggedInUsers");
	
	console.log(props.currentUser, "this is current user");

	const friendRequest = async (userSelected) => {
		
		console.log(userSelected, "userSelected")
		try{
			const url = await fetch(process.env.REACT_APP_API_URL + '/api/v1/friendships/' + props.currentUser.id + "/" + userSelected, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					user_two: userSelected
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

	const currentFriendships = props.friends.filter((friends) => 
		friends.user_one.username === props.loggedInUsername
		||
		friends.user_two.username === props.loggedInUsername)

	// console.log(currentFriendships, "<--currentFriendships");
	

	// console.log(yetToBeFriended, "<-yetToBeFriended");
	const friends = currentFriendships.filter((req) => req.status === 1)
	// console.log(friends, "<-This is friends in user list");
	const pending = currentFriendships.filter((req) => req.status === 0)
	// console.log(pending, "<-This is pending in user list");

	const yetToBeFriended = nonLoggedInUsers.filter((person) => {
		if(currentFriendships.findIndex(friendship => 
			friendship.user_one.id === person.id || friendship.user_two.id === person.id) === -1) {
			return true
		} else {
			return false
		}
	})
	// cont addedfriends = ([friended, setFriended])
	const showUnfriended = yetToBeFriended.map((user) => {
		return(
			<Grid.Column key={user.id}>	
				<Segment>		
					<Header>{user.username}</Header>
					<Button size="mini" icon="plus" color="green" onClick={() => friendRequest(user.id)}/>
				</Segment>
			</Grid.Column>
		)
	})

	return(
		<Grid columns={3} divided>
			{showUnfriended}
		</Grid>
	)
}

export default ViewUsersList