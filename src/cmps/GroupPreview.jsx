import { TaskPreview } from './TaskPreview';
import { HiOutlinePlus } from 'react-icons/hi';
import { RiKeyboardBoxLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';

export function GroupPreview({ group, boardId }) {
  // console.log(group);
  return (
    <div className="group-container">
      <div className="group">
        <div className="group-header">
          <span>{group.title}</span>
          <div className="group-action">
            <div className="group-action-icon">
              <FiMoreHorizontal/>
            </div>
          </div>
          </div>
        <div className="task-list">
          {group.tasks.map((task) => (
            <TaskPreview key={task.id} task={task} boardId={boardId} />
          ))}
        </div>
          <div className="compose-task">
            <div className="open-new-card">
              <div className="compose-icon"><HiOutlinePlus/></div>
              <span>Add a card</span>
            </div>
            <div className="task-template">
              <RiKeyboardBoxLine/>
            </div>
          </div>
      </div>
    </div>
  );
}
