/**
 * Utility functions for localStorage operations
 */

export const getFromStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error reading from localStorage (${key}):`, error);
        return null;
    }
};

export const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage (${key}):`, error);
        return false;
    }
};

export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage (${key}):`, error);
        return false;
    }
};

export const clearStorage = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};

// Storage keys constants
export const STORAGE_KEYS = {
    USER: 'taskTracker_user',
    TASKS: 'taskTracker_tasks',
    PREFERENCES: 'taskTracker_preferences'
};