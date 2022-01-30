import { BsStar } from 'react-icons/bs';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiOutlinePlus } from 'react-icons/hi';

export function AddGroup({onAddGroup}) {
  const [isAddGroup, setAddGroup] = useState(false);
  const [groupTitle, setGroupTitle] = useState('');

  const handleGroupChange = (ev) => {
    setGroupTitle(ev.target.value);
  };

  const addingGroup = () =>{
    ToggleAddTask()
    setGroupTitle('')
    onAddGroup(groupTitle)
  }

  const ToggleAddTask = () => {
    setAddGroup(!isAddGroup);
  };

  return (
    <div className="group-container">
      <div className={`add-group ${isAddGroup}`}>
        {isAddGroup && (
          <div className="form">
            <input
              type="text"
              value={groupTitle}
              onChange={handleGroupChange}
            />
            <div className="card-composer-control">
              <div className="cc-control-section">
                <span
                  className="control-section-add-btn"
                  onClick={addingGroup}
                >
                  Add list
                </span>
                <div className="control-close-icon" onClick={ToggleAddTask}>
                  <CgClose />
                </div>
              </div>
            </div>
          </div>
        )}
        {!isAddGroup && (
          <div className="compose-task">
            <div className="open-new-card" onClick={ToggleAddTask}>
              <div className="compose-icon">
                <HiOutlinePlus />
              </div>
              <span>Add another list</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
