import React from "react";
import Kanbanboard from "./kanbanboard/boardContainer";
import AddUserForm from "./session/addUserFormContainer";
import CandidateForm from "./candidate/candidateForm";

export default function Home({email, logout}){
    
    return(
        <>  
            <div>Hello {email.match(/[^@]+/)}</div>
            <button onClick={logout}>Logout</button>
            <AddUserForm />
            <Kanbanboard />

            <CandidateForm />
        </>
    )
}