import React, { ChangeEvent } from "react";

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../../redux/actions";
import { IStore } from "../../../redux/store";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function WorksFiltersSystem() {
    const systems = useSelector((state: IStore) => state.systems);
    const dispatch = useDispatch();

    const onChange = (_: ChangeEvent<{}>, newValue: string[] | null) => dispatch(updateFilters({
        systems: newValue !== null ? newValue : [],
    }));

    return (
        <Autocomplete
            className={'WorksFilters-Filter'}
            onChange={onChange}
            multiple
            id="system-select"
            // @ts-ignore
            options={systems}
            disableCloseOnSelect
            getOptionLabel={(option) => option.toString()}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Система" placeholder="Выберите систему" />
            )}
        />
    )
}
