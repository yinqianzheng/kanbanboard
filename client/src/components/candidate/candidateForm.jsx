import React from "react";

export default class SessionForm extends React.Component {
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

  handleAddCandidate(e) {
    let { email, password } = this.state;
    e.preventDefault();
    this.props.clearErrors();
    this.props.submitForm({ email, password });
  }

  showErrors() {
    if (this.props.errors.message) {
      return (
        <ul className="session-errors-ul">
            {Object.values(this.props.errors.response.data).map((error, idx) => <li className="session-errors-li" key={idx}>{error}</li>)}
        </ul>
      );
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
          <div className="session-button">
            <button className="submit-button" onClick={this.handleAddCandidate}>
              {this.props.type}
            </button>
          </div>
      </div>
    );
  }
}