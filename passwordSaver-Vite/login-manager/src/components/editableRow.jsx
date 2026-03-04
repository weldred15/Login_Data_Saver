import { useState, useEffect } from 'react';
import './editableRow.css';

function EditableRow({ entry, onSave, onCancel }) {
    const [editData, setEditData] = useState({
        password: '',  // Start empty, will be filled by fetch
        notes: entry.notes || ''
    });

    const [loading, setLoading] = useState(false);

    // Fetch password when component mounts
    useEffect(() => {
        handleRetrievePassword();
    }, []); // Empty dependency array = run once on mount

    const handleRetrievePassword = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/entries/${entry.dataId}/password`);
            console.log('Fetching password for entry:', entry.dataId);

            if (!response.ok) {
                throw new Error('Failed to fetch password');
            }

            const data = await response.json();
            console.log('Password fetched:', data);

            // Update editData with the fetched password
            setEditData(prev => ({
                ...prev,
                password: data.password
            }));

        } catch (error) {
            console.error('Error fetching password:', error);
            alert('Failed to retrieve password');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        // Send the updated password and notes
        onSave(entry.dataId, {
            password: editData.password,
            notes: editData.notes
        });
    };

    return (
        <tr className="editable-row">
            <td>{entry.domain}</td>
            <td>{entry.username}</td>
            <td>
                {loading ? (<span>Loading ...</span>) :(
                <input
                    type="text"
                    onLoad={handleRetrievePassword}
                    value={editData.password}
                    onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                    className="edit-input"
                />
                )}
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
