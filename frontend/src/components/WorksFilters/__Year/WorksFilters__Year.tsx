import React, { ChangeEvent } from "react";

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { useDispatch } from "react-redux";
import { updateFilters } from "../../../redux/actions";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function WorksFiltersYear() {
    const dispatch = useDispatch();
    const onChange = (_: ChangeEvent<{}>, newValue: string[] | null) => dispatch(updateFilters({
        years: newValue !== null ? newValue : [],
    }));

    return (
        <Autocomplete
            className={'WorksFilters-Filter'}
            onChange={onChange}
            multiple
            id="year-select"
            // @ts-ignore
            options={['2017', '2018', '2019', '2020']}
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
                <TextField {...params} variant="outlined" label="Год конкурса" placeholder="Выберите год" />
            )}
        />
    )
}
