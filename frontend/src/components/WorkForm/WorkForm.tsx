import React, { FormEvent, ChangeEvent } from "react";

import './WorkForm.scss';
import { postWork, updateWork } from "../../api/api";
import { IWork, IWorkProps } from "../../types/work";

interface IProps {
    onWorkPost: () => void;
    editableWork?: IWorkProps;
}

export class WorkForm extends React.Component<IProps, Partial<IWork>> {
    constructor(props: IProps) {
        super(props);

        const { editableWork } = this.props;

        this.state = editableWork || {
            nomination: 'game',
            year: '2020',
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps: IProps, prevState: Partial<IWork>) {
        if (this.props.editableWork && prevProps.editableWork !== this.props.editableWork) {
            this.setState(this.props.editableWork);
        }
    }
    
    async onSubmit(e: FormEvent) {
        e.preventDefault();

        const { id, file, title, nomination, evaluation, year, system, adventureType } = this.state;

        if (!title || !nomination || !evaluation || !year|| !system) {
            alert('Не все поля заполнены');
            return;
        }

        if (id) {
            updateWork({
                id,
                title,
                nomination,
                evaluation,
                year,
                system,
                adventureType,
                file,
            }).then(() =>{
                this.props.onWorkPost();
            });
            return;
        }

        if (!file) {
            alert('Прикрепите файл');
            return;
        }

        postWork({
            file,
            title,
            nomination,
            evaluation,
            year,
            system,
            adventureType
        }).then(() => {
            this.props.onWorkPost();
        });
    }

    onFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files?.item(0);
        if (file) {
            this.setState({
                file,
            })
        }
    }

    onInputChange(e: ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

    onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        // @ts-ignore
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

    render() {
        return (
            <form className="WorkForm">
                <h1>{this.state.id ? 'Редактирование работы ' + this.state.title : 'Добавить работу'}</h1>
                <label>Название работы</label>
                <input name='title' type='text' value={this.state.title} onChange={this.onInputChange} />
                <label>Год конкурса</label>
                <select name='year' value={this.state.year} onChange={this.onSelectChange} >
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                </select>
                <label>Система</label>
                <input name='system' type='text' value={this.state.system} onChange={this.onInputChange} />
                <label>Оценка</label>
                <input name='evaluation' type='string' value={this.state.evaluation} onChange={this.onInputChange} />
                <label>Номинация</label>
                <select name='nomination' value={this.state.nomination} onChange={this.onSelectChange} >
                    <option value='adventure'>Приключение</option>
                    <option value='game'>Игра </option>
                </select>
                {this.state.nomination === 'adventure' ? <>
                    <label>Тип приключения</label>
                    <select name='adventureType' value={this.state.adventureType} onChange={this.onSelectChange} >
                        <option value='null'>-</option>
                        <option value='scenario'>Сценарий</option>
                        <option value='decoration'>Декорация</option>
                    </select>
                </> : null}
                <label>Файл работы</label>
                <input name='file' type='file' onChange={this.onFileChange} />
                <input type='submit' name='submit' onClick={this.onSubmit} value="Отправить" />
            </form>
        );
    }
}