import DndDropBox from "./dndDropBox";
import { updateCandidate } from "../../actions/candidateActions"
import { connect } from "react-redux";



const mDTP = dispatch => ({
    afterDrop: (title, id) => {
        let catagory = title.split(" ").join("");
        catagory = catagory.charAt(0).toLowerCase() + catagory.slice(1);
        dispatch(updateCandidate(id,{process: catagory}))
    }
    
});

export default connect(null, mDTP)(DndDropBox);