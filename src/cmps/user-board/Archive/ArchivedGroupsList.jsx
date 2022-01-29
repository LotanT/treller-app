import React from "react";
import { MdRefresh } from "react-icons/md";

export class ArchivedGroupsList extends React.Component {
  state = {
    groups: null,
  };

  componentDidMount() {
    const { groups } = this.props;
    this.setState({ groups });
  }

  render() {
    const { groups } = this.state;
    if (!groups) return <span>Loading..</span>;
    return (
      <section className="archived-groups-list">
        {groups.map((group) => (
          <div className="archived-group" key={group.id}>
            <span>{group.title}</span>
            <a className="grey-btn">
              <MdRefresh />
              Send to Board
            </a>
          </div>
        ))}
      </section>
    );
  }
}
