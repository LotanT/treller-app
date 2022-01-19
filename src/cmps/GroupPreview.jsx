import { TaskPreview } from './TaskPreview';

export function GroupPreview({ group }) {
  console.log(group);
  return (
    <section className="group-container">
      <section className="group">
        <span>{group.title}</span>
        <section className="task-list">
          {group.tasks.map((task) => (
            <TaskPreview key={task.id} task={task} />
          ))}
        </section>
          <span>add..</span>
      </section>
    </section>
  );
}
