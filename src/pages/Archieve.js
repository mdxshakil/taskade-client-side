import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LoadingSpinner from './LoadingSpinner';
import { useQuery } from 'react-query';
import ArchiveRow from './ArchiveRow';

const Archieve = () => {
    // const [tasks, setTasks] = useState([]);
    const [user, loading] = useAuthState(auth);
    //load archived tasks
    const {data:tasks, isLoading, refetch, error} = useQuery('archivedtasks', ()=>
    fetch(`http://localhost:5000/archive/${user?.email}`,{
        method:'GET',
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
            <h1 className='text-3xl my-4'>My Archived Tasks:</h1>
            {
                tasks.length === 0 ? <p className='text-2xl text-center my-48'>You have no archived tasks</p> :
                    <div className="overflow-x-auto px-4">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Task</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map((task, index) => <ArchiveRow
                                        key={task._id}
                                        task={task}
                                        index={index}
                                        refetch={refetch}></ArchiveRow>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default Archieve;