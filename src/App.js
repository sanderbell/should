import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialScreens = [
    {
      heading: 'Today, I should:',
      id: 'one',
    },
    {
      heading: `Then, it'd be nice to:`,
      id: 'two',
    },
    {
      heading: `And finally, I could:`,
      id: 'three',
    },
  ];
  const [currentInitialScreen, setCurrentInitialScreen] = useState(0);

  const [task, setTask] = useState('');

  const storageTask = localStorage.getItem(
    `Task ${initialScreens[currentInitialScreen].id}`
  );

  useEffect(() => {
    console.log('useEffect - storageTask:', storageTask);
    if (storageTask) {
      setTask(storageTask);
    }
  }, [storageTask]);

  const handleTaskInputChange = (e) => {
    console.log('handleTaskInputChange - e.target.value:', e.target.value);
    setTask(e.target.value);
  };

  const handleSaveTask = () => {
    console.log('handleSaveTask - task:', task);
    if (task.length > 0) {
      localStorage.setItem(
        `Task ${initialScreens[currentInitialScreen].id}`,
        task.trim()
      );
      setTask(task.trim());
    } else {
      localStorage.removeItem(
        `Task ${initialScreens[currentInitialScreen].id}`
      );
      console.log('handleSaveTask - task:', task);
    }
  };

  console.log('Rendering App - currentInitialScreen:', currentInitialScreen);

  return (
    <div className='App'>
      <h1> {initialScreens[currentInitialScreen].heading} </h1>
      <input
        className='initial-input'
        type='text'
        autoComplete='off'
        maxLength='17'
        spellCheck='false'
        value={task}
        onBlur={handleSaveTask}
        onChange={handleTaskInputChange}
        id={`start-input-${initialScreens[currentInitialScreen].id}`}
      />

      <button
        onClick={() => setCurrentInitialScreen(currentInitialScreen - 1)}
        disabled={currentInitialScreen === 0}
      >
        BACK
      </button>
      <button
        onClick={() => setCurrentInitialScreen(currentInitialScreen + 1)}
        disabled={currentInitialScreen === initialScreens.length - 1}
      >
        NEXT
      </button>
    </div>
  );
}

export default App;
