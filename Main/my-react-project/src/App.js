// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
		from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes,
	Route, Link } from "react-router-dom";

// Import other React Component
import CreateTable from
	"./Components/create-table.component";
import EditTable from
	"./Components/edit-table.component";
import TableList from
	"./Components/table-list.component";
import ViewList from
	"./Components/view-table.component";
import EditList from
	"./Components/edit-table2.component";
import CreateIntTable from
		"./Components/create-inttable.component"
// App Component
const App = () => {
return (

	<Router>

	<div className="App">



			<Container>

				<span id="abcd1">
				<Link to={"/create-table"}
					className="nav-link">
					Add Particiant
				</Link>
			</span>


				<Link to={"/table-list"}
					className="nav-link">
					Participant List
				</Link>


			</Container>



		<Container>
		<Row>
			<Col md={12}>
			<div className="wrapper">
				<Routes>
					 <Route exact path="/"
                    element={<CreateTable/>} />
				<Route path="/create-table"
					element={<CreateTable/>} />
				<Route path="/edit-table/:id"
					element={<EditTable/>} />
				<Route path="/table-list"
					element={<TableList/>} />
					<Route path="/view-table/:id"
					element={<ViewList/>} />
					<Route path="/edit-table2/:id"
					element={<EditList/>} />
					<Route path="/create-inttable/:id"
						   element={<CreateIntTable/>}/>
				</Routes>
			</div>
			</Col>
		</Row>
		</Container>
	</div>
	</Router>
);
};

export default App;
