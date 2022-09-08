// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import TableForm3 from "./TableForm3";

// EditStudent Component
const EditTable = (props) => {
	const { id } = useParams();
const [formValues, setFormValues] = useState({
	date: "",
	etime: "",
	stime: ""
});

//onSubmit handler
const onSubmit = (timeObject) => {
	if(timeObject.etime<=timeObject.stime)
		alert('please add a valid time')
	else {
		axios
			.put(
				"http://127.0.0.1:5000/participanttime/" +
				id + '/' + timeObject.date + '/' + timeObject.etime + '/' + timeObject.stime
			)
			.then((res) => {
				if (res.status === 200) {
					alert("Table successfully updated");

				} else Promise.reject();
			})
			.catch((err) => alert("12Something went wrong"));
	}
};

// Load data from server and reinitialize student form

useEffect(() => {
	axios
	.get(
		"http://127.0.0.1:5000/interviewt/" + id
	)
	.then((res) => {

		const {etime , date, stime} = res.data;

		setFormValues({ date, etime ,stime});
	})
	.catch((err) => console.log(err));
}, []);


// Return student form
return (
<div className="form-wrapper">

	<TableForm3
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Update Table
	</TableForm3>
</div>
);
};

// Export EditStudent Component
export default EditTable;
