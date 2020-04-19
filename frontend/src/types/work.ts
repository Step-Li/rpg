export interface IWork {
    id?: string;
    title: string;
    year: string;
    evaluation: string;
    system: string;
    nomination: 'game' | 'adventure';
    adventureType?: 'scenario' | 'decoration';
    file: File;
}

export interface IWorkProps extends Omit<IWork, 'file'> {
    id: string;
    filePath: string;
}
