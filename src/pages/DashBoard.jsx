import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-3';
import { taskService } from "../services/task.service";
import { GrClose } from "react-icons/gr";
import { CircleProgress } from 'react-gradient-progress'
import { padding } from "@mui/system";
import ChartImg from '../../src/assets/imgs/user-boards/chart.svg'




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

    const [boardTimeCounts, setBoardTimeCounts] = useState([]);


    useEffect(() => {

        setLabels()
        setTaskCountPerMember()
        setTimeBoardCounts()
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
            borderWidth: 1,
        }],

    };


    const options = {
        legend: {
            display: true,
            position: "right",
            labels: {
                fontColor: "#fff",
                // marginRight:23
            },
            padding: 3
        },
        margin: 0,
        padding: 0,
        maintainAspectRatio: true,

        // aspectRatio: 1

    };
    const options2 = {
        legend: {
            display: false,
            x: {
                fontColor: "#fff"
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#fff",
                    // fontSize: 18,
                    stepSize: 1,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "#fff",
                    // fontSize: 14,
                    // stepSize: 1,
                    // beginAtZero: true
                }
            }]
        }
    }




    const setTimeBoardCounts = () => {
        let boardTimes = taskService.taskTimeCheck(board)
        console.log(boardTimes);
        setBoardTimeCounts(boardTimes)
    }


    const setTaskCountPerMember = () => {
        const membersFullName = board.members.map(member => {
            return member.fullname
        })
        setMembersNames(membersFullName)

        let taskCount = []
        taskCount = taskService.MembersTaskCount(board, membersFullName)
        setTasksPerMember(taskCount)
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

    const getPercent = (val) => {
        const { taskCount } = boardTimeCounts
        return (parseInt(val / taskCount * 100))
    }


    return (
        <section className="window-dashboard-charts">
            <div className="screen-dashboard" onClick={toggleDashBoard}></div>
            <GrClose className='exit-dashboard-svg' onClick={toggleDashBoard} />
            <div className="dashboard-container">
            <span className="board-title">{board.title}</span>
                <div className="upper-prog-bar flex">
                    <div className="left">
                        <span className="texts">
                            <span className="title" >All Tasks</span>
                            <span className="numbers">{boardTimeCounts.taskCount}</span>
                        </span>
                        <div className="flex"><img src={ChartImg}></img></div>
                    </div>
                    <div className="center">
                        <span className="texts">
                            <span className="title" >Due Soon</span>
                            <span className="numbers">{boardTimeCounts.countDueSoon}</span>
                        </span>
                        <CircleProgress secondaryColor={'white'} width={100} fontColor={'white'} percentage={getPercent(boardTimeCounts.countDueSoon)} strokeWidth={8} />
                    </div>
                    <div className="right">
                        <span className="texts">
                            <span className="title">Over Due</span>
                            <span className="numbers">{boardTimeCounts.countDueDate}</span></span>
                        <CircleProgress secondaryColor={'white'} width={100} fontColor={'white'} percentage={getPercent(boardTimeCounts.countDueDate)} strokeWidth={8} />
                    </div>
                </div>
                <div className="charts-container">
                    <div className="left-chart">
                        <span className="chart-title">Tasks per label</span>
                        <Doughnut width={500} height={240} data={data} options={options} />
                    </div>
                    <div className="right-chart">
                        <span className="chart-title">Tasks per user</span>

                        <Bar width={500} height={240} data={data2} options={options2} />
                    </div>
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
