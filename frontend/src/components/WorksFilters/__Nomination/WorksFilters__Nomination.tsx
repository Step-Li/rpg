import React, { ChangeEvent } from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDispatch } from "react-redux";
import { updateFilters } from "../../../redux/actions";

interface IOption {
    name: string;
    id: string;
}

export function WorksFiltersNomination() {
    const dispatch = useDispatch();

    const onChange = (_: ChangeEvent<{}>, newValue: IOption | null) => dispatch(updateFilters({
        nomination: newValue?.id,
    }));

    return (
        <Autocomplete
            className={'WorksFilters-Filter'}
            onChange={onChange}
            id="nomination-select"
            options={[{ name: 'Игра', id: 'game' }, { name: 'Приключение', id: 'adventure' }]}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
                option.name
            )}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Номинация" placeholder="Выберите номинацию" />
            )}
        />
    )
}
