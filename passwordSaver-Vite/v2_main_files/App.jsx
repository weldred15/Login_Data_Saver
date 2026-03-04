import { useState, useEffect, useMemo } from 'react';
import TableToolbar from './components/TableToolbar';
import EntryTable from './components/EntryTable';
import AddEntry from './components/AddEntry';
import DeletePopup from './components/DeletePopup';
import BackgroundAlteringComponent from './components/BackgroundAlteringComponent';
import { api } from './services/api';
import './App.css';

function App() {
    const [entries, setEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        searchField: 'all',
        sortBy: 'date',
        sortOrder: 'desc'
    });

    const [bgSettings, setBgSettings] = useState({
        color1: '#03fc5e',
        color2: '#764ba2',
        degree: 135
    });

    useEffect(() => {
        document.body.style.background =
            `linear-gradient(${bgSettings.degree}deg, ${bgSettings.color1} 0%, ${bgSettings.color2} 100%)`;
        document.body.style.backgroundAttachment = 'fixed';
    }, [bgSettings]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const data = await api.getEntries();
            setEntries(data);
        } catch (error) {
            alert('Failed to load entries:'+ error.message +'\n Please try again.');
        }
    };

    // Filter and sort entries using useMemo for performance
    const filteredEntries = useMemo(() => {
        let filtered = [...entries];

        // Apply search filter
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();

            filtered = filtered.filter(entry => {
                switch (filters.searchField) {
                    case 'domain':
                        return entry.domain.toLowerCase().includes(searchLower);
                    case 'username':
                        return entry.username.toLowerCase().includes(searchLower);
                    case 'notes':
                        return (entry.notes || '').toLowerCase().includes(searchLower);
                    case 'all':
                    default:
                        return (
                            entry.domain.toLowerCase().includes(searchLower) ||
                            entry.username.toLowerCase().includes(searchLower) ||
                            (entry.notes && entry.notes.toLowerCase().includes(searchLower))
                        );
                }
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let compareA, compareB;

            switch (filters.sortBy) {
                case 'domain':
                    compareA = a.domain.toLowerCase();
                    compareB = b.domain.toLowerCase();
                    break;
                case 'username':
                    compareA = a.username.toLowerCase();
                    compareB = b.username.toLowerCase();
                    break;
                case 'date':
                default:
                    compareA = new Date(a.created_at).getTime();
                    compareB = new Date(b.created_at).getTime();
                    break;
            }

            if (filters.sortOrder === 'asc') {
                return compareA > compareB ? 1 : -1;
            } else {
                return compareA < compareB ? 1 : -1;
            }
        });

        return filtered;
    }, [entries, filters]);

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
            <BackgroundAlteringComponent onSettingsChange={setBgSettings} />

            <h1>Login Manager</h1>

            <div className='add-btn-container'>
                <button className="add-btn" onClick={() => setShowAddForm(true)}>
                    + Add New Entry
                </button>

                <AddEntry
                    isOpen={showAddForm}
                    onClose={() => setShowAddForm(false)}
                    onSubmit={handleAddEntry}
                />

            </div>

            <div className='toolbar'>
                <TableToolbar
                    onFilterChange={setFilters}
                    totalEntries={entries.length}
                    filteredEntries={filteredEntries.length}
                />
            </div>

            <div className="table-wrapper">
                <EntryTable
                    entries={filteredEntries}
                    editingId={editingId}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancelEdit={handleCancelEdit}
                    onDelete={handleDeleteClick}
                />

                {filteredEntries.length === 0 && entries.length > 0 && (
                    <div className="no-results">
                        <p>No entries match your search criteria.</p>
                        <button onClick={() => setFilters({
                            searchTerm: '',
                            searchField: 'all',
                            sortBy: 'date',
                            sortOrder: 'desc'
                        })}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

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