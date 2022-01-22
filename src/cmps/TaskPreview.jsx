import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom"
// import {withRouter}  ReackRouterDOM;
import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { BiMessageRounded } from 'react-icons/bi';
import { BsCheck2Square } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { VscEdit } from 'react-icons/vsc';
import { IoCheckboxSharp } from 'react-icons/io';



export function TaskPreview({ task, boardId }) {
  // const isLabel = task.labelIds;
  // const [isEditHeader, setisEditHeader] = useState({ isEditHeader: false });
  
  // console.log(this.props)
  // useEffect(() => {
    //   loadBoard();
    // }, []);
    // console.log(new Date(task.dueDate));
    const getDateTemplate = ()=>{
      const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const duDate = new Date(task.dueDate)
      return (`${month_names_short[duDate.getMonth()]} ${duDate.getDay()}`)
    }

    const getCheckListCount = ()=>{
      let checkListCount = task.checklists.map(checklist=>checklist.todos.length)
      checkListCount = checkListCount.reduce((a, b) => a + b, 0)
      let checkListDone = task.checklists.map(checklist=>checklist.todos.filter(todo=>todo.isDone).length)
      checkListDone = checkListDone.reduce((a, b) => a + b, 0)
      return (`${checkListDone}/${checkListCount}`)
    }
  return (
    <Link className="card" to={`/${boardId}/${task.id}`}>
      <div className="card-hover">
      <div className="card-edit-icon"><VscEdit/></div>
      </div>
      
      {task.img && (
        <div className="pic">
          <img src={task.img} />
        </div>
      )}
      <div className="card-details">
        <div className="labels">
          {task.labelIds &&
            task.labelIds.map((label) => {
              return (
                <span key={label} className={`card-label ${label}`}></span>
              );
            })}
        </div>
        <div>{task.title}</div>
        <div className="icons-container">
          <div className="card-icons">
            {task.dueDate && (
              <div className="icon">
                <AiOutlineClockCircle className="svg" />
                <span>{getDateTemplate()}</span>
              </div>
            )}
            {task.description && (
              <div className="icon">
                <CgDetailsMore className="svg" />
              </div>
            )}
            {task.comments && (
              <div className="icon">
                <BiMessageRounded className="svg" />
                <span>{task.comments.length}</span>
              </div>
            )}
            {task.checklists && (
              <div className="icon">
                <BsCheck2Square className="svg" />
                <span>{getCheckListCount()}</span>
              </div>
            )}
            {task.attachments && (
              <div className="icon">
                <MdAttachFile className="svg" />
                <span>{task.attachment.length}</span>
              </div>
            )}
          </div>
        </div>
        {task.members && (
          <div className="member-container">
            {task.members.map((member) => (
              <div key={member._id} className="member">
                <img src={member.imgUrl} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
