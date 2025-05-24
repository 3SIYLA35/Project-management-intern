import axios ,{AxiosRequestConfig,AxiosResponse} from 'axios';
import { error } from 'console';
const API_URL='http://localhost:8000';
const axiosinstance=axios.create({
    baseURL:API_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

axiosinstance.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
    }
    return config;
},
(error)=>Promise.reject(error)

);

axiosinstance.interceptors.response.use(
    (Response)=>Response,
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem('token');
            window.location.href='/login';
        }
        return Promise.reject(error);
    }

)


export const apiClient={
    get:<T>(url:string,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.get(url,config).then((Response:AxiosResponse<T>)=>Response.data);
    },
    post:<T>(url:string,data?:any,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.post(url,data,config).then((Response:AxiosResponse<T>)=>Response.data);
    },
    put:<T>(url:string,data?:any,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.put(url,data,config).then((Response:AxiosResponse<T>)=>Response.data);
    },
    delete:<T>(url:string,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.delete(url,config).then((Response:AxiosResponse<T>)=>Response.data);
    },
    upload:<T>(url:string,formdata:FormData,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.post(url,formdata,{
            ...config,
            headers:{
                ...config?.headers,
            'Content-Type':'multipart/form-data'            }
        }).then((Response:AxiosResponse<T>)=>Response.data);
    }
}
