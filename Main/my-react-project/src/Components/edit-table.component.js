// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import TableForm from "./TableForm";

// EditStudent Component
const EditTable = (props) => {
	const { id } = useParams();
const [formValues, setFormValues] = useState({
	name: "",
	email: "",

});

//onSubmit handler
const onSubmit = (timeObject) => {
	axios
	.put(
		"http://127.0.0.1:5000/participant/" +
		id+'/'+timeObject.name+'/'+timeObject.email
	)
	.then((res) => {
		if (res.status === 200) {
		alert("Table successfully updated");

		} else Promise.reject();
	})
	.catch((err) => alert("12Something went wrong"));
};

// Load data from server and reinitialize student form

useEffect(() => {
	axios
	.get(
		"http://127.0.0.1:5000/participant/"
		+ id
	)
	.then((res) => {
		const { name, email } = res.data;
		setFormValues({ name, email });
	})
	.catch((err) => console.log(err));
}, []);

// Return student form
return (
	<TableForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Update Table
	</TableForm>
);
};

// Export EditStudent Component
export default EditTable;
