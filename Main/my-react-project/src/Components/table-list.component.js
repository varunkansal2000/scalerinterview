import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TableRow from "./TableRow";
import "../App.css";

const TableList = () => {
const [times, setTimes] = useState([]);

useEffect(() => {
	axios
	.get("http://127.0.0.1:5000/participant")
	.then(({ data }) => {
		setTimes(data);

	})
	.catch((error) => {
		alert('please add more data');
		console.log(error);
	});

}, []);

const DataTable = () => {
	return times.map((res, i) => {
	return <TableRow obj={res} key={i} />;
	});
};

return (
	<div className="table-wrapper">
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Delete</th>
			<th>Edit_Participant</th>
			<th>See_interview</th>
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
);
};

export default TableList;
