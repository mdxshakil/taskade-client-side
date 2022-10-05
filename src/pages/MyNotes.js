import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LoadingSpinner from './LoadingSpinner';
import TaskModal from './TaskModal';
import TasksRow from './TasksRow';
import { useQuery } from 'react-query';
import EditModal from "./EditModal";

const MyNotes = () => {
    const [user, loading] = useAuthState(auth);
    const [taskModal, setTaskModal] = useState(false);
    const [editTaskModal, setEditTaskModal] = useState(false);
    const [editTask, setEditTask] = useState({});

    //load tasks
    const { data: tasks, isLoading, refetch, error } = useQuery('usertasks', () =>
        fetch(`http://localhost:5000/task/${user?.email}`,{
            method: 'GET',
            headers:{
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (error) {
        console.log(error);
    }

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <h1 className='text-3xl mt-4 mb-2 ml-4'>My Tasks:</h1>
            <p className='ml-4 mb-2'>Total pending tasks: {tasks.length}</p>
            <label onClick={() => setTaskModal(!taskModal)} htmlFor="task-modal" className="btn modal-button btn-sm mb-4 ml-4">+ Add new task</label>
            {
                tasks.length === 0 ? <p className='text-2xl text-center my-48'>You have no tasks</p> :
                    <div className="overflow-x-auto px-4">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Task</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    <th>Mark as done</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map((task, index) => <TasksRow
                                        key={task._id}
                                        task={task}
                                        index={index}
                                        refetchAllTask={refetch}
                                        setEditTask={setEditTask}
                                        setEditTaskModal={setEditTaskModal}></TasksRow>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
            {taskModal && <TaskModal refetch={refetch} setTaskModal={setTaskModal} taskModal={taskModal}></TaskModal>}
            {editTaskModal && <EditModal editTask={editTask} refetch={refetch} setEditTaskModal={setEditTaskModal}></EditModal>}
        </div>
    );
};

export default MyNotes;