import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import './App.css';

export default class Post extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	success: false,
	    	error: false,
	    	errorMessage: '',
	    	email: '',
	    	name: '',
	    	message: '',
	    	subject: "subject",
	    	body: "body",
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.sendEmail = this.sendEmail.bind(this);
	}

	sendEmail (subject, body) {
	  return fetch('https://pfc8jwz0t1.execute-api.us-west-2.amazonaws.com/Production/submit', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({ subject, body })
	  })
	}

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }

  validate(event){
    var hasErrors = false;
    const inputValue = event.target.value;
    const stateFieldemail = event.target.email.name;
    const stateFieldname = event.target.name.name;
    const stateFieldmessage = event.target.message.name;
    const { email, name, message } = this.state;
    console.log("This is the email: " + stateFieldname);
    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
      hasErrors = true;
      this.setState({
      	errorMessage: "The Email Entered is not Valid",
      })
    }

    if ( name < 1){
      hasErrors = true;
      this.setState({
      	[stateFieldname]: "Must Enter a Name",
      })
    }

    if ( message < 1){
      hasErrors = true;
      this.setState({
      	[stateFieldmessage]: "Must Enter a Message",
      })
    }

    return !hasErrors;
  }


  async handleSubmit(event) {
    event.preventDefault();
    if(!this.validate(event)){
    	return;
    }
    const { email, name, message } = this.state;
    console.log('onSubmit state', this.state);
    fetch('https://fwuloepxjl.execute-api.us-west-2.amazonaws.com/prod/getuserprofile', {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },      
	      body: JSON.stringify({
	      	email : email, 
	      	name : name, 
	      	message : message
	      })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.sendEmail("body", "body");
        this.setState(state => ({
        	success: true
        }));
      })
      .catch((error) => {
      	this.setState(state => ({
      		error: true
      	}));
        console.error('Error:', error);
      });
  }

	render(){
		if(!this.state.success && !this.state.error){
			return(
				<div>
		        <form onSubmit={this.handleSubmit}>
		        <div>
		        	<TextField required name="email" label="Email" onChange={this.handleChange} value={this.state.email} variant="outlined" />
		        </div>
		        <div>
		        	<TextField name="name" label="Name" onChange={this.handleChange} value={this.state.name} variant="outlined" />
		        </div>
		        <div>
		        	<TextField name="message" label="Message" onChange={this.handleChange} value={this.state.message} variant="outlined" />
		        </div>
		        {this.state.errorMessage ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
		          <button type="submit">Send</button>
		        </form>
		      </div>
			)	
		}
		else if(this.state.success){
			return(
				<div>
					<h1>Success</h1>
				</div>
			)	
		}
		else{
			return(
				<div>
					<h1>Uh Oh Something Went Wrong :(</h1>
				</div>
			)
		}

	}
}