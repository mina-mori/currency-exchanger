import { useState } from 'react';
import { InfoAlertProps } from '../../../models/infoAlertProps';
import './infoAlert.scss'

const InfoAlert = (props: InfoAlertProps) => {
    const [hidden, hideAlert] = useState(false);
    return (
        !hidden ? <div className='alert-info'>
            <div>
                <div><b>Info</b></div>
                <div>{props.message}</div>
            </div>
            <span className='close' onClick={() => hideAlert(true)}>&#x2715;</span>
        </div> : <></>
    )
}
export default InfoAlert;