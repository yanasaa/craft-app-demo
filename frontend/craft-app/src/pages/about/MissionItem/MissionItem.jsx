import { missions } from "../aboutInfo"


const MissionItem = () => {
  return (
    <div className='mission'>
      {missions.map(el => <div className='mission__card' key={el.id}>
         <h3 className="mission__title">{el.title}</h3>
         <p>{el.text}</p>
         <a href={el.link} target="_blank" rel="noreferrer">{el.name}</a>
      </div>)}
    </div>
  )
}

export default MissionItem