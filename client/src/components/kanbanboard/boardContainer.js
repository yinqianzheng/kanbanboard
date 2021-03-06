import Board from './board';
import { getCandidates} from "../../actions/candidateActions"
import { connect } from "react-redux";
import Candidate from "../candidate/candidate";

const processCandidateData = (candidates) => {
    const map = {
        applied: [],
        phoneScreen: [],
        onSite: [],
        offered: [],
        accepted: [],
        rejected: []
    };
    candidates.forEach(candidate => {
        map[candidate.process] && map[candidate.process].push({
            id: candidate._id,
            component: <Candidate info={candidate} />
        });
    })
    return map;
}

const mSTP = state => ({
    candidates: processCandidateData(state.candidates)
});

const mDTP = dispatch => ({
    getCandidate: () => dispatch(getCandidates())
});

export default connect(mSTP, mDTP)(Board);