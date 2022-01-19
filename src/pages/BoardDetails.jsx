import { useEffect } from 'react';
import { loadBoard } from '../store/board.actions';




function _BoardDetails (){
    // const [board, setBoard] = useState({board: null})
    
    useEffect(()=>{
        loadBoard()
    }, [])

    onAddGroup = () => {}

    return(
        <section className='board-container'>
            <BoardHeader board={board}/>
            <GroupsList groups={board.groups}/>
        </section>
    )
}