export interface IWork {
    id?: string;
    title: string;
    year: string;
    evaluation: number;
    system: string;
    nomination: 'game' | 'adventure';
    adventureType?: 'scenario' | 'decoration' | null;
    file?: File;
    description?: string;
    finalUrl?: string;
    imgUrl?: string;
}

export interface IWorkProps extends Omit<IWork, 'file'> {
    id: string;
    filePath: string;
    reviews?: IReview[];
}

export interface IReview {
    text: string;
    author: string;
}
