import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ConverterStickyPanel from '../../../components/featured/converter-sticky-panel/converterStickyPanel';
import { currenciesSelector, setCurrenciesAbbr, setCurrenciesName } from '../../../redux/currenciesSlice';
import { CurrencyService } from '../../../services/currencyService';

import './details.scss';
const Details = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const currencyService = new CurrencyService();
    const { from, to }: any = useParams();
    const { currenciesName } = useSelector(currenciesSelector);
    const [title, setTitle] = useState<string | undefined>();
    useEffect(() => {
        if (currenciesName && Object.keys(currenciesName).length > 0) {
            const currencyName = currenciesName[`${from}`];
            setTitle(currencyName);
        }
        else {
            currencyService.getAllCurrencies().then((response: any) => {
                if (response.success == true) {
                    const currencies = Object.keys(response.symbols)
                    dispatch(setCurrenciesAbbr([...currencies]));
                    dispatch(setCurrenciesName(response.symbols));
                    const currencyName = response.symbols[`${from}`];
                    setTitle(currencyName);
                }
            });
        }
    }, []);
    return (
        <>
            <div className='details-header'>
                <h3>{title}</h3>
                <button onClick={() => navigation('/home')}>Back to Home</button>
            </div>
            <ConverterStickyPanel inDetailsMode={true} currencyFrom={from} currencyTo={to}></ConverterStickyPanel>
        </>
    );
}
export default Details;