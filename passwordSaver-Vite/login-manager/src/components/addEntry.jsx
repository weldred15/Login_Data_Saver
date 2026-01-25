import { useState } from 'react';
import { INITIAL_ENTRY_STATE } from '../utils/constants';
import './addEntry.css';

function AddEntry({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState(INITIAL_ENTRY_STATE);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.domain || !formData.username || !formData.pword) {
            alert('Domain, username, and password are required!');
            return;
        }

        try {
            await onSubmit(formData);
            setFormData(INITIAL_ENTRY_STATE);
        } catch (error) {
            alert(`Failed to add entry: ${error.message}`);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Login Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Domain Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.domain}
                            onChange={(e) => handleChange('domain', e.target.value)}
                            placeholder="example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Username <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            placeholder="your_username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Password <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.pword}
                            onChange={(e) => handleChange('pword', e.target.value)}
                            placeholder="your_password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            placeholder="Additional notes (optional)"
                            rows={3}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEntry;
