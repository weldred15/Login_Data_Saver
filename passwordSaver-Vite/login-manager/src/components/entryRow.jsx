// src/components/EntryRow.jsx
import { useState } from 'react';
import './entryRow.css';
import { formatDate } from '../utils/reformatDate.js';
import { api } from '../services/api';

function EntryRow({ entry, onEdit, onDelete }) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRevealPassword = async () => {
        if (showPassword) {
            // Hide password
            setShowPassword(false);
            setPassword('');
            return;
        }

        // Fetch and decrypt password
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/entries/${entry.dataId}/password`);

            if (!response.ok) {
                throw new Error('Failed to fetch password');
            }

            const data = await response.json();
            setPassword(data.password);
            setShowPassword(true);
        } catch (error) {
            console.error('Error fetching password:', error);
            alert('Failed to retrieve password');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!password) return;

        try {
            await navigator.clipboard.writeText(password);
            alert('Password copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            alert('Failed to copy password');
        }
    };

    return (
        <tr className="entry-row">
            <td>{entry.domain}</td>
            <td>{entry.username}</td>
            <td>
                <div className="password-cell">
                    {showPassword ? (
                        <span className="password-text">{password}</span>
                    ) : (
                        <span className="password-dots">{'•'.repeat(8)}</span>
                    )}
                    <button
                        className="reveal-btn"
                        onClick={handleRevealPassword}
                        disabled={loading}
                        title={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {loading ? '⏳' : showPassword ? '🙈' : '👁️'}
                    </button>
                    {showPassword && (
                        <button
                            className="copy-btn"
                            onClick={copyToClipboard}
                            title="Copy to clipboard"
                        >
                            📋
                        </button>
                    )}
                </div>
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
