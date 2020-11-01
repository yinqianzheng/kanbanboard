import React from "react";
import Kanbanboard from "./kanbanboard/boardContainer";
import Modal from "./modal";

export default function Home({email, logout, openModal}){
    
    return(
        <>  
            <Modal/>
            <div>Hello {email.match(/[^@]+/)}</div>
            <button onClick={logout}>Logout</button>
            <button onClick={()=>openModal({type: "recruiterFrom"})}>Add Recruiter</button>
            <button onClick={()=>openModal({type: "candidateForm"})}>Add Candidate</button>
            <Kanbanboard />
        </>
    )
}

