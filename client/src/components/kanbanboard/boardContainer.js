import Board from './board';
import { logout } from "../../actions/sessionActions";
import { connect } from "react-redux";

const mSTP = state => ({
    email: state.session.user.email
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Board);