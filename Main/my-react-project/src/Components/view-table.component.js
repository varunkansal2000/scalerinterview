import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TableRow2 from "./TableRow2";
import {Link, useParams} from "react-router-dom";

const TableList2 = () => {
const [times, setTimes] = useState([]);
const { id } = useParams();
useEffect(() => {
	axios
	.get("http://127.0.0.1:5000/interviewtt/"+id)
	.then(({ data }) => {
		setTimes(data);
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const DataTable = () => {
	return times.map((res, i) => {
	return <TableRow2 obj={res} key={i} />;
	});
};

return (

	<div className="table-wrapper">
	<Link to={"/create-inttable/"+id}
					className="nav-link">
					Add Interview
	</Link>
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>stime</th>
			<th>etime</th>
			<th>date</th>
			<th>Delete</th>
			<th>Edit</th>

		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>


	</div>
);
};

export default TableList2;
