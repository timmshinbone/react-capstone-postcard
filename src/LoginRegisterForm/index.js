import React from 'react'
import { Form, Button, Label, Grid } from 'semantic-ui-react';

class LoginRegisterForm extends React.Component{
	constructor(){
		super()

		this.state = {
			email: '',
			username: '',
			password: '',
			action: 'login'
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	loginRegister = () => {
		if(this.state.action === 'login'){
			this.props.login({
				username: this.state.username,
				password: this.state.password
			})
		} else {
			this.props.register({
				email: this.state.email, 
				username: this.state.username,
				password: this.state.password
			})
		}
	}
	switchForm = () => {
		if (this.state.action === 'login') {
			this.setState({
				action: 'register'
			})
		} else {
			this.setState({
				action: 'login'
			})
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister()
	}
	render(){
		return(
			<Grid className="LoginRegisterForm">
				<Grid.Column width={4} />
				<Grid.Column width={8}>
					<Form onSubmit={this.handleSubmit} >
						{
							this.state.action === 'register'
							?
							<React.Fragment>
								<Label basic >Email:</Label>
								<Form.Input
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</React.Fragment>
							:
							null
						}
						<Label basic >Username:</Label>
						<Form.Input
							type="username"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}							
						/>
						<Label basic >Password:</Label>
						<Form.Input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}							
						/>
						<Button basic type="Submit">{this.state.action ==="register" ? "Register" : "Log In"}</Button>
					</Form>
					{
						this.state.action === 'register'
						?
						<small>Already have an account? <span onClick={this.switchForm} color="blue">Log in here</span>!</small>
						:
						<small>Need an account? <span onClick={this.switchForm} color="blue">Register here</span>!</small>
					}
				</Grid.Column>
				<Grid.Column width={4}/>
			</Grid>
		)
	}
}



export default LoginRegisterForm
















