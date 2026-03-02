// API layer/service for authentication-related operations

import axios from 'axios';

const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
        withCredentials:true
})

export async function register({username,email,password}){

        try {
                const response = await axiosInstance.post(
                        '/api/auth/register', 
                        {username,email,password}
                )
                return response.data
        } catch (error) {
                throw error
        }
}
export async function login({email,password}){

        try {
                const response = await axiosInstance.post(
                        '/api/auth/login', 
                        {email,password}
                )
                return response.data
        } catch (error) {
                throw error
        }
}

export async function logout(){

        try {
                const response = await axiosInstance.get('/api/auth/logout')
                return response.data
        } catch (error) {
                throw error
        }
}
export async function getMyProfile(){

        try {
                const response = await axiosInstance.get( '/api/auth/me')
                return response.data
        } catch (error) {
                throw error
        }
}