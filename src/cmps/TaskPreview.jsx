export function TaskPreview ({task}){
    console.log(task)
    return(
        <section className='card'>
            {false && <div><img src={task.style.img}/></div>}
            <span>{task.title}</span>
            
        </section>
    )
}