import React from 'react'
import { Segment, List, Icon, Header, Button } from 'semantic-ui-react';

function FriendsContainer(props){
	// get a list of friendships for the current user
	const currentFriendships = props.friends.filter((friends) => 
		friends.user_one.username === props.loggedInUsername
		||
		friends.user_two.username === props.loggedInUsername)
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
	//allow for modal to add friends

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
		</Segment>
	)
}



export default FriendsContainer