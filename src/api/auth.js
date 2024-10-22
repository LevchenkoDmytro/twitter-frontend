import { instance } from "./helpers/instance";


export const registerUser = async (userInfo) => {
    const { data } = await instance.post('auth/signup', userInfo);
    return data;
};

export const login = async (userInfo) => {        
    const { data } = await instance.post('auth/login', userInfo);
    return data;
};

export const logout = async () => {
    const { data } = await instance.post('auth/logout', userInfo);
    return data;
};

export const userInfo = async () => {
    try {
        console.log('auth');
        
        const { data } = await instance('auth/userInfo');  
        return data;
    } catch (error) {
        console.log(error.response?.data?.error); 
        return null;
    }
};