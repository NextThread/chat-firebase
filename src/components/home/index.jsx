import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../store/action/auth";

import "./style.scss";

import Profile from "../common/profile";
import MessageBox from "../common/messageBox";
import HandWriting from "../common/handWriting";
import Message from "../common/message";
import IsTyping from "../common/isTyping";
import NewMessage from "../common/newMessage";
import People from "../common/people";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: false,
      visible: "newMessage"
    };
  }

  handelToggleMenu = () => {
    const { isMenu } = this.state;
    this.setState(perState => ({ ...perState, isMenu: !isMenu }));
  };
  // Responsive
  isUnder850px = () => {
    if (window.innerWidth > 850) {
      this.setState(perState => ({ ...perState, isMenu: false }));
    } else {
      this.setState(perState => ({ ...perState, isMenu: true }));
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.isUnder850px);
    this.props.getUser();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.isUnder850px);
  }

  handleChangeNav = pram => {
    this.setState({ visible: pram });
  };

  render() {
    const { isMenu, visible } = this.state;
    const user = this.props.user !== null ? this.props.user : {};

    return (
      <div className="home">
        <div className="flex-container">
          <div className="item">
            <div className="flex-container">
              {/* Header */}
              <div className="item">
                <h2>
                  <HandWriting delay="400" text="CONNECT." speed="1000" />
                </h2>
                <span onClick={this.handelToggleMenu}>
                  <i className="fas fa-ellipsis-h " />
                </span>
              </div>
              {/* Profile */}
              <div className={`item ${isMenu ? "d-none" : ""}`}>
                <Profile
                  shortName={true}
                  style={{ padding: "10px" }}
                  username={user.fullname}
                  image={user.image}
                />
              </div>
              <div className={`item ${isMenu ? "d-none" : ""}`}>
                <hr />
              </div>
              <div className={`item ${isMenu ? "d-none" : ""}`}>
                <div className="flex-container">
                  <div
                    onClick={() => this.handleChangeNav("newMessage")}
                    className={`item ${
                      visible === "newMessage" ? "active" : ""
                    }`}
                  >
                    <p>New Message (2)</p>
                  </div>
                  <div
                    onClick={() => this.handleChangeNav("people")}
                    className={`item ${visible === "people" ? "active" : ""}`}
                  >
                    <p>Peoples (2)</p>
                  </div>
                  <div
                    onClick={() => this.handleChangeNav("online")}
                    className={`item ${visible === "online" ? "active" : ""}`}
                  >
                    <p>Online (2)</p>
                  </div>
                  <div className={`item`}>
                    <p>
                      <Link to="/logout">Logout</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`item ${isMenu ? "d-none" : ""}`}>
            <div className="flex-container">
              {/* Header */}
              <div className="item">
                <div className="flex-container search">
                  <i className="fas fa-search item" />
                  <input
                    type="text "
                    className="item"
                    placeholder="Search Here"
                  />
                </div>
              </div>
              {/* Message's */}
              {visible === "newMessage" ? (
                <div className="item flex-container">
                  <NewMessage />
                </div>
              ) : visible === "people" ? (
                <div className="item flex-container">
                  <People />
                </div>
              ) : visible === "online" ? (
                <div className="item flex-container">
                  <People />
                </div>
              ) : null}
            </div>
          </div>
          <div className="item">
            <div className="flex-container">
              {/* Header */}
              <div className="item">
                <Profile username={user.fullname} image={user.image} />
              </div>
              {/* Chat */}
              <div className="item">
                <div className="flex-container">
                  <div className="item">
                    <Message />
                  </div>
                  <div className="item">
                    <Message sibling={true} />
                  </div>
                  <div className="item">
                    <Message mine={true} />
                  </div>
                  <div className="item">
                    <Message sibling={true} mine={true} />
                  </div>
                  <div className="item">
                    <Message />
                  </div>
                  <div className="item">
                    <Message mine={true} />
                  </div>
                  <div className="item">
                    <IsTyping />
                  </div>
                </div>
              </div>
              {/* Action */}
              <div className="item">
                <div className="flex-container">
                  <div className="item">
                    <div className="fas fa-camera" />
                  </div>
                  <div className="item">
                    <textarea placeholder="Enter Message" />
                  </div>
                  <div className="item">
                    <button className="btn ">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => {
      dispatch(getUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
