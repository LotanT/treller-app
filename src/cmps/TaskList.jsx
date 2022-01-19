

export function GroupsList (group){

    return(
        <section className='card'>
            {false && <div><img src={group.style.img}/></div>}
            <span>{group.title}</span>
        </section>
    )
}