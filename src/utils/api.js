import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const login = async (data) => {
    return await api.post('auth/login', data);
};

export const signup = async (data) => {
    return await api.post('auth/register', data);
};

export const createPost = async (data, token) => {
    return await api.post('posts/create', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const editPost = async (id, data, token) => {
    return await api.put(`posts/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deletePost = async (id, token) => {
    return await api.delete(`posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getallPost = async () => {
    return await api.get(`posts/`);
};

export const getSinglePost = async (id) => {
    return await api.get(`posts/${id}`);
};

export const createComment = async (data, token) => {
    return await api.post('comments/create', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getallComment = async () => {
    return await api.get(`comments/`);
};

export const getSingleComment = async (id) => {
    return await api.get(`comments/${id}`);
};

export const editComment = async (id, data, token) => {
    return await api.put(`comments/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteComment = async (id, token) => {
    return await api.delete(`comments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getPostAllComment = async (id) => {
    return await api.get(`comments/post/${id}`);
};