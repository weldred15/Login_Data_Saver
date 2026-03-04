import { useState } from 'react';
import './TableToolbar.css';

function TableToolbar({ onFilterChange, totalEntries, filteredEntries }) {
    const [filters, setFilters] = useState({
        searchTerm: '',
        searchField: 'all', // 'all', 'domain', 'username', 'notes'
        sortBy: 'date',     // 'date', 'domain', 'username'
        sortOrder: 'desc'   // 'asc', 'desc'
    });



    const handleSearchChange = (value) => {
        const newFilters = { ...filters, searchTerm: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const resetFilters = {
            searchTerm: '',
            searchField: 'all',
            sortBy: 'date',
            sortOrder: 'desc'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const toggleSortOrder = () => {
        handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="table-toolbar">
            {/* Search Bar */}
            <div className="toolbar-row">
                <div className="filters">
                    <div className="filter-group">
                        <label>Sort by:</label>
                        <select
                            className="filter-select"
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        >
                            <option value="date">Date Created</option>
                            <option value="domain">Domain</option>
                            <option value="username">Username</option>
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="filter-group">
                        <button
                            className="sort-order-btn"
                            onClick={toggleSortOrder}
                            title={filters.sortOrder === 'asc' ? 'Ascending Order' : 'Descending Order'}
                        >
                            {filters.sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                        </button>
                    </div>

                    {/* Clear Filters */}
                    {(filters.searchTerm || filters.searchField !== 'all' || filters.sortBy !== 'date' || filters.sortOrder !== 'desc') && (
                        <div className="filter-group">
                            <button
                                className="clear-filters-btn"
                                onClick={clearFilters}
                            >
                                ✕ Clear All Filters
                            </button>
                        </div>
                    )}

                    <div className="search-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search entries..."
                            value={filters.searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        {filters.searchTerm && (
                            <button
                                className="clear-search-btn"
                                onClick={() => handleSearchChange('')}
                                title="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Search in specific field */}
                    <select
                        className="search-field-select"
                        value={filters.searchField}
                        onChange={(e) => handleFilterChange('searchField', e.target.value)}
                        title="Search in"
                    >
                        <option value="all">All Fields</option>
                        <option value="domain">Domain Only</option>
                        <option value="username">Username Only</option>
                        <option value="notes">Notes Only</option>
                    </select>
                </div>

                {/* Results Count */}
                <div className="results-count">
                    Showing {filteredEntries} of {totalEntries} entries
                </div>
            </div>

        </div>
    );
}

export default TableToolbar;