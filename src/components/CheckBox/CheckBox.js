import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const CheckBox = ({ isChecked, onChange, label, value ,userSelectedFilters,setUserSelectedFilters}) => {
	
    console.log('isChecked prop',isChecked)
    const [checkedUser, setCheckedUser] = useState(true)
    const [country, setCountry] = useState([])
    const { state } = useLocation()

    const handleChange = () => {
        onChange && onChange(value);
    };

    const selectMe = (label) => {
		setCheckedUser(!checkedUser)
		let countrySelectArr = [...country];
		countrySelectArr.push({"country":label, "isChecked":checkedUser})		
		setCountry(countrySelectArr)
		console.log('data count ',country)
		console.log('satus check:',checkedUser)
		console.log('select-> ', label)
    }

    const hanleUserSelect = (selectedValue) =>{
		if(userSelectedFilters.indexOf(selectedValue) > -1) {
			setUserSelectedFilters(userSelectedFilters.filter(filter=>filter!=selectedValue))
		} else {
			setUserSelectedFilters([...userSelectedFilters,selectedValue])
		}
	}

    return (
		<S.CheckBox>
			<FormControlLabel
				control={<Checkbox checked={isChecked} defaultChecked={false} onChange={handleChange} onClick={() => hanleUserSelect(label)}  color="primary" />}
				label={label + "- "+ value}
				/>
		</S.CheckBox>
    );
};

export default CheckBox;
