import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const TableRow = (props) => {

const { id, name, email } = props.obj;
 const deleteStudent = () => {
    axios
      .delete(
"http://127.0.0.1:5000/participant/" + id)
      .then((res) => {
        if (res.status === 200) {
          alert("Participant successfully deleted");
           window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

return (
	<tr>
	<td>{name}</td>
	<td>{email}</td>

	<td>

        <button onClick={deleteStudent}>
          Delete
        </button>
    </td>
       <td>
        <Link className="edit-link"
          to={"/edit-table/" + id}>
          Edit
        </Link>


	</td>
        <td>
        <Link className="view-link"
          to={"/view-table/" + id}>
          View
        </Link>


	</td>
	</tr>
);
};

export default TableRow;
