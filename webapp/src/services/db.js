import axios from "axios";
const url = "http://192.168.0.104:3002/api/";

const getAllPeople = () => {return axios.get(`${url}people`).then(r => r.data).catch(e => e)}
const addPerson = (p) => {return axios.post(`${url}people`,p).then(r => r.data).catch(e => e)}
const updatePerson = (id, p) => {return axios.put(`${url}people/${id}`,p).then(r => r.data).catch(e => e)}
const deletePerson = (id) => {return axios.delete(`${url}people/${id}`).then(r => r.data).catch(e => e)}

const getAllEvents = () => {return axios.get(`${url}events`).then(r => r.data).catch(e => e)}

export default { getAllPeople, addPerson, updatePerson, deletePerson, getAllEvents }
