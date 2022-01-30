


export function BoardActivity (){
    switch activity{
        AddMember
        {member} added {member2} to {task}
        removeMember
        {member} removed {member2} from {task}
        joinToTask
        {member} joing to {task}
        lefTask
        {member} left {task}
        joinBoard
        {member} joing to {board}
        LeftBoard
        {member} left {board}
        cardMoved
        {member} moved {task} from {group} to {group}
        cardComplete
        {member} marked the due date on {task} to completed
        cardIncomplete
        {member} marked the due date on {task} to incompleted
        archivedList
        {member} archived list {group}
        archivedTask
        {member} archived task {group}
        setDudateTo
        {member} added due date to {task}
        removeDudate
        {member} removed due date from {task}
        addLabel
        {member} added label {label} to {task}
        removedLabel
        {member} removed label {label} from {task}
    }
   <span> <span>{member.fullname}</span> archive task<Link to={`/${task.id}`}>{task.title}</Link> </span>
}