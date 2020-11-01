import React from "react";
import "./dndDraggable.css"

export default function Draggable({id, draggableComponent}){
    const drag = (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text", e.target.id);   
    }
    return(
        <div id={id} className="dnd-draggable" draggable="true" onDragStart = {drag}>
            {draggableComponent}
        </div>
    )
}