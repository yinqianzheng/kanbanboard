import React from "react";
import AddUserForm from "../session/addUserFormContainer";

export default function Board({email, logout}){
    return(
        <>
            <div>Hello {email.match(/[^@]+/)}</div>
            <button onClick={logout}>Logout</button>
            <AddUserForm />
        </>
    )
}