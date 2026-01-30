import './deletePopup.css';

function DeletePopup({ isOpen, entry, onConfirm, onCancel }) {
    if (!isOpen || !entry) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Confirm Deletion</h2>
                <p>
                    Are you sure you want to delete the login for{' '}
                    <strong>{entry.domain}</strong>?
                </p>
                <p className="warning">This action cannot be undone.</p>

                <div className="delete-actions">
                    <button className="delete-confirm-btn" onClick={() => onConfirm(entry.dataId)}>
                        Delete
                    </button>
                    <button className="delete-cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePopup;