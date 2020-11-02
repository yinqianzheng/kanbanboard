import React from "react";
import Kanbanboard from "./kanbanboard/boardContainer";
import Modal from "./modal";

export default function Home({email, logout, openModal}){
    
    return(
        <>  
            <Modal/>
            <div className="nav-top">
                <div>Hello {email.match(/[^@]+/)}</div>
                <div>
                    <button className="btn" onClick={()=>openModal({type: "recruiterFrom"})}>Add Recruiter</button>
                    <button className="btn" onClick={logout}>Logout</button>
                </div>
            </div>
            <div className="block kanbanboard-container">
                <button className="form-btn btn" onClick={()=>openModal({type: "candidateForm"})}>Add Candidate</button>
                <Kanbanboard />
            </div>
        </>
    )
}

