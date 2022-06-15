import './converterStickyPanel.scss';
import { useEffect, useState } from 'react';
import DropdownList from '../../shared/dropdown-list/dropdownList';
import exchangeIcon from '../../../assets/images/exchange-icon.svg';
import exchangeIconDisabled from '../../../assets/images/exchange-icon-disabled.svg';
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
    const [iconDegree, setIconDegree] = useState(90);
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [amountValue, setAmountValue] = useState('1');
    const [resetted, resetSelection] = useState(false);
    const [from, setFrom] = useState<string | undefined>(undefined);
    const [to, setTo] = useState<string | undefined>(undefined);
    const [rate, setRate] = useState<number>();
    const [rateBasedOnAmount, setRateBasedOnAmount] = useState<number>();
    useEffect(() => {
        getAllCurrencies();
    }, []);
    useEffect(() => {
        //reset rate values while navigating from header buttons
        if (props.inDetailsMode) {
            props.onDataChange();
            setRate(undefined);
            setRateBasedOnAmount(undefined);
        }
        if (props.currencyFrom && props.currencyTo) {
            setFrom(props.currencyFrom);
            setTo(props.currencyTo);
            const amount = props.amount ? props.amount.toString() : '1';
            setAmountValue(amount);
        }
    }, [props.currencyFrom, props.currencyTo, props.amount]);
    const getAllCurrencies = () => {
        //get currencies from API or state management if exist
        if (currencyOptions.length == 0) {
            // check currencies in state management
            if (currenciesAbbr.length > 0) {
                setCurrencyOptions([...currenciesAbbr]);
            }
            else {
                currencyService.getAllCurrencies().subscribe((response: any) => {
                    if (response?.success == true) {
                        const currencies = Object.keys(response.symbols);
                        setCurrencyOptions([...currencies]);
                        dispatch(setCurrenciesAbbr([...currencies]));
                        dispatch(setCurrenciesName(response.symbols))
                    }
                });
            }
        }
    }
    const changeAmount = (event: any) => {
        const amount = event.target.value;
        setAmountValue(amount);
        //reset fields
        resetSelection(true)
        setRate(undefined);
        setRateBasedOnAmount(undefined);
        props.onDataChange();
        if (props.inDetailsMode) {
            navigation(`/details/${amount}/${from}/${to}`);
        }
    }
    const changeFromValue = (event: any) => {
        setFrom(event.target.value);
        setRate(undefined);
        setRateBasedOnAmount(undefined);
        props.onDataChange();
    }
    const changeToValue = (event: any) => {
        setTo(event.target.value);
        setRate(undefined);
        setRateBasedOnAmount(undefined);
        props.onDataChange();
        if (props.inDetailsMode) {
            navigation(`/details/${amountValue}/${from}/${event.target.value}`);
        }
    }
    const swapCurrancies = () => {
        rotateSwapIcon();
        if (from && to) {
            const fromOld = from;
            setFrom(to);
            setTo(fromOld);
            setRate(undefined);
            setRateBasedOnAmount(undefined);
            props.onDataChange();
        }
    }
    const rotateSwapIcon = () => {
        setIconDegree(iconDegree + 90)
        const element = document.getElementById('rotate');
        if (element) {
            element.style.transform = 'rotate(' + iconDegree + 'deg)';
        }
    }
    const convert = (from_currency: any, to_currency: any, amountVal: number) => {
        resetSelection(false);
        currencyService.convert(from_currency, to_currency, amountVal).subscribe((response: any) => {
            if (response?.success == true) {
                setRateBasedOnAmount(response.result);
                if (props.onConvert)
                    props.onConvert(from_currency, amountVal);
            }
        });
        currencyService.convert(from_currency, to_currency, 1).subscribe((response: any) => {
            if (response?.success == true) {
                setRate(response.result);
            }
        });
    }
    const preventPlusOrMinus = (e: any) => {
        if (e.code === 'NumpadSubtract' || e.code === 'NumpadAdd') {
            e.preventDefault();
        }
    };
    return (<div className='converter-panel'>
        <div className='row'>
            <div className='col-md-5'>
                <div className='amount'>
                    Amount <input type='number' min={1} value={amountValue} onKeyPress={preventPlusOrMinus} onChange={changeAmount}></input>
                </div>
                <div className='currency-value'>
                    {rate && !resetted ? `1.00 ${from} = ${rate} ${to}` : 'No data available'}
                </div>
            </div>
            <div className='col-md-7'>
                <div className='currency-selection'>
                    <div className='row'>
                        <div className='col-md-5'>
                            From <DropdownList onChange={changeFromValue} selectedValue={from} isDisabled={props.inDetailsMode || !amountValue ? true : false} options={currencyOptions}></DropdownList>
                        </div>
                        <div className='col-md-2 swap-dev'>
                            Swap
                            {!props.inDetailsMode ? <img id='rotate' className='exchange-icon' src={exchangeIcon} onClick={swapCurrancies}></img> :
                                <img id='rotate' className='disabled-exchange-icon' src={exchangeIconDisabled}></img>}
                        </div>
                        <div className='col-md-5'>
                            To <DropdownList onChange={changeToValue} selectedValue={to} isDisabled={amountValue ? false : true} options={currencyOptions}></DropdownList>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 button'><button disabled={amountValue ? false : true} className='w-100 mt-2 hoverBtn' onClick={() => { if (from && to) convert(from, to, Number.parseFloat(amountValue)) }}>Convert</button></div>
                    </div>
                    <div className='row'>
                        <div className={props.inDetailsMode ? 'col-md-12' : 'col-md-7'}>
                            <div className='converted-value'>
                                {rateBasedOnAmount && amountValue && !resetted ? rateBasedOnAmount + ' ' + to : 'No data available'}
                            </div>
                        </div>
                        {
                            !props.inDetailsMode ? <div className='col-md-5'>
                                <div className='details-btn'><button className='w-100' onClick={() => navigation(`/details/${amountValue}/${from}/${to}`)} disabled={amountValue && from && to ? false : true}>More Details</button></div> </div> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ConverterStickyPanel;