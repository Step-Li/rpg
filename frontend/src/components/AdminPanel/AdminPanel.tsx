import React from "react";

import { IWorkProps } from "../../types/work";
import { WorkCard } from "../WorkCard/WorkCard";
import { getWorks, deleteWork } from "../../api/api";
import { WorkForm } from "../WorkForm/WorkForm";

import './AdminPanel.scss';

interface IState {
    loaded: boolean;
    works: IWorkProps[];
    editable?: IWorkProps;
}

export class AdminPanel extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            loaded: false,
            works: [],
        }

        this.deleteClickHandler = this.deleteClickHandler.bind(this);
        this.getWorks = this.getWorks.bind(this);
        this.startEditing = this.startEditing.bind(this);
    }

    componentDidMount() {
        this.getWorks();
    }

    async deleteClickHandler(id: string) {
        const deleted = await deleteWork(id);

        if (deleted) {
            this.getWorks();
        }
    }

    async getWorks() {
        const works = await getWorks();

        if (works) {
            this.setState({
                loaded: true,
                works,
            });
        } else {
            this.setState({
                loaded: true,
            })
        }
    }

    startEditing(id: string) {
        console.log("start");
        
        this.setState(prevState => ({
            editable: prevState.works.find(work => work.id === id),
        }));
    }

    renderList() {
        const { loaded, works } = this.state;
        return loaded ? (
            <div className="WorksList">
                {works ? works.map(work => (
                    <WorkCard
                        key={work.id}
                        {...work}
                        onDeleteClick={this.deleteClickHandler}
                        onEditClick={this.startEditing}
                    />)
                ) : 'Работы не найдены'}
            </div>
        ) : <div className="WorksList">Loading...</div>;
    }

    render() {
        return (
            <div className="AdminPanel">
                <WorkForm onWorkPost={this.getWorks} editableWork={this.state.editable} />
                {this.renderList()}
            </div>
        );
    }
}