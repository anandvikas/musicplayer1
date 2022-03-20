import Data from "../../assets/data";

const SongList = (props) => {
    return (
        <>
            <div className='listCon'>
                {
                    Data.map((val, index)=>{
                        return(
                            <h3 key={val.id} onClick={()=>{props.playThis(index)}} >{val.name}</h3>
                        )
                    })
                }
            </div>
        </>
    )
}
export default SongList;