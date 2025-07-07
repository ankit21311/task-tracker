import React, {useState} from 'react';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError('Please enter your name');
            return;
        }

        if (trimmedUsername.length < 2) {
            setError('Name must be at least 2 characters');
            return;
        }

        onLogin(trimmedUsername);
    };

    const handleInputChange = (e) => {
        setUsername(e.target.value);
        if (error) setError(''); // Clear error when user starts typing
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>TaskFlow Pro</h1>
                    <p>Welcome! Enter your name to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Your Name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className={error ? 'error' : ''}
                            autoComplete="username"
                            autoFocus
                        />
                        {error && <span className="error-message">{error}</span>}
                    </div>

                    <button type="submit" className="login-btn">
                        Get Started
                    </button>
                </form>

                <div className="login-footer">
                    <p>No account needed - just enter your name to continue</p>
                </div>
            </div>
        </div>
    );
};

export default Login;