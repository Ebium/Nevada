import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { socket } from '../socket-context';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(()=>{
        getServerReponse()
    }, []);

    function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        socket.emit("Login an user", {email : email ,password : password, socketId : socket.id})
    }

    function handleChangeEmail(event:ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value.toLowerCase())
    }

    function handleChangePassword(event:ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function getServerReponse(){
        socket.on("Login an user", (result,isConnected)=> {
            if(isConnected)
                // TODO: UPDATE REDIRECTION URL
                window.location.href = "http://localhost:3000/nevada/home";
            else
                showErrors(result)
        })
    }

    function showErrors(result:any) {
        alert(result)
    }

    return (
        <form onSubmit={handleSubmit}> 
            <label>
                E-mail :
                {/* TODO : verify email pattern */}
                <input type="email" value={email} onChange={handleChangeEmail} placeholder="mail@example.com" required/>
                
            </label>
            <label>
                Password : 
                {/* TODO : verify/validate password */}
                <input type="password" value={password} onChange={handleChangePassword} required/>
            </label>
            <input type="submit" value="Login"/>
        </form>
    );
};

export default Login;