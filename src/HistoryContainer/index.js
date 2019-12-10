import React, { Component } from 'react'
import { Segment, Header, Grid, Button, Card, Image, Icon } from 'semantic-ui-react'


class HistoryContainer extends Component {

	constructor(props){
		super(props)

		this.state = {
			postcards: [],
			userPCards: [],
			pCardsView: []
		}
	}

	componentDidMount(){
		this.getPostcards();
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
		this.getUserPCards();
		this.showPcards();	
	}
	//get the current user's postcards
	getUserPCards(){
		const userPCards = this.state.postcards.filter((p) => {
			if(p.creator.id === this.props.currentUser.id){
				return true
			} else {
				return false
			}
		})
		this.setState({
			userPCards: userPCards
		})
		console.log(userPCards, "this is userPCards");
	}
	//send postcard

	showPcards(){
		const pCards = this.state.userPCards.map(pCard => {
			return(
				<Grid key={pCard.id}>
					<Card key={pCard.id}>
						<Image src={pCard.drawing} wrapped ui={false} />
	    				<Card.Content>
	      					<Card.Header>Created By: {pCard.creator.username}</Card.Header>
	      					<Card.Meta>{pCard.date}</Card.Meta>
							<Card.Description>
	       						{pCard.message}
	      					</Card.Description>
	      					<Button basic color="blue">
								<Icon name="paper plane outline" color="blue" key={pCard.id}/> Send
							</Button>
	    				</Card.Content>
					</Card>
				</Grid>
			)
		})
		this.setState({
			pCardsView: pCards
		})
	}
	render(props){
		return(
			<Segment>
				<Grid.Column width={2}/>
				<Header>{this.props.currentUser.username}'s creations</Header>
				<Grid colums={3}>
					{this.state.pCardsView}
				</Grid>

			</Segment>
		)
	}
}

export default HistoryContainer