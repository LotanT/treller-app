


export function GroupsList (groups){

    return(
        <section className='group-list'>
            {groups.map(group=><GroupPreview group={group}/>)}
        </section>
    )
}