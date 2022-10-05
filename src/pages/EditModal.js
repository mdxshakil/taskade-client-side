import React from 'react';
import { useForm } from 'react-hook-form';

const EditModal = ({ editTask, refetch, setEditTaskModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const updatedTask = {
            taskName:data.taskName,
            taskDetails:data.taskDetails
        }
        fetch(`https://taskade-server.onrender.com/task/update/${editTask?._id}`,{
            method: 'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json',
            },
            body:JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                refetch();
                setEditTaskModal(false);
            }
        })
    };
    return (
        <div>
            {/* <!-- The button to open modal --> */}

            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="task-edit-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Task Name" className="input input-bordered w-full max-w-xs mb-2" {...register('taskName', {
                            required: {
                                value: true,
                                message: 'Task name is required'
                            },
                            maxLength: {
                                value: 15,
                                message: 'Keep task name below 15 letters'
                            }
                        })} />
                        {(errors.taskName?.type === 'required' || errors.taskName?.type === 'maxLength') && <p className='text-red-500'>{errors.taskName?.message}</p>}
                        <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" {...register('taskDetails', {
                            required: {
                                value: true,
                                message: 'Description is required'
                            },
                            maxLength: {
                                value: 35,
                                message: 'Keep the task details shorter and simple'
                            }
                        })} />
                        {(errors.taskDetails?.type === 'required' || errors.taskDetails?.type === 'maxLength') && <p className='text-red-500'>{errors.taskDetails?.message}</p>}
                        <br />
                        <input className='btn btn-sm mt-2' type="submit" value="+ Update" />
                    </form>
                    <div className="modal-action">
                        <label htmlFor="task-edit-modal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;