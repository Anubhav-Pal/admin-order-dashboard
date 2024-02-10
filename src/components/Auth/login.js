import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()} className="flex items-center justify-center gap-2 w-40">
        <div>
            <FaGoogle/>
        </div>
        <div>
            Log In
        </div>
    </button>;
};

export default LoginButton;