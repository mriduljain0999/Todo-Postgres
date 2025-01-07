import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./queries";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const signup = useSignup();

    function handleSignup() {
        const data = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
        }
        signup.mutate(data);
        navigate('/landing');
    }

    return (
        <div>
            <input ref={usernameRef} type="text" placeholder="Enter username" />
            <input ref={passwordRef} type="text" placeholder="Enter password" />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
