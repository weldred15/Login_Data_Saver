import EntryRow from './EntryRow';
import EditableRow from './EditableRow';
import './entryTable.css';

function EntryTable({ entries, editingId, onEdit, onSave, onCancelEdit, onDelete }) {
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Domain</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry) => (
                    editingId === entry.id ? (
                        <EditableRow
                            key={entry.id}
                            entry={entry}
                            onSave={onSave}
                            onCancel={onCancelEdit}
                        />
                    ) : (
                        <EntryRow
                            key={entry.id}
                            entry={entry}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    )
                ))}
                </tbody>
            </table>

            {entries.length === 0 && (
                <div className="no-entries">
                    No login entries yet. Click "Add New Entry" to get started.
                </div>
            )}
        </div>
    );
}

export default EntryTable;