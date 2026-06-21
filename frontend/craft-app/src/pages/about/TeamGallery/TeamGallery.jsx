import { team } from '../aboutInfo'
import './TeamGallery.scss'


const TeamGallery = () => {
  return (
    <div className='team__gallery'>
      {team.map(el => <div className='team__card' key={el.id}>
         <div className="team__card_img">
            <img src={el.img}/>
         </div>
         <h3>{el.role}</h3>
         <a className="team__link" href={el.link} target="_blank" rel="noreferrer">{el.name}</a>
      </div>)}
    </div>
  )
}

export default TeamGallery