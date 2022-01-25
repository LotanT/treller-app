import { CgClose } from 'react-icons/cg';
import { BsStar } from 'react-icons/bs';

export function QuickBar({ task, handleCardChange, taskTitle,cardPos}) {
    console.log(cardPos)
  return (
    <div className="quick-bar-editor">
      <div className="quick-bar-exit">
        <BsStar />
      </div>
      <div className="quick-bar-editor-card">
        <div className="card-composer">
          <div className="list-card-composer">
            <textarea
              onChange={handleCardChange}
              dir="auto"
              value={taskTitle}
              autoFocus
              placeholder="Enter a title for this card..."
            ></textarea>
          </div>
          <div className="card-composer-control">
            <div className="cc-control-section">
              <span
                className="control-section-add-btn"
                // onClick={onAddTaskPreview}
              >
                Add card
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
