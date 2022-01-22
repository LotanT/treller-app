import {GroupPreview} from './GroupPreview'


export function GroupList ({groups}){
    return(
        <div className='group-list'>
            {groups.map(group=><GroupPreview key={group.id} group={group}/>)}
        </div>
    )
}