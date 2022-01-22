import {GroupPreview} from './GroupPreview'


export function GroupList ({groups, boardId}){
    // console.log(groups)
    return(
        <div className='group-list'>
            {groups.map(group=><GroupPreview key={group.id} group={group} boardId={boardId}/>)}
        </div>
    )
}