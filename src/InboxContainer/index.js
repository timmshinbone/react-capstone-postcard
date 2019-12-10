import React from 'react'
import { Segment, Header, Grid, Button, Card, Image, Icon } from 'semantic-ui-react'

const InboxContainer = (props) => {
	//get the current user's postcards
	const userInbox = props.transactions.filter((t) => {
		if(t.receiver.id === props.currentUser.id){
			return true
		} else {
			return false
		}
	})

	console.log(userInbox, "this is userInbox");

	const inbox = userInbox.map(item => {
		return(
			<Grid >
				<Card key={item.id}>
					<Image src={item.postcard.drawing} wrapped ui={false} />
    				<Card.Content>
      					<Card.Header>Created By: {item.postcard.creator.username}</Card.Header>
      					<Card.Meta>{item.date}</Card.Meta>
      					<small>Sent by {item.sender.username}</small>
						<Card.Description>
       						{item.postcard.message}
      					</Card.Description>
    				</Card.Content>
				</Card>
			</Grid>
		)
	})

	return(
		<Segment>
			<Grid.Column width={2}/>
			<Header>{props.currentUser.username}'s inbox</Header>
			<Grid colums={3}>
				{ inbox }
			</Grid>

		</Segment>
	)
}

export default InboxContainer