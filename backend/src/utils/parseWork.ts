import { Work } from "../modules/works/work.entity";

interface IGetWorkResult {
    work?: Omit<Work, 'filePath' | 'reviews' >;
    errors?: string[];
}

export function parseWork(props: Partial<Work>): IGetWorkResult {  
    const {
        title, nomination, year, evaluation,
        system, adventureType, description,
        imgUrl, finalUrl, id, author,
    } = props;

    const errors = [];

    if (!title) {
        errors.push('нет заголовка');
    }

    if (!nomination) {
        errors.push('нет номинации');
    }

    if (!year) {
        errors.push('не указан год');
    }

    if (!evaluation) {
        errors.push('не указана оценка');
    }

    if (errors.length > 0) {
        return {
            errors,
        };
    }

    return {
        work: {
            id,
            title,
            author,
            nomination,
            year,
            evaluation,
            system,
            adventureType: adventureType === 'scenario' || adventureType === 'decoration' ? adventureType : null,
            description,
            imgUrl,
            finalUrl,
            // reviews: [],
        },
        errors: [],
    };
}