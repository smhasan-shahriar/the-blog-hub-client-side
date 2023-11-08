import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                    .then(() => { 
                        toast('Wrong token credentials. Please Log in again')
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
        })
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;