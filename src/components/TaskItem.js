import React from 'react';

const TaskItem = ({task, onToggleComplete, onEdit, onDelete}) => {
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 1) {
                const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                const diffMinutes = Math.floor(diffTime / (1000 * 60));

                if (diffHours < 1) {
                    return diffMinutes <= 1 ? 'Just now' : `${diffMinutes}m ago`;
                }
                return diffHours === 1 ? '1h ago' : `${diffHours}h ago`;
            }

            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${task.title}"?\n\nThis action cannot be undone.`)) {
            onDelete(task.id);
        }
    };

    const handleToggleComplete = () => {
        onToggleComplete(task.id);
    };

    const handleEdit = () => {
        onEdit(task);
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
            <div className="task-header">
                <h4 className="task-title">{task.title}</h4>
                <div className="task-checkbox">
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={handleToggleComplete}
                            aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>

            {task.description && (
                <p className="task-description">{task.description}</p>
            )}

            <div className="task-meta">
                <span className="task-date">
                    {formatDate(task.createdAt)}
                </span>
                <div className="task-actions">
                    <button
                        onClick={handleEdit}
                        className="action-btn edit-btn"
                        title="Edit this task"
                        aria-label={`Edit "${task.title}"`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="action-btn delete-btn"
                        title="Delete this task"
                        aria-label={`Delete "${task.title}"`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;