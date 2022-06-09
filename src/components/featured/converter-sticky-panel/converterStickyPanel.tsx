import './converterStickyPanel.scss'
import { useEffect, useState } from 'react';
import DropdownList from '../../shared/dropdown-list/dropdownList';
import { Option } from '../../../models/dropdownListProps';
import exchangeIcon from '../../../exchange-icon.svg';
const ConverterStickyPanel = (props: any) => {
    useEffect(() => {
        setCurrencyOptions([{ label: 'option 1', value: '1' }, { label: 'option 2', value: '2' }]);
    }, []);
    const [currencyOptions, setCurrencyOptions] = useState<Option[]>([]);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    return (<div className='converter-panel'>
        <div className='row'>
            <div className='col-md-5'>
                <div className='amount'>
                    Amount <input type='number'></input>
                </div>
                <div className='currency-value'>
                    1.00 {from} = xxx {to}
                </div>
            </div>
            <div className='col-md-7'>
                <div className='currency-selection'>
                    <div className='row'>
                        <div className='col-md-6'>
                            From <DropdownList options={currencyOptions}></DropdownList>
                        </div>
                        {/* <div className='col-md-2 d-flex align-items-center justify-content-center'>
                            <img className='exchange-icon' src={exchangeIcon}></img>
                        </div> */}
                        <div className='col-md-6'>
                            To <DropdownList options={currencyOptions}></DropdownList>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'><button className='w-100 mt-2'>Convert</button></div>
                    </div>
                    <div className='converted-value'>
                        xxx {to}
                    </div>
                    {
                        props.displayDetailsButton ? <div className='d-flex justify-content-center mt-1'><button>More Details</button></div> : <></>
                    }
                </div>
            </div>
        </div>
    </div>);
}

export default ConverterStickyPanel;