export interface IWork {
    id?: string;
    title: string;
    author?: string;
    year: string;
    evaluation: number;
    system?: string;
    nomination: 'game' | 'adventure';
    adventureType?: 'scenario' | 'decoration' | null;
    file?: File;
    description?: string;
    finalUrl?: string;
    imgUrl?: string;
    reviews?: IReview[];
}

export interface IWorkProps extends Omit<IWork, 'file'> {
    id: string;
    filePath: string;
}

export interface IReview {
    text: string;
    author: string;
    positive?: string;
    negative?: string;
    reviewId?: string;
}
