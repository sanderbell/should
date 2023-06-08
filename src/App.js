import { useState, useEffect } from 'react';
import './App.css';

function App() {
  let oldVisitor = JSON.parse(localStorage.getItem('Old visitor'))
    ? true
    : false;

  localStorage.setItem('Old visitor', true);

  console.log('OldVisitor is', oldVisitor);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const screens = [
    {
      heading: 'Today, I should:',
      id: 'one',
    },
    {
      heading: `Then, it'd be nice to:`,
      id: 'two',
    },
    {
      heading: `Finally, I could:`,
      id: 'three',
    },

    {
      heading: `Finally, I could:`,
      id: 'four',
    },

    {
      heading: `Finally, I could:`,
      id: 'five',
    },

    {
      heading: `Finally, I could:`,
      id: 'six',
    },

    {
      heading: `Yay! All done for today!`,
      id: 'seven',
    },
  ];

  const [currentInitialScreen, setCurrentInitialScreen] = useState(0);

  const [task, setTask] = useState('');

  const storageTask = localStorage.getItem(
    `Task ${screens[currentInitialScreen].id}`
  );

  useEffect(() => {
    if (storageTask) {
      setTask(storageTask);
    } else {
      setTask('');
    }
  }, [storageTask]);

  const handleTaskInputChange = (e) => {
    console.log('handleTaskInputChange - e.target.value:', e.target.value);
    setTask(e.target.value);
  };

  const placeholder = [
    'Run 10 miles',
    'Buy some durian',
    'Go to the gym',
    'Read 50 pages',
    'Call my brother',
  ];

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholder.length);
    return placeholder[randomIndex];
  };

  const handleSaveTask = () => {
    console.log('handleSaveTask - task:', task);
    if (task.length > 0) {
      localStorage.setItem(
        `Task ${screens[currentInitialScreen].id}`,
        task.trim()
      );
      setTask(task.trim());
    } else {
      localStorage.removeItem(`Task ${screens[currentInitialScreen].id}`);
      console.log('handleSaveTask - task:', task);
    }
  };

  console.log('Rendering App - currentInitialScreen:', currentInitialScreen);

  localStorage.setItem('Old visitor', true);

  return (
    <div className='App'>
      {(modalVisible || oldVisitor === false) && (
        <div className='modal'>
          <h2 className='modal-heading'>Welcome to should:</h2>
          <p className='modal-text'>
            This is how it works: worksworksworksw
            <br />
            sworksworksworksworkswsworksw
            <br />
            sworksworkswoorksworksw
            <br />
            sworksworkswosworksworksworksworksw
            <br />
            sworksworksworksworkswsworksw
            <br />
            sworks workswoorksworksw
            <br />
            sworksworkswosworks
          </p>
          <button onClick={closeModal}>✖️</button>
        </div>
      )}
      <div
        className={modalVisible ? 'initial-content blurred' : 'initial-content'}
      >
        <h1> {screens[currentInitialScreen].heading} </h1>
        <input
          className='initial-input'
          type='text'
          autoComplete='off'
          maxLength='17'
          spellCheck='false'
          placeholder={getRandomPlaceholder()}
          value={task}
          onBlur={handleSaveTask}
          onChange={handleTaskInputChange}
          id={`start-input-${screens[currentInitialScreen].id}`}
        />
        <div id='buttons-container'>
          {currentInitialScreen > 0 ? (
            <button
              onClick={() => setCurrentInitialScreen(currentInitialScreen - 1)}
              disabled={currentInitialScreen === 0}
            >
              ←
            </button>
          ) : (
            <button onClick={openModal}>ℹ</button>
          )}
          {currentInitialScreen < 2 ? (
            <button
              onClick={() => setCurrentInitialScreen(currentInitialScreen + 1)}
              disabled={task.length === 0}
            >
              →
            </button>
          ) : (
            <button
              onClick={() => setCurrentInitialScreen(currentInitialScreen + 1)}
            >
              🙃
            </button>
          )}
        </div>
      </div>
      <div className='final-content'>dfsdfdsf</div>
    </div>
  );
}

export default App;
