import { TaskPreview } from './TaskPreview';

export function GroupPreview({ group }) {
  console.log(group);
  return (
    <div className="group-container">
      <div className="group">
        <div className="group-header"><span>{group.title}</span></div>
        <div className="task-list">
          {group.tasks.map((task) => (
            <TaskPreview key={task.id} task={task} />
          ))}
        </div>
          <span>add..</span>
      </div>
    </div>
  );
}
