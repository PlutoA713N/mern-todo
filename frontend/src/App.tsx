import React from 'react';
import TodoList from './components/TodoList';

console.log('VITE_BACKEND_URL in index.tsx:', import.meta.env.VITE_BACKEND_URL, import.meta.env);

const App: React.FC = () => {
    return (
        <div className="App">
            <h1 style={{ marginBottom: '50px', textAlign: 'center' }}>My Todo App</h1>
            <TodoList />
        </div>
    );
};

export default App;
