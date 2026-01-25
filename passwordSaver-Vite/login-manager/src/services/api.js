import { API_URL } from '../utils/constants';

export const api = {
    // Get all entries
    async getEntries() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching entries:', error);
            throw error;
        }
    },

    // Add new entry
    async addEntry(entryData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entryData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add entry');
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding entry:', error);
            throw error;
        }
    },

    // Update entry
    async updateEntry(id, updateData) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entry');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating entry:', error);
            throw error;
        }
    },

    // Delete entry
    async deleteEntry(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete entry');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting entry:', error);
            throw error;
        }
    }
};