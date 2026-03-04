import { useState } from 'react';
import './editableRow.css';

function EditableRow({ entry, onSave, onCancel }) {
    const [editData, setEditData] = useState({
        password: entry.pword,
        notes: entry.notes
    });

    const handleSave = () => {
        onSave(entry.dataId, editData);
    };

    return (
        <tr className="editable-row">
            <td>{entry.domain}</td>
            <td>{entry.username}</td>
            <td>
                <input
                    type="text"
                    value={editData.pword}
                    onChange={(e) => setEditData({ ...editData, pword: e.target.value })}
                    className="edit-input"
                />
            </td>
            <td>
        <textarea
            value={editData.notes}
            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
            className="edit-textarea"
            rows={2}
        />
            </td>
            <td>
                <div className="action-buttons">
                    <button className="save-btn" onClick={handleSave}>
                        ✓
                    </button>
                    <button className="cancel-edit-btn" onClick={onCancel}>
                        ✕
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EditableRow;