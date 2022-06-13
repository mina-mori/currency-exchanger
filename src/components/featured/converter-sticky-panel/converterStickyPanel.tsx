import './converterStickyPanel.scss'
import { useEffect, useState } from 'react';
import DropdownList from '../../shared/dropdown-list/dropdownList';
import exchangeIcon from '../../../exchange-icon.svg';
import { CurrencyService } from '../../../services/currencyService';
import { useDispatch, useSelector } from 'react-redux';
import { currenciesSelector, setCurrenciesAbbr, setCurrenciesName } from '../../../redux/currenciesSlice';
import { ConverterStickyPanelProps } from '../../../models/converterStickyPanelProps';
import { useNavigate } from 'react-router-dom';
const ConverterStickyPanel = (props: ConverterStickyPanelProps) => {
    const currencyService = new CurrencyService();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { currenciesAbbr } = useSelector(currenciesSelector);
    useEffect(() => {
        if (currencyOptions.length == 0) {
            if (currenciesAbbr.length == 0) {
                currencyService.getAllCurrencies().then((response: any) => {
                    if (response.success == true) {
                        const currencies = Object.keys(response.symbols);
                        setCurrencyOptions([...currencies]);
                        dispatch(setCurrenciesAbbr([...currencies]));
                        dispatch(setCurrenciesName(response.symbols))
                    }
                });
            }
            else {
                setCurrencyOptions([...currenciesAbbr]);
            }
        }
    }, []);
    useEffect(() => {
        if (props.currencyFrom && props.currencyTo) {
            setFrom(props.currencyFrom);
            setTo(props.currencyTo);
            setAmountValue('1');
            convert(props.currencyFrom, props.currencyTo);
        }
    }, [props.currencyFrom, props.currencyTo])
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [amountValue, setAmountValue] = useState('');
    const [resetted, resetSelection] = useState(false);
    const [from, setFrom] = useState<string | undefined>(undefined);
    const [to, setTo] = useState<string | undefined>(undefined);
    const [rate, setRate] = useState();
    const changeAmount = (event: any) => {
        const amount = event.target.value;
        setAmountValue(amount);
        if (amount == '') {
            resetSelection(true)
            setFrom(undefined);
            setTo(undefined);
            setRate(undefined);
            if (props.callback)
                props.callback(undefined, undefined);
        }
        else {
            resetSelection(false)
        }
    }
    const changeFromValue = (event: any) => {
        setFrom(event.target.value);
        setRate(undefined);
    }
    const changeToValue = (event: any) => {
        setTo(event.target.value);
        setRate(undefined);
    }
    const swapCurrancies = () => {
        if (amountValue && from && to) {
            convert(to, from);
            const fromOld = from;
            setFrom(to);
            setTo(fromOld);
        }
    }
    const convert = (from_currency: string, to_currency: string) => {
        currencyService.convert(from_currency, to_currency, Number.parseFloat(amountValue)).then((response: any) => {
            if (response.success == true) {
                setRate(response.result);
                if (props.callback)
                    props.callback(from, amountValue);
            }
        });
    }
    return (<div className='converter-panel'>
        <div className='row'>
            <div className='col-md-5'>
                <div className='amount'>
                    Amount <input type='number' value={amountValue} onChange={changeAmount}></input>
                </div>
                <div className='currency-value'>
                    {rate && !resetted ? `1.00 ${from} = ${(rate / Number.parseInt(amountValue)).toFixed(6)} ${to}` : ''}
                </div>
            </div>
            <div className='col-md-7'>
                <div className='currency-selection'>
                    <div className='row'>
                        <div className='col-md-5'>
                            From <DropdownList onChange={changeFromValue} selectedValue={from} resetSelection={resetted} isDisabled={props.inDetailsMode || !amountValue ? true : false} options={currencyOptions}></DropdownList>
                        </div>
                        <div className='col-md-2 swap-dev' onClick={swapCurrancies}>
                            Swap <img className='exchange-icon' src={exchangeIcon}></img>
                        </div>
                        <div className='col-md-5'>
                            To <DropdownList onChange={changeToValue} selectedValue={to} resetSelection={resetted} isDisabled={amountValue ? false : true} options={currencyOptions}></DropdownList>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'><button disabled={amountValue ? false : true} className='w-100 mt-2' onClick={() => { if (from && to) convert(from, to) }}>Convert</button></div>
                    </div>
                    <div className='converted-value'>
                        {rate && amountValue && !resetted ? rate + ' ' + to : ''}
                    </div>
                    {
                        !props.inDetailsMode ? <div className='d-flex justify-content-center mt-1'><button onClick={() => navigation(`/details/${from}/${to}`, { replace: true })} disabled={amountValue ? false : true}>More Details</button></div> : <></>
                    }
                </div>
            </div>
        </div>
    </div>);
}

export default ConverterStickyPanel;