// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import TableForm3 from "./TableForm3";
import {Link, useParams} from "react-router-dom";

// CreateStudent Component
const CreateTable = () => {
	const { id } = useParams();
const [formValues, setFormValues] =
	useState({ etime: '', stime: '',date:' ' })
// onSubmit handler
const onSubmit = timeObject => {
	if(timeObject.etime<=timeObject.stime)
		alert('please add a valid time')
	else {
		axios.post(
			'http://127.0.0.1:5000/interviewadd/' + id + '/' + timeObject.etime + '/' + timeObject.stime + '/' + timeObject.date
		)
			.then(res => {
				if (res.status === 200)
					alert('Intervview successfully created')
				else
					Promise.reject()
			})
			.catch(err => alert('The interview cannot be placed'))
	}
}

// Return student form
return(
<div className="form-wrapper">
		<Link to={"/view-table/"+id}
					className="nav-link">
					View Table
	</Link>
	<TableForm3 initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize>
	Add Interview
	</TableForm3>
</div>
)
}

// Export CreateStudent Component
export default CreateTable
