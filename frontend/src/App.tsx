import React from 'react';
import TodoList from './components/TodoList';


const App: React.FC = () => {
    return (
        <div className="App">
            <h1 style={{ marginBottom: '50px', textAlign: 'center' }}>My Todo App</h1>
            <TodoList />
        </div>
    );
};

export default App;
