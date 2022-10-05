import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';

const TaskModal = ({refetch, setTaskModal, taskModal}) => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const task = {
            taskName: data.taskName,
            taskDetails: data.taskDetails,
            email: user?.email,
            archive: false,
            checked:false,
        }
        if (user?.email) {
            fetch('http://localhost:5000/task', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.insertedId) {
                        refetch();
                        reset();
                        setTaskModal(!taskModal)
                    }
                })
        }
    };
    return (
        <div>
            {/* <!-- The button to open modal --> */}

            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="task-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add a new task.</h3>
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
                        <input className='btn btn-sm mt-2' type="submit" value="+ Add Task" />
                    </form>
                    <div className="modal-action">
                        <label htmlFor="task-modal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;