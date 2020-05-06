import React, { ChangeEvent } from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDispatch } from "react-redux";
import { updateFilters } from "../../../redux/actions";

interface IOption {
    name: string;
    id: string | null;
}

export function WorksFiltersAdventureType() {
    const dispatch = useDispatch();

    const onChange = (_: ChangeEvent<{}>, newValue: IOption | null) => {
        if (newValue?.id === null) {
            dispatch(updateFilters({
                adventureType: null,
            }));

            return;
        }

        dispatch(updateFilters({
            adventureType: newValue?.id,
        }))
    };

    return (
        <Autocomplete
            className='WorksFilters-Filter'
            onChange={onChange}
            id="adventure-type-select"
            options={[{ name: '-', id: null }, { name: 'Сценарий', id: 'scenario' }, { name: 'Декорация', id: 'decoration' }]}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
                option.name
            )}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Тип приключения" placeholder="Выберите тип приключения" />
            )}
        />
    )
}
