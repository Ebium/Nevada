import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { socket } from '../socket-context';

const SignUp = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [pseudonym, setPseudonym] = useState("");

    useEffect(()=>{
        getServerReponse()
    }, []);

    function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        socket.emit("Register a new user", {email : email ,password : password, pseudo:pseudonym})
    }

    function handleChangeEmail(event:ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handleChangePassword(event:ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleChangePseudonym(event:ChangeEvent<HTMLInputElement>) {
        setPseudonym(event.target.value)
    }

    function getServerReponse(){
        socket.on("Register a new user", (result,isCreated)=> {
            if(isCreated)
                // TODO: UPDATE REDIRECTION URL
                window.location.href = "http://localhost:3000/nevada/home";
            else{
                var errors = result.errors.email+"\n"+result.errors.pseudo;
                alert(errors)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}> 
            <label>
                E-mail :
                {/* TODO : verify email pattern */}
                <input type="email" value={email} onChange={handleChangeEmail} placeholder="mail@example.com" required/>
                
            </label>
            <label>
                Mot de passe : 
                {/* TODO : verify/validate password */}
                <input type="password" value={password} onChange={handleChangePassword} required/>
            </label>
            <label>
                Pseudo :
                <input type="text" value={pseudonym} onChange={handleChangePseudonym} required/>
            </label>
            <input type="submit" value="S'inscrire"/>
        </form>
    );
};

export default SignUp;