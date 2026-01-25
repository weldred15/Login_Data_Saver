/*import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/api/entries';

function App() {
  const [entries, setEntries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    domain: '',
    username: '',
    pword: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ password: '', notes: '' });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    if (!newEntry.domain || !newEntry.username || !newEntry.pword) {
      const data = newEntry.domain + " | " + newEntry.username + " | " + newEntry.pword ;
      alert(data);
      alert('Domain, username, and password are required!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });

      if (response.ok) {
        await loadEntries();
        setNewEntry({ domain: '', username: '', pword: '', notes: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditData({ password: entry.pword, notes: entry.notes });
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });

      if (response.ok) {
        await loadEntries();
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        await loadEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  return (
      <div className="app-container">
        <h1>Login Manager</h1>

        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          + Add New Entry
        </button>

        {showAddForm && (
            <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Login Entry</h2>
                <form onSubmit={handleAddEntry}>
                  <div className="form-group">
                    <label>Domain Name <span className="required">*</span></label>
                    <input
                        type="text"
                        value={newEntry.domain}
                        onChange={(e) => setNewEntry({ ...newEntry, domain: e.target.value })}
                        placeholder="example.com"
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label>Username <span className="required">*</span></label>
                    <input
                        type="text"
                        value={newEntry.username}
                        onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })}
                        placeholder="your_username"
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password <span className="required">*</span></label>
                    <input
                        type="password"
                        value={newEntry.pword}
                        onChange={(e) => setNewEntry({ ...newEntry, pword: e.target.value })}
                        placeholder="your_password"
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                        value={newEntry.notes}
                        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                        placeholder="Additional notes (optional)"
                        rows={3}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}

        <div className="table-container">
          <div>

          </div>
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
                <tr key={entry.id}>
                  <td>{entry.domain}</td>
                  <td>{entry.username}</td>
                  <td>
                    {editingId === entry.id ? (
                        <input
                            type="text"
                            value={editData.pword}
                            onChange={(e) => setEditData({ ...editData, pword: e.target.value })}
                            className="edit-input"
                        />
                    ) : (
                        <span className="password-dots">{'•'.repeat(8)}</span>
                    )}
                  </td>
                  <td>
                    {editingId === entry.id ? (
                        <textarea
                            value={editData.notes}
                            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                            className="edit-textarea"
                            rows={2}
                        />
                    ) : (
                        <span>{entry.notes || '-'}</span>
                    )}
                  </td>
                  <td>
                    {editingId === entry.id ? (
                        <div className="action-buttons">
                          <button className="save-btn" onClick={() => saveEdit(entry.dataId)}>
                            ✓
                          </button>
                          <button className="cancel-edit-btn" onClick={() => setEditingId(null)}>
                            ✕
                          </button>
                        </div>
                    ) : (
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => startEdit(entry)}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => deleteEntry(entry.dataId)}>
                            Delete
                          </button>
                        </div>
                    )}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {entries.length === 0 && (
              <div className="no-entries">
                No login entries yet. Click "Add New Entry" to get started.
              </div>
          )}
        </div>
      </div>
  );
}

export default App*/

import { useState, useEffect } from 'react';
import AddEntry from './components/addEntry';
import EntryTable from './components/entryTable';
import DeletePopup from './components/deletePopup';
import { api } from './services/api';
import './App.css';

function App() {
    const [entries, setEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const data = await api.getEntries();
            setEntries(data);
        } catch (error) {
            alert('Failed to load entries. Please try again.');
        }
    };

    const handleAddEntry = async (entryData) => {
        await api.addEntry(entryData);
        await loadEntries();
        setShowAddForm(false);
    };

    const handleEdit = (entry) => {
        setEditingId(entry.id);
    };

    const handleSave = async (id, updateData) => {
        await api.updateEntry(id, updateData);
        await loadEntries();
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleDeleteClick = (entry) => {
        setDeleteTarget(entry);
    };

    const handleDeleteConfirm = async (id) => {
        await api.deleteEntry(id);
        await loadEntries();
        setDeleteTarget(null);
    };

    const handleDeleteCancel = () => {
        setDeleteTarget(null);
    };

    return (
        <div className="app-container">
            <h1>Login Manager</h1>

            <button className="add-btn" onClick={() => setShowAddForm(true)}>
                + Add New Entry
            </button>

            <AddEntry
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSubmit={handleAddEntry}
            />

            <EntryTable
                entries={entries}
                editingId={editingId}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancelEdit={handleCancelEdit}
                onDelete={handleDeleteClick}
            />

            <DeletePopup
                isOpen={!!deleteTarget}
                entry={deleteTarget}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </div>
    );
}

export default App;