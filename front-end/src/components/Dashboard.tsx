import { useEffect } from "react"
import {useLocation,useNavigate} from 'react-router-dom'

export default function Dashboard(){
    const location=useLocation();
    const queryparams=new URLSearchParams(location.search);
    const isloginSucces=queryparams.get('login')==='success';

    return (
        <div>
            <h1>Dashboard</h1>
            {isloginSucces && <p> Login successful! </p>}
        </div>
    )
}