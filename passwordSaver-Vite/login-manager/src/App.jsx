import { useState, useEffect } from 'react';
import AddEntry from './components/addEntry';
import EntryTable from './components/entryTable';
import DeletePopup from './components/deletePopup';
import BackgroundAlteringComponent from './components/backgroundAlteringComponent';
import { api } from './services/api';
import './App.css';

function App() {
    const [entries, setEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [bgSettings, setBgSettings] = useState({
        color1: '#03fc5e',
        color2: '#764ba2',
        degree: 135
    });

    // Add this useEffect
    useEffect(() => {
        document.body.style.background =
            `linear-gradient(${bgSettings.degree}deg, ${bgSettings.color1} 0%, ${bgSettings.color2} 100%)`;
        document.body.style.backgroundAttachment = 'fixed';
    }, [bgSettings]);

    const loadEntries = async () => {
        try {
            const data = await api.getEntries();
            console.log('Loaded entries:', data); // ← Add this
            console.log('First entry:', data[0]); // ← And this
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
        setEditingId(entry.dataId);
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
            <BackgroundAlteringComponent onSettingsChange={setBgSettings}> Alter Background </BackgroundAlteringComponent>

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