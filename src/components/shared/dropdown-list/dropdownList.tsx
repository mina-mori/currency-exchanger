import './dropdownList.scss';
import { DropdownListProps } from '../../../models/dropdownListProps';
import { useEffect, useRef, useState } from 'react';
const DropdownList = (props: DropdownListProps) => {
    const dropdownElement = useRef(null);
    useEffect(() => {
        if (props.resetSelection) {
            let ddl: any = dropdownElement.current;
            ddl.value = -1;
        }
    }, [props.resetSelection])
    return (<>
        <select onChange={props.onChange} ref={dropdownElement} value={props.selectedValue} defaultValue={-1} disabled={props.isDisabled == true ? true : undefined} className='custom-dropdown'>
            <option className='disabled-option' value={-1} disabled>Select an option</option>
            {props.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))
            }
        </select>
    </>
    );

}
export default DropdownList;