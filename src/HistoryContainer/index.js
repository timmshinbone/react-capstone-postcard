import React, { Component } from 'react'
import { Segment, Header, Grid, Button, Card, Image, Icon, Dropdown } from 'semantic-ui-react'


class HistoryContainer extends Component {

	constructor(props){
		super(props)

		this.state = {
			postcards: [],
			userPCards: [],
			pCardsView: [],
			receiver: null
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
		// console.log(userPCards, "this is userPCards");
		// console.log(this.friends, "this is this.friends in user");
	}
	
	getFriendOptions(){
		return this.props.friends.map((f) => {
			return ({
				key: f.id,
				text: f.username,
				value: f.id
			})
		})
	}
	handleChange = (e, value) => {
		this.setState({
			receiver: value.value
		})
	}
	
	sendPostCard = async (postcard, receiver) => {
		try{
			const sendPCardResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/transactions/' + postcard + '/' + this.state.receiver, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					postcard: postcard,
					receiver: receiver
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		const parsedResponse = await sendPCardResponse.json();
		}
		catch (err) {
			console.log(err);
		}
	}

	showPcards(props){
		return this.state.userPCards.map(pCard => {
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
	      					<Button basic color="blue" onClick={() => this.sendPostCard(pCard.id, this.state.receiver)}>
								<Icon name="paper plane outline" color="blue" key={pCard.id}/> Send
							</Button>
							<span>
							Send to:  
							<Dropdown key={pCard.id}
								inline
								options={this.getFriendOptions()}
								placeholder='friends'
								closeOnChange
								onChange={this.handleChange}
							/>
							</span>
	    				</Card.Content>
					</Card>
				</Grid>
			)
		})
	}

	render(props){
		return(
			<Segment>
				<Grid.Column width={2}/>
				<Header>{this.props.currentUser.username}'s creations</Header>
				<Grid.Column width={2}/>
				<Grid columns={3}>
					{this.showPcards()}
				</Grid>

			</Segment>
		)
	}
}

export default HistoryContainer