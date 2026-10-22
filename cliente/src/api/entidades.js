import axios from "axios";

const URL =  'http://localhost:8000'
const endpoint = `${URL}/api/entradas`

export const fetchEntradas = () => axios.get(endpoint)

export const fetchEntrada = (id) =>
    axios.get(`${endpoint}/${id}`)

export const createEntrada = (newEntrada) => 
    axios.post(endpoint,newEntrada)

export const updateEntrada = (id,Entrada) =>
    axios.put(`${endpoint}/${id}`,Entrada)

export const deleteEntrada = (id) => 
    axios.delete(`${endpoint}/${id}`)