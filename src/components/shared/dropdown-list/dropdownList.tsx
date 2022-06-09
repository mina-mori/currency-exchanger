import './dropdownList.scss';
import { DropdownListProps, Option } from '../../../models/dropdownListProps';
import { useEffect } from 'react';
const DropdownList = (props: DropdownListProps) => {
    return (<>
        <select className='custom-dropdown'>
            {props.options.map((option: Option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))
            }
        </select>
    </>
    );

}
export default DropdownList;