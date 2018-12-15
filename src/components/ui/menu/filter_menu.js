import React from 'react';
import {Add, Reset, ShowHide} from "../icons";

const FilterMenu = ({ onReset, onAdd, onShow }) => (
	<React.Fragment>
		{ onShow && <ShowHide onClick={onShow} />}
		{ onAdd && <Add onClick={onAdd} />}
		{ onReset && <Reset onClick={onReset} />}
	</React.Fragment>
);

export default FilterMenu;