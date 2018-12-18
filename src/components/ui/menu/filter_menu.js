import React from 'react';
import {Add, Reset, ShowHide, ShowHideMap} from "../icons";

const FilterMenu = ({ onReset, onAdd, onShow, onMapShow }) => (
	<React.Fragment>
		{ onShow && <ShowHide onClick={onShow} />}
		{ onMapShow && <ShowHideMap onClick={onMapShow} />}
		{ onAdd && <Add onClick={onAdd} />}
		{ onReset && <Reset onClick={onReset} />}
	</React.Fragment>
);

export default FilterMenu;