import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

import { taskService } from "../../services/task.service";
import { loadBoard, onEditBoard } from "../../store/board.actions";

import { GrClose } from "react-icons/gr";

// import { CalendarPicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
// import PickersDay from '@mui/lab/PickersDay';
// import endOfWeek from 'date-fns/endOfWeek';
// import isSameDay from 'date-fns/isSameDay';
// import isWithinInterval from 'date-fns/isWithinInterval';
// import startOfWeek from 'date-fns/startOfWeek';

//MAP TO BOARD PREV

function _DatePickerPop(props) {
  const [task, setTask] = useState(
    taskService.getTaskById(props.board, props.taskId)
  );
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTaskLocal();
    setDate(task.dueDate ? new Date(task.dueDate) : new Date());
    // console.log(date);
  }, []);

  const setTaskLocal = () => {
    setTask(taskService.getTaskById(props.board, props.taskId));
  };

  const onSaveDueDate = async () => {
    // console.log('date:', date)
    let updatedBoard = taskService.saveDueDateToTask(
      props.board,
      props.taskId,
      date.getTime()
    );
    await props.onEditBoard(updatedBoard);
    props.toggleModal();
  };

  const onRemoveDueDate = async () => {
    let updatedBoard = taskService.removeDueDateToTask(
      props.board,
      props.taskId
    );
    await props.onEditBoard(updatedBoard);
    props.toggleModal();
  };

  const top = props.top ? props.top : "134px";
  const left = props.left ? props.left : "540px";

  return (
    <div className="add-labels-pop" style={{ top: top, left: left }}>
      <div className="pop-content">
        <div className="header-container">
          <GrClose
            stroke="#0079bf"
            fill="#0079bf"
            className="exit-svg"
            onClick={props.toggleModal}
          />
          <div className="add-labels-title">Dates</div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            label="Week picker"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            // renderDay={}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="'Week of' MMM d"
          />
        </LocalizationProvider>

        <div className="add-label-preview">
          <button className="btn btn-due-date-create" onClick={onSaveDueDate}>
            Save
          </button>
          <button className="btn btn-due-date-remove" onClick={onRemoveDueDate}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  onEditBoard,
};

export const DatePickerPop = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DatePickerPop);
