import React from 'react'
import { Segment, Header, Grid, Button, Card, Image } from 'semantic-ui-react'

const HistoryContainer = (props) => {
	//get the current user's postcards
	const userPCards = props.postcards.filter((p) => {
		if(p.creator.id === props.currentUser.id){
			return true
		} else {
			return false
		}
	})

	console.log(userPCards, "this is userPCards");

	const pCards = userPCards.map(pCard => {
		return(
			<Grid >
				<Card key={pCard.id}>
					<Image src={pCard.drawing} wrapped ui={false} />
    				<Card.Content>
      					<Card.Header>Created By: {pCard.creator.username}</Card.Header>
      					<Card.Meta>{pCard.date}</Card.Meta>
						<Card.Description>
       						{pCard.message}
      					</Card.Description>
    				</Card.Content>
				</Card>
			</Grid>
		)
	})

	return(
		<Segment>
			<Grid.Column width={2}/>
			<Header>{props.currentUser.username}'s creations</Header>
			<Grid colums={3}>
				{pCards}
			</Grid>

		</Segment>
	)
}

export default HistoryContainer