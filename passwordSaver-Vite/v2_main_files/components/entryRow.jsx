import './entryRow.css';
import React from "react";
import { formatDate } from '../utils/reformatDate.js';
function EntryRow({ entry, onEdit, onDelete }) {

    const [showPw, setShowPw] = React.useState(false);

    const changePwVisibilty = () =>{
        setShowPw(!showPw);
    }

    return (
        <tr className="entry-row">
            <td>{entry.domain}</td>
            <td>{entry.username}</td>
            <td>
                <span className="password-dots">{showPw ?  entry.pword: '•'.repeat(8)}</span>
                <button className="pwVis-btn" onClick={changePwVisibilty}>👁️</button>
            </td>
            <td>{entry.notes || '-'}</td>
            <td>{formatDate(entry.created_at)}</td>
            <td>
                <div className="action-buttons">
                    <button className="edit-btn" onClick={() => onEdit(entry)}>
                        Edit
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(entry)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EntryRow;