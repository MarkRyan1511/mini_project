// Simulate React and ReactDOM for standalone script
const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useEffect } = React;

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    const [analysisType, setAnalysisType] = useState('');
    const [result, setResult] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        if (username === 'user' && password === 'pass') {
            setIsLoggedIn(true);
        } else {
            setErrorMessage('Invalid credentials. Hint: user/pass');
        }
    };

    const handleTextCheck = () => {
        // Clear previous error
        setErrorMessage('');

        // Validation checks
        if (!text.trim()) {
            setErrorMessage('Please enter some text to analyze');
            return;
        }

        if (!analysisType) {
            setErrorMessage('Please select an analysis type');
            return;
        }

        // Simulate analysis with more sophisticated random generation
        if (analysisType === 'ai') {
            const aiProbability = Math.min(Math.random() * 100, 95); // Cap at 95%
            setResult({
                type: 'AI Detection',
                score: aiProbability.toFixed(2),
                interpretation: 
                    aiProbability < 30 ? 'Likely Human-Written' :
                    aiProbability < 60 ? 'Possibly AI-Assisted' :
                    'High Probability of AI Generation'
            });
        } else if (analysisType === 'plagiarism') {
            const plagiarismScore = Math.min(Math.random() * 100, 95); // Cap at 95%
            setResult({
                type: 'Plagiarism Check',
                score: plagiarismScore.toFixed(2),
                interpretation: 
                    plagiarismScore < 20 ? 'Original Content' :
                    plagiarismScore < 50 ? 'Some Similarities Detected' :
                    'High Risk of Plagiarism'
            });
        }
    };

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
        
        if (words.length <= 600) {
            setText(inputText);
            setWordCount(words.length);
        } else {
            setErrorMessage('Maximum word limit of 600 words exceeded');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="glass-morphism">
                <div className="login-container">
                    <i className="fas fa-shield-alt text-5xl text-white mb-4 block"></i>
                    <h2 className="text-3xl font-bold text-white">TextGuard</h2>
                    <p className="text-white/80 mb-6">Secure Text Analysis Platform</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="input-wrapper">
                        <i className="fas fa-user"></i>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <i className="fas fa-lock"></i>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            {errorMessage}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        className="login-btn"
                    >
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="glass-morphism">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
                <i className="fas fa-text-height mr-2"></i>
                Text Analysis
            </h2>
            <textarea 
                className="text-area"
                placeholder={`Enter text (${600 - wordCount} words remaining)`}
                value={text}
                onChange={handleTextChange}
            />
            <div className="text-white/80 text-sm mb-4 text-right">
                Words: {wordCount}/600
            </div>
            <div className="analysis-options">
                <label className="inline-flex items-center text-white">
                    <input 
                        type="radio" 
                        name="analysisType" 
                        value="ai"
                        checked={analysisType === 'ai'}
                        onChange={() => setAnalysisType('ai')}
                        className="mr-2"
                    />
                    <i className="fas fa-robot mr-2"></i>
                    AI Text Detection
                </label>
                <label className="inline-flex items-center text-white">
                    <input 
                        type="radio" 
                        name="analysisType" 
                        value="plagiarism"
                        checked={analysisType === 'plagiarism'}
                        onChange={() => setAnalysisType('plagiarism')}
                        className="mr-2"
                    />
                    <i className="fas fa-copy mr-2"></i>
                    Plagiarism Check
                </label>
            </div>
            {errorMessage && (
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {errorMessage}
                </div>
            )}
            <button 
                onClick={handleTextCheck}
                className="login-btn mb-4"
            >
                <i className="fas fa-search mr-2"></i>
                Check Text
            </button>
            
            {result && (
                <div className="result-container">
                    <h3 className="text-xl font-bold mb-2">
                        <i className="fas fa-chart-pie mr-2"></i>
                        {result.type} Result
                    </h3>
                    <div>
                        <p>Score: <span className="font-bold">{result.score}%</span></p>
                        <p>Interpretation: <span className="font-bold">{result.interpretation}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));