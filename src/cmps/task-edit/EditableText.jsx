import React from "react";

export class EditableText extends React.Component {
  state = {
    text: "",
    isEdit: false,
  };

  componentDidMount() {
    const text = this.props.text;
    this.setState({ text });
  }

  setIsEdit = (boolean) => {
    const isEdit = boolean;
    this.setState({ isEdit });
    this.props.setIsEdit(isEdit);
  };

  setText = (ev) => {
    let text = ev.target.value;
    this.setState({ text });
    this.props.updateFunction(
      this.props.property,
      text,
      this.props.checklistId
    );
  };

  render() {
    let { isEdit, text } = this.state;
    // if (!text && !isEdit) text = `Add ${this.props.property}`;

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
            placeholder={`Add ${this.props.property} `}
            value={text}
            autoFocus
          ></textarea>
        )}
      </section>
    );
  }
}
