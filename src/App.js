import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {getFromStorage, saveToStorage, STORAGE_KEYS} from './utils/localStorage';

function App() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from localStorage on app initialization
    useEffect(() => {
        const loadData = () => {
            try {
                const savedUser = getFromStorage(STORAGE_KEYS.USER);
                const savedTasks = getFromStorage(STORAGE_KEYS.TASKS);

                if (savedUser) {
                    setUser(savedUser);
                }

                if (savedTasks && Array.isArray(savedTasks)) {
                    setTasks(savedTasks);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        if (!isLoading) {
            saveToStorage(STORAGE_KEYS.TASKS, tasks);
        }
    }, [tasks, isLoading]);

    // Handle user login
    const handleLogin = (username) => {
        const userData = {
            username,
            loginTime: new Date().toISOString()
        };
        setUser(userData);
        saveToStorage(STORAGE_KEYS.USER, userData);
    };

    // Handle user logout
    const handleLogout = () => {
        setUser(null);
        saveToStorage(STORAGE_KEYS.USER, null);
    };

    // Add new task
    const addTask = (taskData) => {
        const newTask = {
            id: Date.now() + Math.random(),
            ...taskData,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setTasks(prev => [newTask, ...prev]);
        setShowForm(false);
    };

    // Update existing task
    const updateTask = (taskId, updatedData) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? {
                    ...task,
                    ...updatedData,
                    updatedAt: new Date().toISOString()
                }
                : task
        ));
        setEditingTask(null);
    };

    // Delete task
    const deleteTask = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    // Toggle task completion
    const toggleComplete = (taskId) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? {
                    ...task,
                    completed: !task.completed,
                    updatedAt: new Date().toISOString()
                }
                : task
        ));
    };

    // Handle editing task
    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(false);
    };

    // Handle canceling forms
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    // Filter tasks based on current filter
    const filteredTasks = tasks.filter(task => {
        switch (filter) {
            case 'completed':
                return task.completed;
            case 'pending':
                return !task.completed;
            default:
                return true;
        }
    });

    // Calculate task counts
    const taskCounts = {
        all: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };

    // Calculate progress percentage
    const progressPercentage = tasks.length > 0 ? Math.round((taskCounts.completed / tasks.length) * 100) : 0;

    // Show loading screen
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <h2>Loading your workspace...</h2>
                <p>Getting everything ready for you</p>
            </div>
        );
    }

    // Show login if no user
    if (!user) {
        return <Login onLogin={handleLogin}/>;
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>TaskFlow Pro</h1>
                        <span className="app-subtitle">Professional Task Management</span>
                    </div>
                    <div className="header-right">
                        <div className="user-info">
                            <span className="welcome-text">
                                Welcome back, <strong>{user.username}</strong>
                            </span>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="app-main">
                <div className="main-content">
                    {/* Left Dashboard Section */}
                    <div className="dashboard-left">
                        {/* Welcome Card */}
                        <div className="welcome-card">
                            <div>
                                <h2>Complete your daily tasks!</h2>
                                <p>Stay organized and boost your productivity. Keep track of your progress and get
                                    things done efficiently.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowForm(!showForm);
                                    setEditingTask(null);
                                }}
                                className={`add-task-btn ${showForm ? 'active' : ''}`}
                            >
                                {showForm ? 'Cancel' : 'Add New Task'}
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="quick-stats">
                            <h3>Quick Stats</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">{taskCounts.all}</div>
                                    <div className="stat-label">Total Tasks</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">{taskCounts.pending}</div>
                                    <div className="stat-label">In Progress</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">{taskCounts.completed}</div>
                                    <div className="stat-label">Completed</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">{progressPercentage}%</div>
                                    <div className="stat-label">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Dashboard Section */}
                    <div className="dashboard-right">
                        {/* Progress Card */}
                        <div className="progress-card">
                            <h3>{progressPercentage}% Tasks Completed Today</h3>
                            <div className="progress-circle">
                                <svg width="120" height="120">
                                    <circle
                                        className="progress-bg"
                                        cx="60"
                                        cy="60"
                                        r="52"
                                    />
                                    <circle
                                        className="progress-fill"
                                        cx="60"
                                        cy="60"
                                        r="52"
                                        strokeDasharray={`${2 * Math.PI * 52}`}
                                        strokeDashoffset={`${2 * Math.PI * 52 * (1 - progressPercentage / 100)}`}
                                    />
                                </svg>
                                <div className="progress-text">{progressPercentage}%</div>
                            </div>
                            <div className="progress-label">
                                Keep going! You're doing great.
                            </div>
                        </div>

                        {/* Task Filters */}
                        <div className="task-filters">
                            <h3>Filter Tasks</h3>
                            <div className="filter-tabs">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                                >
                                    <div className="filter-left">
                                        <span className="filter-icon">📋</span>
                                        <span className="filter-label">All Tasks</span>
                                    </div>
                                    <span className="filter-count">{taskCounts.all}</span>
                                </button>
                                <button
                                    onClick={() => setFilter('pending')}
                                    className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
                                >
                                    <div className="filter-left">
                                        <span className="filter-icon">⚡</span>
                                        <span className="filter-label">In Progress</span>
                                    </div>
                                    <span className="filter-count">{taskCounts.pending}</span>
                                </button>
                                <button
                                    onClick={() => setFilter('completed')}
                                    className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                                >
                                    <div className="filter-left">
                                        <span className="filter-icon">✅</span>
                                        <span className="filter-label">Completed</span>
                                    </div>
                                    <span className="filter-count">{taskCounts.completed}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Section */}
                    <div className="tasks-section">
                        <div className="tasks-header">
                            <h2>Your Tasks</h2>
                            <span className="tasks-count">
                                {filteredTasks.length} {filter === 'all' ? 'total' : filter} tasks
                            </span>
                        </div>

                        {/* Task List */}
                        <TaskList
                            tasks={filteredTasks}
                            onToggleComplete={toggleComplete}
                            onEdit={handleEditTask}
                            onDelete={deleteTask}
                            currentFilter={filter}
                        />
                    </div>
                </div>

                {/* Add Task Form */}
                {showForm && (
                    <TaskForm
                        onSubmit={addTask}
                        onCancel={handleCancelForm}
                    />
                )}

                {/* Edit Task Form */}
                {editingTask && (
                    <TaskForm
                        task={editingTask}
                        onSubmit={(data) => updateTask(editingTask.id, data)}
                        onCancel={handleCancelForm}
                        isEditing={true}
                    />
                )}
            </main>

            <footer className="app-footer">
                <p> 2024 TaskFlow Pro - Designed for productivity excellence</p>
            </footer>
        </div>
    );
}

export default App;