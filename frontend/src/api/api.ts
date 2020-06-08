import { IWork, IWorkProps, IReview } from "../types/work";

export function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function fetchData<T>(url: string, params: RequestInit): Promise<Response | undefined> {
    try {
        const data = await fetch(url, params);

        return data;
    } catch (e) {
        alert('Произошла ошибка подключения. Проверьте соединение');
    }
}

export async function getWorks(): Promise<IWorkProps[] | undefined> {
    const data = await fetchData('/api/works', {
        method: 'GET',
    });

    return data && await data.json();
}

export async function getWork(id: string): Promise<IWorkProps | undefined> {
    const data = await fetchData('/api/work?id=' + id, {
        method: 'GET',
    });

    return data && await data.json();
}

export async function postWork(work: IWork, method: string): Promise<void> {
    const formData = new FormData();
    Object.entries(work).forEach(entry => {
        if (entry[1]) {
            formData.append(entry[0], entry[1]);
        }
    })

    const data = await fetchData('/api/work', {
        method,
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + getCookie('access_token'),
        }
    });

    if (data) {
        if (data.ok) {
            alert("Успешно загружено");
        } else {
            let json = await data.json();

            alert("Ошибка: " + json.message);
        }
    }
}

export async function deleteWork(id: string): Promise<boolean | undefined> {
    const data = await fetchData('/api/work?id=' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getCookie('access_token'),
        }
    });

    return data && data.ok;
}

export async function auth(login: string, password: string): Promise<{ access_token?: string } | undefined> {
    const data = await fetchData('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: login,
            password,
        }),
        headers: {
            'Content-Type': 'Application/json'
        }
    });

    return data && await data.json();
}

export async function addReview(review: IReview, id: string) {
    const data = await fetchData('/api/review', {
        method: 'POST',
        body: JSON.stringify({
            ...review,
            id,
        }),
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + getCookie('access_token'),
        }
    });

    return data && await data.json();
}

export async function deleteReview(id: string) {
    const data = await fetchData('/api/review?id=' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getCookie('access_token'),
        }
    });

    return data && await data.json();
}
