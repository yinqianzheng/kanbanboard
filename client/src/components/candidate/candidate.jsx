import React from "react";
import "./candidate.css"

export default function Candidate({info}){
    const renderComments = () =>{
        return info.comments.map(c => <div className="comment"><label>{`${c.commentor}: ${c.text}`}</label></div>)
    }

    return(
        <div className="candidate-info" draggable="false">
            <div><label>Name: {info.name}</label></div>
            
            <div><label>email: {info.email}</label></div>
            <div><label>Phone Number: {info.phoneNum}</label></div>
            <div><a target="_blank" rel="noopener noreferrer" href={info.resume}>Resume</a></div>
            <div><label>Performance: {info.rating}</label></div>
            <div>{renderComments()}</div>
        </div>
    )
}