import React from "react";
import { ImCheckboxChecked } from "react-icons/im";

export class TaskDate extends React.Component {
  state = {
    style: {display: false}
  };

  componentDidMount(){
    this.getDueDateStyle()
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.task !== this.props.task){
      this.getDueDateStyle()
    }
  }


  getDateTemplate = (task) => {
    const month_names_short = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const duDate = new Date(task.dueDate);
    const now = new Date();
    let date = `${month_names_short[duDate.getMonth()]} ${duDate.getDate()}`;
    if (now.getMonth() === duDate.getMonth()) {
      if (now.getDate() === duDate.getDate()) date = "Today";
      else if (now.getDate() === duDate.getDate()-1) date = "Tommorow";
      else if (now.getDate() === duDate.getDate() + 1) date = "Yesterday";
    }
    return `${date} at ${duDate.getHours()}:${duDate.getMinutes()}`;
  };
  
  getDueDateStyle(){
    const {task} = this.props
    const day = 1000*60*60*24
    let style = {display: false}
    if (Date.now() + 3*day > task.dueDate){
      style = {backgroundColor: '#F2D600', txt: 'due soon', display: true}
    }
    if(Date.now() > task.dueDate){
     style = {backgroundColor: '#EB5A46', txt: 'overdue', display: true}
    }
    this.setState({style})
  }
 

  render() {
    const {style} = this.state
    const { task, toggleIsDone } = this.props;
    return (
      <section className="top-details">
        <h3>Due date</h3>
        <div className="flex top-detail">
          {task.dueDate && (
            <div className="date-container flex">
              {!task.isDone && (
                <div className="check-box lower " onClick={toggleIsDone}></div>
              )}
              {task.isDone && (
                <div className="check-box lower" onClick={toggleIsDone}>
                  <ImCheckboxChecked fill="#0079bf" />
                </div>
              )}
              <div className="grey-btn">
                {this.getDateTemplate(task)}
                {task.isDone && (
                  <h5
                    style={{ backgroundColor: "#61BD4F", color: "white" }}
                    className="date-status"
                  >
                    completed
                  </h5>
                )}
                {(!task.isDone && style.display) && (
                  <h5
                    className="date-status"
                    style={{ backgroundColor: style.backgroundColor, color: "white" }}
                  >
                    {style.txt}
                  </h5>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
