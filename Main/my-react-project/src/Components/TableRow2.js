 import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const TableRow2 = (props) => {

const { id, stime, etime, date } = props.obj;

const deleteRecord = () => {
    axios
      .delete(
"http://127.0.0.1:5000/interviewtt/" + id)
      .then((res) => {
        if (res.status === 200) {
          alert("Participant successfully deleted");
          window.location.replace('http://localhost:3000/table-list')
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

return (
	<tr>
	<td>{stime}</td>
	<td>{etime}</td>
        <td>{date}</td>

        <td>
             <button onClick={deleteRecord}>
          Delete
        </button>

        </td>
       <td>
        <Link className="edit-link"
          to={"/edit-table2/" + id}>
          Edit
        </Link>
	</td>

	</tr>
);
};

export default TableRow2;
