import axios ,{AxiosRequestConfig,AxiosResponse, AxiosError} from 'axios';
import { error } from 'console';
const API_URL='http://localhost:8000';
const axiosinstance=axios.create({
    baseURL:API_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

// helper function to extract error details
export const extractErrorDetails = (error: any): { 
    message: string, 
    context?: string,
    statusCode?: number,
    originalError?: any
}=>{
    // If it's an Axios error
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log('Axios Error Response:', axiosError.response?.data);
        
        // Check for server response with error details
        if (axiosError.response?.data) {
            const errorData = axiosError.response.data as any;
            return {
                message: errorData.message || 'An error occurred',
                context: errorData.context,
                statusCode: axiosError.response.status,
                originalError: errorData.error || errorData
            };
        }
        
        // If response exists but doesn't have data.message
        if (axiosError.response) {
            return {
                message: `Server Error: ${axiosError.response.statusText}`,
                statusCode: axiosError.response.status
            };
        }
        
        // If no response (network error)
        return {
            message: 'Network error: Could not connect to server',
            context: 'network'
        };
    }
    
    // Fallback for non-Axios errors
    return {
        message: error.message || 'An unknown error occurred'
    };
};

axiosinstance.interceptors.request.use((config)=>{
    const data=typeof config.data!=='undefined'
     && config.data instanceof FormData;
     if(data){
        if(config.headers){
            delete config.headers['Content-Type'];
        }
     }
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
        if (error.response?.data?.message){
            error.message=error.response.data.message;
        }
        return Promise.reject(error);
    }

)


export const apiClient={
    get:<T>(url:string,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.get(url,config)
            .then((response:AxiosResponse<T>)=> response.data)
            .catch(error => {
                console.error("GET request error:", error.message);
                throw error;
            });
    },
    post:<T>(url:string,data?:any,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.post(url,data,config)
            .then((response:AxiosResponse<T>)=> response.data)
            .catch(error => {
                console.error("POST request error:", error.message);
                throw error;
            });
    },
    put:<T>(url:string,data?:any,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.put(url,data,config)
            .then((response:AxiosResponse<T>)=> response.data)
            .catch(error => {
                console.error("PUT request error:", error.message);
                throw error;
            });
    },
    delete:<T>(url:string,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.delete(url,config)
            .then((response:AxiosResponse<T>)=> response.data)
            .catch(error => {
                console.error("DELETE request error:", error.message);
                throw error;
            });
    },
    upload:<T>(url:string,formdata:FormData,config?:AxiosRequestConfig):Promise<T>=>{
        return axiosinstance.post(url,formdata,{
            ...config,
            headers:{
                ...config?.headers,
            'Content-Type':'multipart/form-data'            }
        })
        .then((response:AxiosResponse<T>)=> response.data)
        .catch(error => {
            console.error("UPLOAD request error:", error.message);
            throw error;
        });
    }
}
