import React from "react";

import PDFViewer from 'pdf-viewer-reactjs';

import { IWorkProps } from "../../types/work";

import { ReactComponent as Basket } from '../../assets/basket.svg'
import { ReactComponent as Edit } from '../../assets/edit.svg'
import './WorkCard.scss';

interface IProps extends IWorkProps {
    onDeleteClick: (id:string) => void;
    onEditClick: (id: string) => void;
}

const NOMINATIONS = {
    game: 'Игра',
    adventure: 'Приключение',
}

const ADVENTURES = {
    scenario: 'Сценарий',
    decoration: 'Декорация',
}

export class WorkCard extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    onCloseClick() {
        // eslint-disable-next-line
        const agreement = confirm("Точно хотите удалить работу \"" + this.props.title + "\"?");
        if (agreement) {
            this.props.onDeleteClick(this.props.id);
        }
    }

    onEditClick() {
        this.props.onEditClick(this.props.id);
    }

    render() {
        const { id, title, nomination, evaluation, system, year, filePath, adventureType } = this.props;
        console.log(adventureType);
        
        return (
            <div className="WorkCard">
                <h1>{title}</h1>
                Номинация: {NOMINATIONS[nomination]} <br/>
                {nomination === 'adventure' && adventureType ? <>Тип приключения: {ADVENTURES[adventureType]} <br/></> : null}
                Оценка: {evaluation} <br/>
                Система: {system} <br/>
                Год конкурса: {year} <br/>
                Файл: {filePath} <br/>
                <div className="WorkCard-Controls">
                    <div className="WorkCard-EditButton" onClick={this.onEditClick}><Edit /></div>
                    <div className="WorkCard-CloseButton" onClick={this.onCloseClick}><Basket /></div>
                </div>
                {/* {filePath ? <PDFViewer
                    document={{
                        url: 'works/download-file?id=' + id,
                    }}
                /> : null} */}
            </div>
        );
    }
}
