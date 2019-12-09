import React from 'react'
import { List, Icon, Header, Button } from 'semantic-ui-react';

function FriendsContainer(props){
	// get a list of friendships for the current user
	const currentFriendships = props.friends.filter((friends) => 
		friends.user_one.username === props.loggedInUsername
		||
		friends.user_two.username === props.loggedInUsername)
	console.log(currentFriendships, "<--currentFriendships");
	//display friends where status is 1(accepted)
	const friends = currentFriendships.filter((req) => req.status === 1)
	console.log(friends, "<-This is friends");

	const friendsNames = friends.reduce((arr, person) => {
		if(person.user_one.username !== props.loggedInUsername){
			return arr.concat(person.user_one.username)
		} else if(person.user_two.username !== props.loggedInUsername){
			return arr.concat(person.user_two.username)
		} else {
			return arr
		}
	}, [])
	console.log(friendsNames, '<--this is friendsNames');
	const friendList = friendsNames.map((fren) => {
		return(
			<List.Item key={fren.id}>
				<List.Header><Icon name='user outline'/>{fren}</List.Header>
			</List.Item>
		)
	})
	//display pending requests 
	//allow for modal to add friends

	return(
		<List>
			{ friendList }
		</List>
	)
}



export default FriendsContainer