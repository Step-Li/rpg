import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import { auth } from "../../api/api";

import { useHistory } from "react-router-dom";

import './AuthorizationPanel.scss';

export function AuthorizationPanel() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const authorize = async () => {
        const authData = await auth(login, password);
        if (authData.access_token) {
            document.cookie = `access_token=${authData.access_token}`;
            history.push("/archive");
        }
    }

    return (
        <form className="AuthForm">
            <TextField
                id="login"
                label="Login"
                value={login}
                variant="outlined"
                name="login"
                onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
                type="password"
                id="password"
                label="Password"
                value={password}
                variant="outlined"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outlined" onClick={authorize}>Войти</Button>
        </form>
    );
}