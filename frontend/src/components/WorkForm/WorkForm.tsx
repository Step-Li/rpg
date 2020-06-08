import React, { FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { Typography, Button, MenuItem, Select, InputLabel, FormControl, TextField } from "@material-ui/core";

import { IWorkProps, IWork } from "../../types/work";
import { useStoreState } from "../../hooks/useStoreState";
import { postWork } from "../../api/api";
import { setNeedWorksFetch } from "../../redux/actions";

import './WorkForm.scss';

interface IProps {
    onWorkPost?: () => void;
    editableWork?: IWorkProps;
}

interface ISelectProps {
    name?: string;
    value: unknown;
}

interface IStore extends Omit<Partial<IWork>, 'adventureType'> {
    adventureType?: 'scenario' | 'decoration' | null | 'null';
}

export function WorkForm(props: IProps) {
    const dispatch = useDispatch();
    const [state, setState] = useStoreState<IStore>(props.editableWork || {
        year: '2019',
        nomination: 'game',
        evaluation: 0,
        adventureType: 'null',
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { title, author, nomination, evaluation, year, system, file, adventureType, description, imgUrl } = state;

        if (!title || !nomination || evaluation === undefined || !year) {
            alert('Не все поля заполнены');
            return;
        }

        const work: IWork = {
            title,
            author,
            nomination,
            evaluation,
            year,
            system,
            file,
            description,
            imgUrl,
            finalUrl,
        }

        if (adventureType !== 'null') {
            work.adventureType = adventureType;
        }

        if (props.editableWork?.id) {
            work.id = props.editableWork.id;

            postWork(work, 'PUT').then(() => {
                dispatch(setNeedWorksFetch(true));
                if (props.onWorkPost) props.onWorkPost();
            });
            return;
        }

        if (!file) {
            alert('Прикрепите файл');
            return;
        }

        postWork(work, 'POST').then(() => {
            dispatch(setNeedWorksFetch(true));
            if (props.onWorkPost) props.onWorkPost();
        });
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.item(0);
        if (file) {
            setState({ file });
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ [e.target.name]: e.target.value });
    };


    const onSelectChange = (e: ChangeEvent<ISelectProps>) => {
        if (e.target.name !== undefined && e.target.value !== undefined) {
            setState({
                [e.target.name]: e.target.value,
            })
        }
    }

    const { title, author, year, nomination, adventureType, evaluation, system, description, imgUrl, finalUrl } = state;

    return (
        <form className="WorkForm">
            <Typography id="form-title" color="textPrimary" variant="h5" component="h2" gutterBottom>
                {props.editableWork ? 'Редактирование работы ' + props.editableWork.title : 'Добавить работу'}
            </Typography>
            <TextField
                error={!title || title.length <= 0}
                id="work-title"
                label="Название работы"
                value={title}
                variant="outlined"
                name="title"
                onChange={onInputChange}
                size='small'
            />
            <TextField
                id="work-author"
                label="Автор"
                value={author}
                variant="outlined"
                name="author"
                onChange={onInputChange}
                size='small'
            />
            <TextField
                id="work-image"
                label="Обложка"
                value={imgUrl}
                helperText="Введите адрес картинки"
                variant="outlined"
                name="imgUrl"
                onChange={onInputChange}
                size='small'
            />
            <TextField
                id="final-work"
                label="Cсылка на итоговую версию игры"
                value={finalUrl}
                helperText="Введите адрес игры"
                variant="outlined"
                name="finalUrl"
                onChange={onInputChange}
                size='small'
            />
            <div className="WorkForm-Row">
            <FormControl variant="outlined">
                <InputLabel id="work-year-label">Год конкурса</InputLabel>
                <Select
                    labelId="work-year-label"
                    id="work-year"
                    value={year}
                    onChange={onSelectChange}
                    label="Год конкурса"
                    name="year"
                >
                    <MenuItem value={'2017'}>2017</MenuItem>
                    <MenuItem value={'2018'}>2018</MenuItem>
                    <MenuItem value={'2019'}>2019</MenuItem>
                    <MenuItem value={'2020'}>2020</MenuItem>
                </Select>
            </FormControl>
            <TextField
                error={evaluation === undefined || evaluation < 0}
                type="number"
                id="work-evaluation"
                label="Оценка"
                value={evaluation}
                variant="outlined"
                name="evaluation"
                size='small'
                onChange={onInputChange}
            />
            </div>
            <TextField
                id="work-system"
                label="Система"
                value={system}
                variant="outlined"
                name="system"
                size='small'
                onChange={onInputChange}
            />
            <div className="WorkForm-Row">
            <FormControl variant="outlined">
                <InputLabel id="work-nomination-label">Номинация</InputLabel>
                <Select
                    labelId="work-nomination-label"
                    id="work-nomination"
                    value={nomination}
                    onChange={onSelectChange}
                    label="Номинация"
                    name="nomination"
                >
                    <MenuItem value={'game'}>Игра</MenuItem>
                    <MenuItem value={'adventure'}>Приключение</MenuItem>
                </Select>
            </FormControl>
            {nomination === 'adventure' ?
                <FormControl variant="outlined">
                    <InputLabel id="work-adventure-type-label">Тип приключения</InputLabel>
                    <Select
                        labelId="work-adventure-type-label"
                        id="work-adventure-type"
                        value={adventureType}
                        onChange={onSelectChange}
                        label="Тип приключения"
                        name="adventureType"
                    >
                        <MenuItem value={'null'}>-</MenuItem>
                        <MenuItem value={'scenario'}>Сценарий</MenuItem>
                        <MenuItem value={'decoration'}>Декорация</MenuItem>
                    </Select>
                </FormControl> : null
            }
            </div>
            <TextField
                multiline
                rowsMax={6}
                id="work-description"
                label="Описание"
                value={description}
                variant="outlined"
                name="description"
                size='small'
                onChange={onInputChange}
            />
            <Typography id="form-file" color="textPrimary">
                Файл
            </Typography>
            <input className='FileInput' name='file' type='file' onChange={onFileChange} />
            <Button variant="contained" name='submit' onClick={onSubmit}>Отправить</Button>
        </form>
    );
}