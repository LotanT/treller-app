export function GroupsList (group){

    return(
        <section className='group'>
            <span>{group.title}</span>
            {group.tasks.map(task=><TaskPreview task={task}/>)}
        </section>
    )
}