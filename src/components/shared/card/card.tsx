import { CardProps } from '../../../models/cardProps';
import './card.scss'

const Card = (props: CardProps) => {
    return (<div className='card-item'>
        {props.cardBody}
    </div>)
}
export default Card;