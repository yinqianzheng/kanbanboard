import React, {useEffect} from "react";
import DndDropBox from "./dndDropBoxContainer";
import "./board.css";

export default function Board({candidates, fetch}){
    useEffect(()=>{
        fetch();
    }, []);

    return(
         <>
            <div className="board flex">
                <DndDropBox title="Applied" items={candidates.applied}/>
                <DndDropBox title="Phone Screen" items={candidates.phoneScreen}/>
                <DndDropBox title="On Site" items={candidates.onSite}/>
                <DndDropBox title="Offered" items={candidates.offered}/>
                <DndDropBox title="Accepted" items={candidates.accepted}/>
                <DndDropBox title="Rejected" items={candidates.rejected}/>
            </div>
        </>
    )
}