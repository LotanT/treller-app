import React from "react";

export const ProgressionBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 7,
    width: "99%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 13,
  };
  const barColor = completed === 100 ? "#61bd4f" : "#0079bf";
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: barColor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    paddingTop: 4,
    color: "#172b4d",
    fontSize: 10,
  };

  return (
    <div className="prog-bar">
      <div className="percentage" style={labelStyles}>{`${completed}%`}</div>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
};

// export default ProgressionBar;
