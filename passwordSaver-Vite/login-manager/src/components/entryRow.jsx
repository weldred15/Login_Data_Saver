import './entryRow.css';
import { formatDate } from '../utils/reformatDate.js';
function EntryRow({ entry, onEdit, onDelete }) {

    return (
        <tr className="entry-row">
            <td>{entry.domain}</td>
            <td>{entry.username}</td>
            <td>
                <span className="password-dots">{'•'.repeat(8)} </span>
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