import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import './App.css';

const sendEmail = require('./sendEmail')

export default class Post extends React.Component{
	/*
	 *  Constructor's Variables
	 *  @param {bool} success : determines whether POST was successful
	 *  @param {bool} error   : catches Error of POST
	 *  @param {Object{bool, bool, bool}} errorMessage{email, name, message} : validation for each field
	 *  @param {string} email : The email input
	 *  @param {string} name : The name input
	 *  @param {string} message : The message input
	*/
	constructor(props) {
	    super(props);
	    this.state = {
	    	success: false,
	    	error: false,
	    	errorMessage: {
	    		email: false,
	    		name: false,
	    		message: false
	    	},
	    	email: '',
	    	name: '',
	    	message: ''
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	}

	/*
	 *  Helper Function's Variables
	 *  @param {string} inputValue : Object's value
	 *  @param {string} stateField : Object's name
	*/
	handleChange(event) {
		const inputValue = event.target.value;
	    const stateField = event.target.name;
	    this.setState({
	      [stateField]: inputValue,
	    });
	    //console.log(this.state);
	}

	validate(event){
	    var hasErrors = false;
	    const stateFieldemail = event.target.email;
	    const stateFieldname = event.target.name;
	    const stateFieldmessage = event.target.message;
	    const { email, name, message } = this.state;
	    let errorMessage = this.state.errorMessage;

	    //email validation
	    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
	      hasErrors = true;
	      errorMessage.email = true;
	      this.setState({
	      	[stateFieldemail.name] : stateFieldemail.value,
	      })
	    }else{
	    	errorMessage.email = false;
	    }

	    //name validation
	    if (name < 1){
	      hasErrors = true;
	      errorMessage.name = true;
	      this.setState({
	      	[stateFieldname.name]: stateFieldname.value,
	      })
	    }else{
	    	errorMessage.name = false;
	    }

	    //message validation
	    if (message < 1){
	      hasErrors = true;
	      errorMessage.message = true;
	      this.setState({
	      	[stateFieldmessage.name]: stateFieldmessage.value,
	      })
	    }else{
	    	errorMessage.message = false;
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
    fetch(process.env.REACT_APP_URL, {
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
        //console.log('Success:', data);
        sendEmail(name, message, email);
        this.setState(state => ({
        	success: true
        }));
      })
      .catch((error) => {
      	this.setState(state => ({
      		error: true
      	}));
        //console.error('Error:', error);
      });
  }

	render(){
		const errorMessage = this.state.errorMessage;
		let containerErrors, emailerrorbutton, nameErrorButton, messageErrorButton, successButton;
		if(errorMessage.email){
			emailerrorbutton = <Alert severity="error">Please enter a valid Email</Alert>	
		}
		if(errorMessage.name){
			nameErrorButton = <Alert severity="error">Please Enter a Name</Alert>	
		}
		if(errorMessage.message){
			messageErrorButton = <Alert severity="error">Please Enter a Message</Alert>	
		}
		if(this.state.success){
			successButton = <Alert severity="success">Thank you for signing up!</Alert>
		}
		containerErrors = [emailerrorbutton, nameErrorButton, messageErrorButton];

		if(!this.state.error){
			return(
				<div>
		        <form onSubmit={this.handleSubmit}>
		        <Box m={2}>
		        	<TextField required name="email" label="Email" onChange={this.handleChange} value={this.state.email} variant="outlined" />
		        </Box>
		        <Box m={2}>
		        	<TextField required name="name" label="Name" onChange={this.handleChange} value={this.state.name} variant="outlined" />
		        </Box>
		        <Box m={2}>
		        	<TextField required name="message" label="Message" onChange={this.handleChange} value={this.state.message} variant="outlined" />
		        </Box>
		        { containerErrors.map(function(item, index){
		        	return <div key={index}>{item}</div>
		        })}
		        {successButton}
		        <Box m={2}>
		        	<Button variant="outlined" color="primary" type="submit">Send</Button>
		        </Box>
		        </form>
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