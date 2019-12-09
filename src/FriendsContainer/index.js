import React from 'react'
import { Form, Button, Label, } from 'semantic-ui-react';

function FriendsContainer(props){
	// get a list of friendships for the current user
	const currentFriendships = props.friends.filter((friends) => 
		friends.user_one.username === props.loggedInUsername
		||
		friends.user_two.username === props.loggedInUsername)
	console.log(currentFriendships);
	//display friends where status is 1(accepted)
	//display pending requests 
	//allow for modal to add friends

	return(
		<p>Friends</p>
	)
}



export default FriendsContainer