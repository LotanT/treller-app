import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { BiMessageRounded } from 'react-icons/bi';
import { BsCheck2Square } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';


export function TaskPreview({ task }) {
  console.log(task);
  const isLabel = task.labelIds;
  return (
    <div className="card">
      {task.img && <div className='pic'> <img src={task.img} /></div>}
      <div className="card-details">
        <div className="labels">
            {task.labelIds &&task.labelIds.map((label) => {
            return <span key={label} className={`card-label ${label}`}></span>;
            })}
        </div>
        <div>{task.title}</div>
        <div className="icons-container">
            <div className="card-icons">
                {task.dueDate && <div className="icon"><AiOutlineClockCircle className="svg"/></div>}
                {task.description && <div className="icon"><CgDetailsMore className="svg"/></div>}
                {task.description && <div className="icon"><BiMessageRounded className="svg"/></div>}
                {task.description && <div className="icon"><BsCheck2Square className="svg"/></div>}
                {task.description && <div className="icon"><MdAttachFile className="svg"/></div>}
            </div>
        </div>
        {task.members && <div className="member-container">
            {task.members.map((member) => (
               <div key={member._id} className="member"> <img src={member.imgUrl}/></div>
            ))}
        </div>}
      </div>
    </div>
  );
}
