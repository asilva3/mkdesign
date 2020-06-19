import React from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
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
    const stateFieldname = event.target.name.name;
    const stateFieldmessage = event.target.message.name;
    const { email, name, message } = this.state;
    let errorMessage = this.state.errorMessage;

    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
      hasErrors = true;
      errorMessage.email = true;
      this.setState({
      	[stateFieldemail.name] : stateFieldemail.value,
      })
    }else{
    	errorMessage.email = false;
    }
    if (name < 1){
      hasErrors = true;
      errorMessage.name = true;
      this.setState({
      	[stateFieldname]: "Must Enter a Name",
      })
    }else{
    	errorMessage.name = false;
    }

    if (message < 1){
      hasErrors = true;
      errorMessage.message = true;
      this.setState({
      	[stateFieldmessage]: "Must Enter a Message",
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
        sendEmail("body", message);
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
		let emailerrorbutton;
		if(errorMessage.email){
			emailerrorbutton = <Alert severity="error">Please enter a valid Email</Alert>	
		}
		if(errorMessage.name){
			emailerrorbutton = <Alert severity="error">Please Enter a Name</Alert>	
		}
		if(errorMessage.message){
			emailerrorbutton = <Alert severity="error">Please Enter a Message</Alert>	
		}

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
		        {emailerrorbutton}
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