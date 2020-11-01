import Home from './home';
import { logout } from "../actions/sessionActions";
import { openModal } from "../actions/modalActions";
import { connect } from "react-redux";

const mSTP = state => ({
    email: state.session.user.email
});

const mDTP = dispatch => ({
    openModal: (info) => dispatch(openModal(info)),
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Home);