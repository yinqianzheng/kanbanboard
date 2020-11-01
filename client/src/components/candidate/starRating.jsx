import React from "react";
import "./starRating.css"

export default function StarRating({rate, updateRating}){
    const renderRating = () => {
        const arr = [5,4,3,2,1];
        return arr.map(v => {
            if(v === Math.round(rate)){
                return <>
                    <input type="radio" id={`star${v}`} name="rate" value={v} checked onClick={(e) => updateRating(v)}/>
                    <label htmlFor={`star${v}`} title="text">{`${v} stars`}</label>
                </>
            }else{
                return <>
                    <input type="radio" id={`star${v}`} name="rate" value={v} onClick={(e) => updateRating(v)}/>
                    <label htmlFor={`star${v}`} title="text">{`${v} stars`}</label>
                </>
            }
        })
    }

    return (
        <div className="rate">
            {renderRating()}
        </div>
    )
}