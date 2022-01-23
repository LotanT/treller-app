import {GroupPreview} from './GroupPreview'


export function GroupList ({groups, boardId, onAddTask}){
    // console.log(groups)
    return(
        <div className='group-list'>
            {groups.map(group=><GroupPreview key={group.id} group={group} boardId={boardId} onAddTask={onAddTask}/>)}
        </div>
    )
}