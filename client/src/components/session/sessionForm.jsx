import React from "react";
import "./session.css";

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
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
      <div className="session-main">
          <div className="form-title">{this.props.type === "Add"? "Add Recruiter" : this.props.type}</div>
          <div className="session-input-fields">
            <label>
              Email:
              <input
                type="email"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            </label>
          </div>
          {this.showErrors()}
          <div className="session-button">
            <button className="submit-button" onClick={this.handleSubmit}>
              {this.props.type}
            </button>
          </div>
      </div>
    );
  }
}