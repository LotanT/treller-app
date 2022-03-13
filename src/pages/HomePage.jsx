import React from "react";
import { connect } from "react-redux";

class _Homepage extends React.Component {
  render() {
    return (
      <section className="homepage">
        <div className="hero flex main-layout">
          <div className="hero-content flex column">
            <h1 className="sixteen">Treller helps teams move work forward.</h1>
            <p className="twelve">
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Treller.
            </p>
            <a
              onClick={() => this.props.history.push("/userboards")}
              className="btn btn-start-doing"
            >
              Start demo →
            </a>
          </div>
          <div>
            <img
              className="home-img"
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
              width="445"
              height="575"
              alt=""
            />
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
        {/* <div className="big-img-container">
          <img
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png"
            width="1100"
            height="778"
            alt="Board view"
          />
        </div> */}
      </section>
    );
  }
}
function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_Homepage);
