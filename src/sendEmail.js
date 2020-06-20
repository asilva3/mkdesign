module.exports = function sendEmail (subject, body, toemail) {
	console.log("this is subject : " + subject + " " + toemail);
	return fetch(process.env.REACT_APP_AWS_SES, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({ 
	    	subject, body, toemail
	    })
	}).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
    });
}