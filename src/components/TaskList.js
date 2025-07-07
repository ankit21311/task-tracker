import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
                      tasks,
                      onToggleComplete,
                      onEdit,
                      onDelete,
                      currentFilter
                  }) => {
    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No tasks yet</h3>
                    <p>
                        {currentFilter === 'completed'
                            ? "You haven't completed any tasks yet. Keep working on your goals!"
                            : currentFilter === 'pending'
                                ? "No pending tasks right now. Great job staying on top of everything!"
                                : "Start by adding your first task to get organized and stay productive."
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list">
            <div className="tasks-grid">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;