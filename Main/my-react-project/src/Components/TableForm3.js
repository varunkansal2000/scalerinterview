import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

const TableForm3 = (props) => {
const validationSchema = Yup.object().shape({
	etime: Yup.string().required("Required"),
	stime: Yup.string()
	.required("Required"),
	date: Yup.string()
	.required("Required"),
});
console.log(props);
return (

	<Formik {...props} validationSchema={validationSchema}>
		<Form>

		<FormGroup>
			Stime:&nbsp;&nbsp;&nbsp;&nbsp;
			<Field name="stime" type="text"
				className="form-control" />

		</FormGroup>
			<FormGroup>
			Etime:&nbsp;&nbsp;&nbsp;&nbsp;
			<Field name="etime" type="text"
				className="form-control" />

		</FormGroup>
			<FormGroup>
				Date:&nbsp;&nbsp;&nbsp;&nbsp;
			<Field name="date" type="text"
				className="form-control" />

		</FormGroup>
		<button size="lg"
			 type="submit">
			{props.children}
		</button>
		</Form>
	</Formik>

);
};

export default TableForm3;
