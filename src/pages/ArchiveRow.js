import React from 'react';

const ArchiveRow = ({task, index, refetch}) => {
    const {taskName, taskDetails} = task;
    return (
        <tr>
        <th>{index + 1}</th>
        <td>{taskName}</td>
        <td>{taskDetails}</td>
    </tr>
    );
};

export default ArchiveRow;