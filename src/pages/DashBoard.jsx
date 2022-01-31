import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-3';
import { taskService } from "../services/task.service";
import { GrClose } from "react-icons/gr";




// ChartJS.register(ArcElement, Tooltip, Legend);
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,


// );

function _DashBoard({ toggleDashBoard, board }) {
    const [boardLabels, setBoardLabels] = useState(['Don2e', 'Note', 'Important', 'In Progress', 'Design', 'Feedback', 'Client', 'Backend', 'QA ']);
    const [boardLabelColors, setBoardLabelColors] = useState([]);
    const [boardLabelCount, setBoardLabelCount] = useState([]);

    const [membersNames, setMembersNames] = useState([]);
    const [tasksPerMember, setTasksPerMember] = useState([]);


    useEffect(() => {

        setLabels()
        setTaskCountPerMember()
        // console.log('membersNames:', membersNames)
        // console.log('tasksPerMember:', tasksPerMember)



    }, []);


    const data = {
        labels: boardLabels,
        datasets: [{
            label: 'Task Per Label',
            data: boardLabelCount,
            backgroundColor: boardLabelColors,
            borderColor: boardLabelColors,
            borderWidth: 1
        }]
    };

    const data2 = {
        labels: membersNames,
        datasets: [{
            label: 'Task Per Label',
            data: tasksPerMember,
            backgroundColor: boardLabelColors,
            borderColor: boardLabelColors,
            borderWidth: 1
        }]
    };


    const options = {
        legend: {
            display: true,
            position: "right"
        },

        maintainAspectRatio: true

    };




    const setTaskCountPerMember = () => {

        const membersFullName = board.members.map(member => {
            return member.fullname
        })
        console.log('memberFullName:', membersFullName)

        setMembersNames(membersFullName)
        console.log('membersNames:', membersNames)



        let taskCount = []
        taskCount = taskService.MembersTaskCount(board, membersFullName)
        // console.log('taskCount:', taskCount)

        setTasksPerMember(taskCount)
        // console.log('tasksPerMember:', tasksPerMember)


    }

    const setLabels = () => {
        let labelNames = []
        let labelColors = []
        board.labels.forEach(label => {
            labelNames.push(label.title)
            labelColors.push(label.color)
        });
        setBoardLabels(labelNames)
        setBoardLabelColors(labelColors)

        let labelsCount = taskService.labelsBoardCount(board, boardLabels)
        setBoardLabelCount(labelsCount)
    }



    return (
        <section className="window-dashboard-charts">
            <div className="screen-dashboard" onClick={toggleDashBoard}></div>
            <div className="dashboard-container">
                    <GrClose className='exit-dashboard-svg' onClick={toggleDashBoard} />
                <div className="charts-container">
                    <div className="right-chart"><Doughnut width={400} height={200} data={data} options={options} /></div>
                    <div className="left-chart"><Bar width={400} height={200} data={data2} /></div>
                </div>
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        user: state.userModule.user,
    };
}

const mapDispatchToProps = {
};

export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(_DashBoard);
