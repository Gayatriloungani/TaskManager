import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById} from './api';
import { notify } from './utils';
function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            //upadte api call
            console.log('update api call');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            console.log('create api call')
            //create api call
            handleAddTask();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } =
                await CreateTask(obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const fetchAllTasks = async () => {
        try {
            const { data } =
                await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }
    useEffect(() => {
        fetchAllTasks()
    }, [])


    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
        <div className='d-flex flex-column align-items-center
        w-50 m-auto mt-5'>
            <h1 className='mb-4'>Task Manager App</h1>
            {/* Input and Search box */}
            <div className='d-flex justify-content-between
            align-items-center mb-4 w-100'>
                <div className='input-group flex-grow-1 me-2'>
                    <input type='text'
                        value={input}
                        onChange={
                            (e) => setInput(e.target.value)}
                        className='form-control me-1'
                        placeholder='Add a new Task'
                    />
                    <button
                        onClick={handleTask}
                        className='btn btn-success btn-sm me-2'
                    >
                        <FaPlus className='m-2' />
                    </button>
                </div>

                <div className='input-group flex-grow-1'>
                    <span
                        className='input-group-text'
                    >
                        <FaSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        className='form-control'
                        type='text'
                        placeholder='Search tasks'
                    />
                </div>
            </div>

            {/* List of items */}
            <div className='d-flex flex-column w-100'>
                {
                    tasks.map((item) => (
                        <div key={item._id} className='m-2 p-2 border bg-light
                w-100 rounded-3 d-flex justify-content-between
                align-items-center'>
                            <span
                                className={item.isDone ? 'text-decoration-line-through' : ''}
                            >{item.taskName}
                            </span>

                            <div className=''>
                                <button
                                    onClick={() => handleCheckAndUncheck(item)}
                                    className='btn btn-success
                            btn-sm me-2'
                                    type='button'>
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => setUpdateTask(item)}
                                    className='btn btn-primary
                            btn-sm me-2'
                                    type='button'>
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(item._id)}
                                    className='btn btn-danger
                            btn-sm me-2'
                                    type='button'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Toastify */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default TaskManager;


// import React, { useEffect, useState } from 'react';
// import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
// import { notify } from './utils';

// function TaskManager() {
//     const [input, setInput] = useState('');
//     const [tasks, setTasks] = useState([]); // Main tasks list
//     const [copyTasks, setCopyTasks] = useState([]); // Backup for search
//     const [updateTask, setUpdateTask] = useState(null); // Task to update

//     // Handle task submission (add/update)
//     const handleTask = () => {
//         if (updateTask && input.trim()) {
//             // Update existing task
//             const updatedTask = {
//                 taskName: input,
//                 isDone: updateTask.isDone,
//                 _id: updateTask._id,
//             };
//             handleUpdateTask(updatedTask);
//         } else if (!updateTask && input.trim()) {
//             // Create a new task
//             handleAddTask();
//         }
//         setInput(''); // Clear input field
//     };

//     // Populate input field when a task is selected for updating
//     useEffect(() => {
//         if (updateTask) {
//             setInput(updateTask.taskName);
//         }
//     }, [updateTask]);

//     // Fetch all tasks from the server
//     const fetchAllTasks = async () => {
//         try {
//             const { data } = await GetAllTasks();
//             if (data && Array.isArray(data)) {
//                 setTasks(data);
//                 setCopyTasks(data);
//             } else {
//                 console.error('Invalid response format:', data);
//                 setTasks([]);
//             }
//         } catch (err) {
//             console.error('Error fetching tasks:', err);
//             notify('Failed to fetch tasks', 'error');
//             setTasks([]); // Ensure tasks state is never undefined
//         }
//     };

//     // Add a new task
//     const handleAddTask = async () => {
//         const newTask = { taskName: input, isDone: false };
//         try {
//             const { success, message } = await CreateTask(newTask);
//             if (success) {
//                 notify(message, 'success');
//                 fetchAllTasks(); // Refresh tasks list
//             } else {
//                 notify(message, 'error');
//             }
//         } catch (err) {
//             console.error('Error adding task:', err);
//             notify('Failed to add task', 'error');
//         }
//     };

//     // Update an existing task
//     const handleUpdateTask = async (task) => {
//         try {
//             const { success, message } = await UpdateTaskById(task._id, task);
//             if (success) {
//                 notify(message, 'success');
//                 fetchAllTasks(); // Refresh tasks list
//             } else {
//                 notify(message, 'error');
//             }
//         } catch (err) {
//             console.error('Error updating task:', err);
//             notify('Failed to update task', 'error');
//         }
//     };

//     // Delete a task
//     const handleDeleteTask = async (id) => {
//         try {
//             const { success, message } = await DeleteTaskById(id);
//             if (success) {
//                 notify(message, 'success');
//                 fetchAllTasks(); // Refresh tasks list
//             } else {
//                 notify(message, 'error');
//             }
//         } catch (err) {
//             console.error('Error deleting task:', err);
//             notify('Failed to delete task', 'error');
//         }
//     };

//     // Toggle task completion
//     const handleToggleTask = async (task) => {
//         const updatedTask = { ...task, isDone: !task.isDone };
//         handleUpdateTask(updatedTask);
//     };

//     // Search tasks by name
//     const handleSearch = (e) => {
//         const searchTerm = e.target.value.toLowerCase();
//         const filteredTasks = copyTasks.filter((task) =>
//             task.taskName.toLowerCase().includes(searchTerm)
//         );
//         setTasks(filteredTasks);
//     };

//     // Initial data fetch
//     useEffect(() => {
//         fetchAllTasks();
//     }, []);

//     return (
//         <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
//             <h1 className="mb-4">Task Manager App</h1>

//             {/* Input and Search */}
//             <div className="d-flex justify-content-between align-items-center mb-4 w-100">
//                 <div className="input-group flex-grow-1 me-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         className="form-control"
//                         placeholder="Add a new task"
//                     />
//                     <button onClick={handleTask} className="btn btn-success btn-sm">
//                         <FaPlus />
//                     </button>
//                 </div>
//                 <div className="input-group flex-grow-1">
//                     <span className="input-group-text">
//                         <FaSearch />
//                     </span>
//                     <input
//                         onChange={handleSearch}
//                         className="form-control"
//                         type="text"
//                         placeholder="Search tasks"
//                     />
//                 </div>
//             </div>

//             {/* Task List */}
//             <div className="d-flex flex-column w-100">
//                 {tasks && tasks.length > 0 ? (
//                     tasks.map((task) => (
//                         <div
//                             key={task._id}
//                             className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
//                         >
//                             <span
//                                 className={task.isDone ? 'text-decoration-line-through' : ''}
//                             >
//                                 {task.taskName}
//                             </span>
//                             <div>
//                                 <button
//                                     onClick={() => handleToggleTask(task)}
//                                     className="btn btn-success btn-sm me-2"
//                                 >
//                                     <FaCheck />
//                                 </button>
//                                 <button
//                                     onClick={() => setUpdateTask(task)}
//                                     className="btn btn-primary btn-sm me-2"
//                                 >
//                                     <FaPencilAlt />
//                                 </button>
//                                 <button
//                                     onClick={() => handleDeleteTask(task._id)}
//                                     className="btn btn-danger btn-sm"
//                                 >
//                                     <FaTrash />
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center">No tasks available</div>
//                 )}
//             </div>

//             {/* Toast Notifications */}
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//             />
//         </div>
//     );
// }

// export default TaskManager;








