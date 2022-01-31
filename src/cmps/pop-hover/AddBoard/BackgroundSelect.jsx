import React from "react";
import { unsplashService } from "../../../services/unsplash.service";

import { MdOutlineDone } from "react-icons/md";

export class BackgroundSelect extends React.Component {
  state = {
    backgrounds: [],
    search: "landscape",
    selectedBackgroundId: "",
  };

  componentDidMount() {
    this.onSearch();
  }

  handleChange = (ev) => {
    const search = ev.target.value;
    this.setState({ search });
  };

  onSearch = async () => {
    try {
      const { search } = this.state;
      const backgrounds = await unsplashService.getImgs(search);
      console.log(backgrounds.results);
      this.setState({ backgrounds: backgrounds.results });
    } catch (err) {
      console.log("error while connect server", err);
    }
  };

  onSelectBackground = (background) => {
    this.setState({ selectedBackgroundId: background.id });
    this.props.onChangeBoardBackground(background.urls.full);
  };

  render() {
    let { backgrounds, selectedBackgroundId } = this.state;    
    let splicedBackground =backgrounds
    if (this.props.cutShort){
      splicedBackground = backgrounds.slice(0, 6);
    } else{
      splicedBackground = backgrounds.slice(0, 20);
    }
    return (
      <section className={`background-select`}>
        <input
          placeholder="Search backgrounds..."
          onChange={this.handleChange}
        ></input>
        <a className="grey-btn" onClick={this.onSearch}>
          Search
        </a>
        {Boolean(backgrounds.length) && (
          <div className={`backgrounds-container`}>
            {backgrounds.map((background) => {
              return (
                <div
                  className={`choice-container ${
                    background.id === selectedBackgroundId ? "selected" : ""
                  }`}
                  key={background.id}
                >
                  <div
                    onClick={() => this.onSelectBackground(background)}
                    style={{ backgroundImage: `url(${background.urls.small})` }}
                    className="background-choice"
                  >
                    <MdOutlineDone />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}
