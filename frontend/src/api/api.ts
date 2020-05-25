import { IWork, IWorkProps, IReview } from "../types/work";

export function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  export async function getWorks(): Promise<IWorkProps[] | null> {
    try {
        const data = await fetch('/api/works', {
            method: 'GET',
        });

        return data.json();
    } catch (e) {
        return null;
    }
}

export async function getWork(id: string): Promise<IWorkProps | null> {
    try {
        const data = await fetch('/api/work?id=' + id, {
            method: 'GET',
        });

        return data.json();
    } catch (e) {
        return null;
    }
}

export async function postWork(work: IWork): Promise<void> {
    const formData = new FormData();
    Object.entries(work).forEach(entry => {
        if (entry[1]) {
            formData.append(entry[0], entry[1]);
        }
    })

    const data = await fetch('/api/work', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + getCookie('access_token'),
        }
    });

    if (data.ok) {
        alert("Успешно загружено");
    } else {
        let json = await data.json();

        alert("Ошибка: " + json.message);
        console.log(data);
    }
}

export async function updateWork(work: Partial<IWork>): Promise<void> {
    const formData = new FormData();
    
    Object.entries(work).forEach(entry => {
        console.log(typeof entry[1]);
        if (entry[1]) {
            formData.append(entry[0], typeof entry[1] === 'object' ? entry[1] : String(entry[1]));
        }
    });

    const data = await fetch('/api/work', {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + getCookie('access_token'),
        }
    });

    if (data.ok) {
        alert("Успешно загружено");
    } else {
        let json = await data.json();

        alert("Ошибка: " + json.message);
        console.log(data);
    }
}

export async function deleteWork(id: string): Promise<boolean> {
    try {
        await fetch('/api/work?id=' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getCookie('access_token'),
            }
        });

        return true;
    } catch (e) {
        return false;
    }
}

export async function auth(login: string, password: string): Promise<{access_token?: string}> {
    try {
        const data = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: login,
                password,
            }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const res = await data.json();

        return res;
    } catch (e) {
        return {};
    }
}

export async function addReview(review: IReview, id: string) {
    try {
        const data = await fetch(`/api/review`, {
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

        const res = await data.json();

        return res;
    } catch (e) {
        return {};
    }
}
