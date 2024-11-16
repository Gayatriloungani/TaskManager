import { API_URL } from "./utils"


export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/tasks`;
    console.log('url ', url)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}
export const GetAllTasks = async () => {
    const url = `${API_URL}/tasks`;
    console.log('url ', url)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    console.log('url ', url)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}


export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    console.log('url ', url)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}


// const fetchWithTimeout = (url, options, timeout = 7000) => {
//     return Promise.race([
//         fetch(url, options),
//         new Promise((_, reject) =>
//             setTimeout(() => reject(new Error('Request timed out')), timeout)
//         ),
//     ]);
// };

// export const CreateTask = async (taskObj) => {
//     const url = `${API_URL}/tasks`;
//     const options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(taskObj),
//     };
//     try {
//         const response = await fetchWithTimeout(url, options);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         return await response.json();
//     } catch (err) {
//         console.error('Error creating task:', err.message);
//         throw err;
//     }
// };

// export const GetAllTasks = async () => {
//     const url = `${API_URL}/tasks`;
//     const options = {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     };
//     try {
//         const response = await fetchWithTimeout(url, options);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         return await response.json();
//     } catch (err) {
//         console.error('Error fetching tasks:', err.message);
//         throw err;
//     }
// };

// export const DeleteTaskById = async (id) => {
//     const url = `${API_URL}/tasks/${id}`;
//     const options = {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     };
//     try {
//         const response = await fetchWithTimeout(url, options);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         return await response.json();
//     } catch (err) {
//         console.error('Error deleting task:', err.message);
//         throw err;
//     }
// };

// export const UpdateTaskById = async (id, reqBody) => {
//     const url = `${API_URL}/tasks/${id}`;
//     const options = {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(reqBody),
//     };
//     try {
//         const response = await fetchWithTimeout(url, options);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         return await response.json();
//     } catch (err) {
//         console.error('Error updating task:', err.message);
//         throw err;
//     }
// };
