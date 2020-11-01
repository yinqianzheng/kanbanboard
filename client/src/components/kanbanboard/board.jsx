import React, {useEffect, useState} from "react";
import AddUserForm from "../session/addUserFormContainer";
import DndDropBox from "./dndDropBox";
import "./board.css";
import Candidate from "../candidate/candidate";


const candidate1 = {
    id:"1",
    name: "yin", 
    email: "yin@gmail.com", 
    phoneNum: "123456789", 
    resume: "https://www.youtube.com", 
    rating: 5,
    comments: [{commentor: "a", text: "good"}, {commentor: "b", text: "good"}]
}

const candidate2 = {
    id:"2",
    name: "yin2", 
    email: "yin2@gmail.com", 
    phoneNum: "123456789", 
    resume: "wwww.youtube.com", 
    rating: 5,
    comments: [{commentor: "a", text: "good"}]
}

const cs = [candidate1, candidate2];

export default function Board({email, logout}){

    const [candidates, setCandidates] = useState({});

    useEffect(()=>{
    setCandidates({applied: cs.map(c => ({ id: c.id, component: <Candidate info={c}/> }))});
    }, []);

    return(
         <>
            <div>Hello {email.match(/[^@]+/)}</div>
            <button onClick={logout}>Logout</button>
            <AddUserForm />
       
            <div className="board flex">
                <DndDropBox title="Applied" items={candidates.applied}/>
                <DndDropBox title="Phone Screen" items={candidates.phoneScreen}/>
                <DndDropBox title="On site" items={candidates.onSite}/>
                <DndDropBox title="Offered" items={candidates.offered}/>
                <DndDropBox title="Accepted" items={candidates.accepted}/>
                <DndDropBox title="Rejected" items={candidates.rejected}/>
            </div>
        </>
    )
}