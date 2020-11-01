import React, {useState, useRef} from "react";
import { connect } from "react-redux";
import {updateCandidate} from "../../actions/candidateActions"
import StarRating from "./starRating";
import "./candidate.css"

function InfoBox({info, email, update}){
    const [comment, setComment] = useState("");
    const commentRef = useRef();

    const renderComments = () =>{
        if(info.comments.length){
            return <ul className="comment-list">
                {info.comments.map((c, idx) => <li className="comment" key={idx}>{`${c.commenter}: ${c.text}`}</li>)}
            </ul>
             
        }
        return "0 comments."
    }

    const calcRating = () => {
        if(info.rating && info.rating.length){
            let sum = 0;
            info.rating.forEach(r => sum+= r.value);
            return sum/info.rating.length;
        }
        return 0;
    }

    const handleRating = (rating) => {
        const data = {rating: [{provider: email.match(/[^@]+/)[0], value: rating}]};
        update(info._id, data);
    }

    const submitComment = () => {
        const data = {
            type: "comment",
            comment:{
                commenter: email.match(/[^@]+/)[0], 
                text: comment
            }
        }
        update(info._id, data);
        setComment("");
    }

    const handleWriteComment = (e) => {
        setComment(e.currentTarget.value);
    }

    const rating = calcRating();
    return(
        <div className="detail-container">
            <div className="candidate-detail" >
                <div><label>Name: {info.name}</label></div>
                <div><label>email: {info.email}</label></div>
                <div><label>Phone Number: {info.phoneNum}</label></div>
                <div><a target="_blank" rel="noreferrer" href={info.resume}>Resume</a></div>
                <div><label>Average Rating: {`${rating} (${info.rating.length} votes)`}</label></div>
                <div><StarRating rate={rating} updateRating={handleRating} /></div>
                
            </div>
            <div className="comment-content">
                <div>Comments:</div>
                {renderComments()}
            </div>
            <div>
                <textarea rows={10} cols={30} value={comment} ref={commentRef} onInput={handleWriteComment}/>
                <br/>
                <button className="comment-btn" onClick={submitComment}>Add Comment</button>
            </div>
        </div>
    )
}


const mSTP = state => ({
    info: state.candidates.find(c => c._id === state.modal.id),
    email: state.session.user.email
});

const mDTP = dispatch => ({
    update: (id, data) => dispatch(updateCandidate(id, data)) 
});

export default connect(mSTP, mDTP)(InfoBox);