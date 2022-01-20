import React from "react";

export class EditableText extends React.Component {
  state = {
    text: "",
    isEdit: false,
  };

  componentDidMount() {
    const text = this.props.text ? this.props.text : "Add Text";
    this.setState({ text });
  }

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
  };

  setText = (ev) => {
    const text = ev.target.value;
    this.setState({ text });
  };

  render() {
    const { isEdit, text } = this.state;
    return (
      <section
        className="editable-text"
        onClick={() => {
          this.setIsEdit(true);
        }}
      >
        {!isEdit && <h5>{text}</h5>}
        {isEdit && (
          <textarea
            onChange={this.setText}
            onBlur={() => this.setIsEdit(false)}
            value={text}
            autoFocus
          ></textarea>
        )}
      </section>
    );
  }
}
