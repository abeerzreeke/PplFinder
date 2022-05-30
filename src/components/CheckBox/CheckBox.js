import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({
	isChecked,
	onChange,
	label,
	value,
	userSelectedFilters,
	setUserSelectedFilters,
}) => {
	const handleUserSelect = (selectedValue) => {
		if (userSelectedFilters.indexOf(selectedValue) > -1) {
			setUserSelectedFilters(
				userSelectedFilters.filter((filter) => filter != selectedValue)
			);
		} else {
			setUserSelectedFilters([...userSelectedFilters, selectedValue]);
		}
	};

	return (
		<S.CheckBox>
			<FormControlLabel
				control={
					<Checkbox
						checked={isChecked}
						defaultChecked={false}
						onClick={() => handleUserSelect(label)}
						color="primary"
					/>
				}
				label={label + "- " + value}
			/>
		</S.CheckBox>
	);
};

export default CheckBox;