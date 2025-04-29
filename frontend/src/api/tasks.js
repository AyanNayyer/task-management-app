import axios from 'axios';
const API = 'http://127.0.0.1:5000/api/tasks';

const getToken = () => localStorage.getItem('token');

const statusMap = {
  All: 'All',
  Active: 'incomplete',
  Completed: 'complete'
};

export const fetchTasks = (status = 'All') => {
  const mappedStatus = statusMap[status] || 'All';
  return axios.get(`${API}?status=${mappedStatus}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(res => res.data);
};

export const addTask = data =>
  axios.post(API, data, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(res => res.data);

export const updateTask = (id, data) =>
  axios.patch(`${API}/${id}`, data, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(res => res.data);

export const deleteTask = id =>
  axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(res => res.data);
