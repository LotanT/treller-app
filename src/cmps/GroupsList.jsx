import {GroupPreview} from './GroupPreview'


export function GroupList ({groups}){
    console.log(groups)
    return(
        <section className='group-list'>
            {groups.map(group=><GroupPreview key={group.id} group={group}/>)}
        </section>
    )
}