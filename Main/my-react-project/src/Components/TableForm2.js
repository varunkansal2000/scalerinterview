import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const TableForm2 = (props) => {
const validationSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	email: Yup.string()
	.email("You have enter an invalid email address")
	.required("Required"),

});
console.log(props);
return (
	<div className="form-wrapper">
	<Formik {...props} validationSchema={validationSchema}>
		<Form>
		<FormGroup>
			Name:
			<Field name="name" type="text" id="name"
				className="form-control" />

		</FormGroup>
		<FormGroup>
			Email:
			<Field name="email" type="text" id="email"
				className="form-control" />
			<ErrorMessage
			name="email"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>


		<button  size="lg"
			 type="submit">
			{props.children}
		</button>
		</Form>
	</Formik>
	</div>
);
};

export default TableForm2;
