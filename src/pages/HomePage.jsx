import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { boardService } from "../services/boards.service";

import heroImg from "../assets/imgs/home-page/hero.png";
import BoardImg from "../assets/imgs/home-page/board.png";

class _Homepage extends React.Component {
  render() {
    return (
      <section className="homepage">
        <div className="hero flex main-layout">
          <div className="hero-content flex column">
            <h1>Treller helps teams move work forward.</h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Treller.
            </p>
            <a
              onClick={() => this.props.history.push("/userboards")}
              className="btn btn-start-doing"
            >
              Start doing →
            </a>
          </div>
          <div>
            <img src={heroImg} alt="" />
          </div>
        </div>
        <div className="second-container text-center">
          <h2>It’s more than work. It’s a way of working together.</h2>
          <p>
            Start with a Trello board, lists, and cards. Customize and expand
            with more features as your teamwork grows. Manage projects, organize
            tasks, and build team spirit—all in one place.
          </p>
        </div>
        <div>
          <img src={BoardImg} className="board-img" alt="" />
        </div>
      </section>
    );
  }
}
function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_Homepage);
