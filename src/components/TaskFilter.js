import React from 'react';

const TaskFilter = ({currentFilter, onFilterChange, taskCounts}) => {
    const filters = [
        {
            key: 'all',
            label: 'All Tasks',
            count: taskCounts.all,
            icon: '🎯'
        },
        {
            key: 'pending',
            label: 'In Progress',
            count: taskCounts.pending,
            icon: '⚡'
        },
        {
            key: 'completed',
            label: 'Completed',
            count: taskCounts.completed,
            icon: '🎉'
        }
    ];

    const getFilterDescription = () => {
        const count = taskCounts[currentFilter];
        const taskWord = count === 1 ? 'task' : 'tasks';

        switch (currentFilter) {
            case 'all':
                return `${count} total ${taskWord} in your workspace`;
            case 'pending':
                return `${count} ${taskWord} waiting for your attention`;
            case 'completed':
                return `${count} ${taskWord} successfully completed`;
            default:
                return `${count} ${taskWord}`;
        }
    };

    return (
        <div className="task-filter">
            <div className="filter-tabs">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => onFilterChange(filter.key)}
                        className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
                        aria-pressed={currentFilter === filter.key}
                        title={`View ${filter.label.toLowerCase()} (${filter.count} tasks)`}
                    >
                        <span className="filter-icon">{filter.icon}</span>
                        <span className="filter-label">{filter.label}</span>
                        <span className="filter-count">{filter.count}</span>
                    </button>
                ))}
            </div>

            <div className="filter-summary">
                <span className="summary-text">
                    ✨ {getFilterDescription()}
                </span>
            </div>
        </div>
    );
};

export default TaskFilter;