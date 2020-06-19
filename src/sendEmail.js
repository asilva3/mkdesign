module.exports = function sendEmail (subject, body) {
	return fetch(process.env.REACT_APP_AWS_SES, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({ subject, body })
	})
}