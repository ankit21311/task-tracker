import React, {useState, useEffect} from 'react';

const TaskForm = ({task, onSubmit, onCancel, isEditing = false}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing && task) {
            setFormData({
                title: task.title || '',
                description: task.description || ''
            });
        }
    }, [isEditing, task]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        } else if (formData.title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const taskData = {
            title: formData.title.trim(),
            description: formData.description.trim()
        };

        onSubmit(taskData);

        // Reset form if adding new task
        if (!isEditing) {
            setFormData({title: '', description: ''});
            setErrors({});
        }
    };

    const handleCancel = () => {
        if (!isEditing) {
            setFormData({title: '', description: ''});
            setErrors({});
        }
        onCancel();
    };

    const getCharacterCountColor = () => {
        const length = formData.description.length;
        const maxLength = 500;
        const ratio = length / maxLength;

        if (ratio > 0.9) return '#FF3B30';
        if (ratio > 0.7) return '#FF9500';
        return 'var(--text-tertiary)';
    };

    return (
        <div className="task-form-overlay">
            <div className="task-form-container">
                <div className="task-form">
                    <div className="form-header">
                        <h3>
                            {isEditing ? 'Edit Task' : 'Add New Task'}
                        </h3>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="close-btn"
                            aria-label="Close form"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">
                                Task Title <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter task title"
                                className={errors.title ? 'error' : ''}
                                maxLength={100}
                                autoFocus
                            />
                            {errors.title && (
                                <span className="error-message">{errors.title}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                Description <span
                                style={{color: 'var(--text-secondary)', fontWeight: 'normal'}}>(Optional)</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Add task description (optional)"
                                rows="4"
                                maxLength={500}
                            />
                            <small
                                className="character-count"
                                style={{color: getCharacterCountColor()}}
                            >
                                {formData.description.length}/500 characters
                            </small>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                {isEditing ? 'Update Task' : 'Add Task'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;