import { IWork, IWorkProps } from "../types/work";

export async function getWorks(): Promise<IWorkProps[] | null> {
    try {
        const data = await fetch('works', {
            method: 'GET',
        });

        return data.json();
    } catch (e) {
        return null;
    }
}

export async function postWork(work: IWork): Promise<void> {
    const formData = new FormData();
    Object.entries(work).forEach(entry => formData.append(entry[0], entry[1]))

    const data = await fetch('works', {
        method: 'POST',
        body: formData
    });

    if (data.ok) { // если HTTP-статус в диапазоне 200-299
        alert("Успешно загружено");
    } else {
        // let json = await data.json();

        // alert("Ошибка: " + json.message);
        console.log(data);
    }
}

export async function updateWork(work: Partial<IWork>): Promise<void> {
    const formData = new FormData();
    Object.entries(work).forEach(entry => {
        if (entry[1]) {
            formData.append(entry[0], entry[1]);
        }
    });

    const data = await fetch('works', {
        method: 'PUT',
        body: formData
    });

    if (data.ok) { // если HTTP-статус в диапазоне 200-299
        alert("Успешно загружено");
    } else {
        // let json = await data.json();

        // alert("Ошибка: " + json.message);
        console.log(data);
    }
}

export async function deleteWork(id: string): Promise<boolean> {
    try {
        await fetch('works?id=' + id, {
            method: 'DELETE',
        });

        return true;
    } catch (e) {
        return false;
    }
}
