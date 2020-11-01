import React from "react";
import "./candidate.css"

export default function Candidate({info}){
    const renderComments = () =>{
        return info.comments.map(c => <div className="comment"><label>{`${c.commentor}: ${c.text}`}</label></div>)
    }

    const calcRating = () => {
        if(info.rating && info.rating.length){
            let sum = 0;
            info.rating.forEach(r => sum+= r.value);
            return sum/info.rating.length;
        }
        return 0;
    }

    return(
        <div className="candidate-info" draggable="false">
            <div><label>Name: {info.name}</label></div>
            <div><label>email: {info.email}</label></div>
            <div><label>Phone Number: {info.phoneNum}</label></div>
            <div><a target="_blank" rel="noopener noreferrer" href={info.resume}>Resume</a></div>
            <div><label>Performance: {calcRating()}</label></div>
            <div>{renderComments()}</div>
        </div>
    )
}