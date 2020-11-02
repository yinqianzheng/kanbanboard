import React from "react";
import { connect } from 'react-redux';
import { addCandidate } from "../../actions/candidateActions";
import { clearErrors } from "../../actions/sessionActions"

class CandidateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phoneNum: "",
      resume: null,
      errors: {}
    };
    this.handleAddCandidate = this.handleAddCandidate.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  onFileChange = e => {   
    if( e.target.files.length){
      this.setState({ resume: e.target.files[0] }); 
    }   
  }; 

  fileData = () => { 
    if (this.state.resume) { 
      return ( 
        <div> 
          <h4>Resume Details:</h4> 
          <p>File Name: {this.state.resume.name}</p> 
          <p> 
            Last Modified:{" "} 
            {this.state.resume.lastModifiedDate.toDateString()} 
          </p> 
        </div> 
      ); 
    } else { 
      return null;
    } 
  }; 

  handleAddCandidate(e) {
    const { email, name, phoneNum, resume} = this.state;
    e.preventDefault();
    const formData = new FormData(); 
    formData.append("resume", resume); 
    formData.append("email", email); 
    formData.append("name", name); 
    formData.append("phoneNum", phoneNum); 
    
    this.props.clearErrors();
    this.props.addCandidate(formData);
  }

  // handleAddCandidate(e) {
  //   let { email, name, phoneNum, resume} = this.state;
  //   e.preventDefault();
  //   this.props.clearErrors();
  //   this.props.addCandidate({ email, name, phoneNum, resume });
  // }



  showErrors() {
    if (this.props.errors && this.props.errors.message) {
      return (
        <ul className="session-errors-ul">
            {Object.values(this.props.errors.response.data).map((error, idx) => <li className="session-errors-li" key={idx}>{error}</li>)}
        </ul>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="candidate-form">
          <div className="session-input-fields">
            <label>
              Name:
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Name"
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                value={this.state.phoneNum}
                onChange={this.update("phoneNum")}
                placeholder="Phone Number"
              />
            </label>
          </div>
          <div> 
            <label>
              Resume:
              <input type="file" onChange={this.onFileChange} /> 
            </label>
          </div> 
          {this.fileData()} 
          {this.showErrors()}
          <div className="session-button">
            <button className="submit-button" onClick={this.handleAddCandidate}>
              Add
            </button>
          </div>
      </div>
    );
  }
}

const mSTP = state => ({
  errors: state.errors.session
})

const mDTP = dispatch => ({
    addCandidate: user => dispatch(addCandidate(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(CandidateForm)