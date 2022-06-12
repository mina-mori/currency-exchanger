import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConverterStickyPanel from '../../../components/featured/converter-sticky-panel/converterStickyPanel';
import './details.scss'
const Details = () => {
    const { from, to }: any = useParams();
    return (
        <>
            <div className='details-header'>
                <h3>{from}</h3>
                <button>Back to Home</button>
            </div>
            <ConverterStickyPanel currencyFrom={from} currencyTo={to}></ConverterStickyPanel>
        </>
    );
}
export default Details;