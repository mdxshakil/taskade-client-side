import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from './LoadingSpinner';

const TasksRow = ({ task, index, refetchAllTask, setEditTask, setEditTaskModal }) => {
    const { taskName, taskDetails, _id, checked } = task;
    const [taskChecked, setTaskChecked] = useState(!checked);

    const { data, isLoading, refetch } = useQuery('archiveTask', () =>
        fetch(`https://taskade-server.onrender.com/task/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()),
        {
            enabled: false,
        })

        if (isLoading) {
            return <LoadingSpinner></LoadingSpinner>
            
        }

    const handleArchive = () => {
        refetch();
        refetchAllTask();

    }

    const handleEditTask = () => {
        setEditTask(task);
        setEditTaskModal(true);
    }

    // mark as done function
    const handleMarkAsDone = (id, task) => {
        const isChecked = { checked: taskChecked };
        // console.log(isChecked);
        fetch(`https://taskade-server.onrender.com/task/mark/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(isChecked)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetchAllTask();
                    setTaskChecked(checked);
                }
            })
    }


    return (
        <tr>
            <th>{index + 1}</th>
            <td className={checked ? 'line-through text-green-400' : ''}>{taskName}</td>
            <td className={checked ? 'line-through text-green-400' : ''}>{taskDetails}</td>
            <td><label htmlFor="task-edit-modal" onClick={handleEditTask} className="btn modal-button btn-xs btn-success">Edit</label></td>
            <td><button className='btn btn-xs btn-error' onClick={handleArchive}>Archive</button></td>
            <td><input onChange={() => handleMarkAsDone(_id, task)} type="checkbox" className="checkbox" checked={checked && true} /></td>
            {/* <td><button onClick={() => handleMarkAsDone(_id, task)} className="btn btn-sm">Mark</button></td> */}
        </tr>
    );
};

export default TasksRow;