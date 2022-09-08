// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import TableForm2 from "./TableForm2";

// CreateStudent Component
const CreateTable = () => {
const [formValues, setFormValues] =
	useState({ name: '', email: '' })
// onSubmit handler
const onSubmit = timeObject => {
	axios.post(
'http://127.0.0.1:5000/participant',
	JSON.stringify(timeObject))
	.then(res => {
		if (res.status === 200)
		alert('Participant successfully created')
		else
		Promise.reject()
	})
	.catch(err => alert('Something went wrong'))
}

// Return student form
return(
	<TableForm2 initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize>
	Create Participant
	</TableForm2>
)
}

// Export CreateStudent Component
export default CreateTable
