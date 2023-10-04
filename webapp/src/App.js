import React from "react";
import { useState, useEffect} from "react";
import dbServices from "./services/db";
import "./index.css";

const App = () => {
	const [people, setPeople] = useState([]);
	const [events, setEvents] = useState([]);

	const [note, setNote] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [user, setUser] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [curTab, setCurTab] = useState(0);

	useEffect(() => {dbServices.getAllPeople().then(p => setPeople(p)).catch(console.log("no server"))}, []);
	useEffect(() => {dbServices.getAllEvents().then(e => setEvents(e)).catch(console.log("no server"))}, []);

	useEffect(() => {
		if(localStorage.getItem("user") != null && localStorage.getItem("user") != "null"){
			setUser(localStorage.getItem("user"));
			setLoggedIn(true);
			console.log(localStorage.getItem("user"));
		}
	},[]);

	const getHighestId = (arr) => {
		var highest = 0;
		arr.forEach(p => {if(p.id > highest){highest = p.id}})
		return highest;
	}

	const getIDOfUser = () => {let id = -1; people.forEach(p => {if(p.name.toLowerCase() == user.toLowerCase())id = p.id;}); return id;}

	const handleLogin = () => {
		var inPeople = false;
		people.forEach(p => {if(p.name.toLowerCase() == user.toLowerCase()){inPeople = true;}});
		if (!inPeople){
			if(window.confirm(`${user} isn't registered in the house, would you like to add them?`)){
			const newPerson = {"name": user, "home": true}
			console.log(newPerson);
			dbServices.addPerson(newPerson);
			localStorage.setItem("user",user);
			setLoggedIn(true);
			let newPeople = [...people];
			newPeople.push({...newPerson, id: (getHighestId(people) + 1)})
			setPeople(newPeople)
			}		
		} else {
			localStorage.setItem("user", user);
			setLoggedIn(true);
		}

	}
	
	const logOut = () => {localStorage.setItem("user",null); setLoggedIn(false);}

	const deleteUser = () => {
		if(window.confirm(`Are you sure you would like to delete ${user}?`)){
			dbServices.deletePerson(getIDOfUser());
			let newPeople = [...people];
			newPeople.filter(p => p.name.toLowerCase() != user.toLowerCase());
			localStorage.setItem("user","null");
			setUser("");
			setLoggedIn(false);
			setPeople(newPeople);
			refresh();
		}
	}

	const handleUserChange = (e) => setUser(e.target.value);
	const handleNoteChange = (e) => setNote(e.target.value);

	const handleNote = () => {
		if(note.length <= 75){
			let person = people.find(p => p.name.toLowerCase() == user.toLowerCase());
			person.note = note;
			dbServices.updatePerson(person.id, person);
			let newPeople = [...people];
			newPeople.forEach(p => {if(p.id == person.id){p.note = note}});
			setPeople(newPeople);
			setNote("");
		} else setErrorMsg("Note can't be longer than 75 characters")
	}

	const refresh = () => dbServices.getAllPeople().then(p => setPeople(p));

	const changeTab = (e) => {
		setCurTab(e.target.id);}

	const toggle = () => {
		let curId = -1;
		let curIn = false;
		let curNote = "";
		people.forEach(p => {if(p.name.toLowerCase() == user.toLowerCase()){curId = p.id;curNote = p.note; curIn = !p.home}});
		dbServices.updatePerson(curId, {name: user.toLowerCase(), home:curIn,note:curNote, id:curId});
		let newPeople = [...people];
		newPeople.forEach(p => {if(p.id == curId){p.home = !p.home}});
		setPeople(newPeople);
	}

	const style0 = {backgroundColor: curTab == 0 ? "#3e8e41" : "#04AA6D" }
        const style1 = {backgroundColor: curTab == 1 ? "#3e8e41" : "#04AA6D" }
        const style2 = {backgroundColor: curTab == 2 ? "#3e8e41" : "#04AA6D" }
        const style3 = {backgroundColor: curTab == 3 ? "#3e8e41" : "#04AA6D" }

	return (
		<div className="wrapper">
			<div className="header">
  				<h1>111 Beeston Road</h1>
  				<p>House Manager</p>
			</div>

			<div className="btn-group">
			<button style = {style0} id = "0" onClick = {changeTab}>Home</button>
			<button style = {style1} id = "1" onClick = {changeTab}>Events</button>
			<button style = {style2} id = "2" onClick = {changeTab}>Chores</button>
			<button style = {style3} id = "3" onClick = {changeTab}>Account</button>
			</div>
			{curTab == 3 ?(<div className="buttons">
				<h2>Account Settings</h2>
				{loggedIn ? <h3>Logged in as <b>{user}</b></h3> : <h3>You are <b>not</b> currently logged in</h3>}
				{loggedIn ? <div></div>:<div>User: <input value = {user} onChange = {handleUserChange}/><button onClick={handleLogin}>Login</button></div>}
				{loggedIn ? <button onClick={deleteUser}>Delete user</button> : <div></div>}
				{loggedIn ? <button onClick = {logOut}>Logout</button> : <div></div>}
			</div>) : <div></div>}
			<span className="error">{errorMsg}</span>
			{ curTab == 0 ? <div>
			<h1> Who's in the house?</h1>
			<div className="container">
				<table><tbody>
				{people.map(p =>
					<tr key = {p.name}>
					<td className = "name">{p.name.toUpperCase()}</td>
					<td>
					{loggedIn && p.name.toLowerCase() == user.toLowerCase() ? <Light on = {p.home} toggle = {toggle} /> : <Light on = {p.home}/>}
					</td>
					<td>  {p.note == "" ? "" : '"'}{p.note}{p.note == "" ? "" : '"'}</td>
					</tr>
				)}
				</tbody>
				</table>
				{loggedIn ? <div><br/><input value = {note} onChange = {handleNoteChange}/> {75 - note.length}<br/><button onClick = {handleNote}>Update note</button><br/><br/></div> : <div></div>}

				<button onClick={refresh}>Refresh</button> 
			</div> 
			</div> : <div></div> }
			{curTab == 1 ? <div>
			<h1>Upcoming events:</h1>
			<ul>
			{events.map(e => <li>{e.date}: <b>{e.title}</b> @ {e.time}</li>)}
			</ul>
			</div> : <div></div>}
			{curTab == 2 ?
			<div>
			<h1> Chores: </h1>
			</div> : <div></div>}
		</div>
	)
}

const DateDisplay = () => {
	const d = new Date();
	return (<h1>{d.toLocaleDateString('en-GB')}</h1>)
}

const Light = ({on, toggle}) => {
  const styling = {backgroundColor: on ? "green": "red"}
  return(<span onClick = {toggle} className = "dot" style = {styling}></span>)
}

export default App
