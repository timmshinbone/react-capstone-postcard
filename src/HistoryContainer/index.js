import React from 'react'
import { Segment, Header, Grid, Button, Card, Image } from 'semantic-ui-react'

const HistoryContainer = (props) => {

	const pCards = props.postcards.map(pCard => {
		return(
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
		)
	})

	return(
		<Grid colums={2}>
			{pCards}
		</Grid>
	)
}

export default HistoryContainer