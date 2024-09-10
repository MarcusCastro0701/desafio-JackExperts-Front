import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_END_URL;

function CreateSession(body) {
    return axios.post(`${BASE_URL}/auth/sign-in`, body);
}

function CreateUser(body) {
    return axios.post(`${BASE_URL}/auth/sign-up`, body);
}

function LogoutSession(token) {
    return axios.delete(`${BASE_URL}/auth/logout`, {headers: { Authorization: `Bearer ${token}`}});
}

function insertTask(token, body, userId) {
    return axios.post(`${BASE_URL}/task`, body, {headers : {Authorization: `Bearer ${token}`}} )
}

function getTasksByUserId(token, userId) {
    return axios.get(`${BASE_URL}/task`, {headers : {Authorization: `Bearer ${token}`}} )
}

function deleteTaskById(taskId, token){
    return axios.delete(`${BASE_URL}/task/${taskId}`, {headers : {Authorization: `Bearer ${token}`}} )
}

function setCheckedTrue(taskId, token){
    return axios.put(`${BASE_URL}/task/check/${taskId}`, {}, {headers : {Authorization: `Bearer ${token}`}} )
}

function setNewData(taskId, body, token){
    return axios.put(`${BASE_URL}/task/data/${taskId}`, body, {headers : {Authorization: `Bearer ${token}`}} )
}


const api = {
    CreateSession,
    LogoutSession,
    CreateUser,
    insertTask,
    getTasksByUserId,
    deleteTaskById,
    setCheckedTrue,
    setNewData
};

export default api;
