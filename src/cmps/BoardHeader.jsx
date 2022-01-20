import { BsStar } from 'react-icons/bs';
// BsStar

export function BoardHeader ({board}){
    console.log(board)
    return(
        <div className='board-header'>
          <div className="board-name">{board.title}</div>
          <div className="starred"><BsStar/></div>
          {board.members && <div className="board-members">
            {board.members.map((member) => (
               <div key={member._id} className="member"> <img src={member.imgUrl}/></div>
            ))}
        </div>}
        </div>
    )
}