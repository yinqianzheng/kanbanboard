import React from "react";
import "./dndDropBox.css"
import Draggable from "./dndDraggable";

export default function DndDropBox({title, items, afterDrop}){
    const allowDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
      
    const drop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var data = e.dataTransfer.getData("text"); 
        const selectedEle = document.getElementById(data);
        if(selectedEle && selectedEle.draggable){
            if(e.target.classList.contains("dnd-drop-container")){
                e.target.appendChild(selectedEle);
            }else{
                let target = e.target;
                while(!target.draggable){
                    target = target.parentNode;
                }
                target.parentNode.insertBefore(selectedEle, target); 
            }
            afterDrop && afterDrop(title, selectedEle.id);
        }
    }

    const renderItems = () => {
        if(items){
            return items.map(item => <Draggable id={item.id} key={item.id} draggableComponent={item.component}/>)
        }
    }

    return(
        <div className="dnd-drop-box">
            <div className="dnd-title">{title}</div>
            <div className="dnd-drop-container" onDrop={drop} onDragOver={allowDrop}>
                {renderItems()}
            </div>
        </div>
    )
}
