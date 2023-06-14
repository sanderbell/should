import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [flyAwayIndex, setFlyAwayIndex] = useState(-1);

  const handleFlyAway = () => {
    setFlyAwayIndex(currentScreen);
    setTimeout(() => {
      setCurrentScreen(currentScreen + 1);
      setFlyAwayIndex(-1);
      console.log('currentScreen' + currentScreen);
      console.log('flyAwayIndex' + flyAwayIndex);
    }, 500);
  };
  const [oldVisitor, setOldVisitor] = useState(false);

  useEffect(() => {
    const isOldVisitor = JSON.parse(localStorage.getItem('Old visitor'));
    setOldVisitor(isOldVisitor ? true : false);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setOldVisitor(true);
    localStorage.setItem('Old visitor', JSON.stringify(true));
  };

  const screens = [
    {
      heading: 'Today, I should:',
      id: 'one',
    },
    {
      heading: `It'd also be nice to:`,
      id: 'two',
    },
    {
      heading: `Finally, I might:`,
      id: 'three',
    },

    {
      heading: 'Today, I should:',
      id: 'four',
    },

    {
      heading: `Today, it'd be nice to:`,
      id: 'five',
    },

    {
      heading: `Today, I might:`,
      id: 'six',
    },

    {
      heading: `Yay! All done for today!`,
      id: 'seven',
    },
  ];

  const allTasksSet =
    localStorage.getItem('Task one') &&
    localStorage.getItem('Task two') &&
    localStorage.getItem('Task three');

  const [currentScreen, setCurrentScreen] = useState(allTasksSet ? 3 : 0);
  const [task, setTask] = useState('');

  const storageTask = localStorage.getItem(`Task ${screens[currentScreen].id}`);

  useEffect(() => {
    if (storageTask) {
      setTask(storageTask);
    } else {
      setTask('');
    }
  }, [storageTask]);

  const handleTaskInputChange = (e) => {
    setTask(e.target.value);
  };

  const placeholder = [
    'Run 10 miles',
    'Unfreeze fridge',
    'Meditate',
    'Buy some durian',
    'Plan next week',
    'Go to gym',
    'Apply for refund',
    'Book hotel',
    'Decide on trip',
    'Order groceries',
    'Read 50 pages',
    'Wash clothes',
    'Arrange my vacay',
    'Pay bills',
    'Water my ficus',
    'Call my brother',
  ];

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholder.length);
    return placeholder[randomIndex];
  };

  const handleSaveTask = () => {
    if (task.length > 0) {
      localStorage.setItem(`Task ${screens[currentScreen].id}`, task.trim());
      setTask(task.trim());
    } else {
      localStorage.removeItem(`Task ${screens[currentScreen].id}`);
    }
  };

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
            sworksworksworksworksw
            <br />
            sworksworksworkswworksw
            <br />
            sworks workswoorksworksw
            <br />
            sworksworkswosworks
          </p>
          <button onClick={closeModal}>✖️</button>
        </div>
      )}

      {currentScreen < 3 ? (
        <div
          className={
            modalVisible ? 'initial-content blurred' : 'initial-content'
          }
        >
          <h1> {screens[currentScreen].heading} </h1>

          <input
            autoFocus
            className='initial-input'
            type='text'
            autoComplete='off'
            maxLength='18'
            spellCheck='false'
            placeholder={getRandomPlaceholder()}
            value={task}
            onBlur={handleSaveTask}
            onChange={handleTaskInputChange}
            id={`initial-input-${screens[currentScreen].id}`}
          />

          <div id='buttons-container'>
            {currentScreen > 0 ? (
              <button
                onClick={() => setCurrentScreen(currentScreen - 1)}
                disabled={currentScreen === 0}
              >
                ←
              </button>
            ) : (
              <button onClick={openModal}>ℹ</button>
            )}
            {currentScreen < 2 ? (
              <button
                onClick={() => setCurrentScreen(currentScreen + 1)}
                disabled={task.length === 0}
              >
                →
              </button>
            ) : (
              <button onClick={() => setCurrentScreen(currentScreen + 1)}>
                🎊
              </button>
            )}
          </div>
        </div>
      ) : (
        <div id='final-content'>
          <h1> {screens[currentScreen].heading} </h1>
          <div id='final-screens-container'>
            <div
              className={`final-screens final-screen-${
                screens[currentScreen].id
              } ${flyAwayIndex === currentScreen ? 'fly-away' : ''}`}
              style={{
                animation:
                  flyAwayIndex === currentScreen
                    ? 'flyAwayAnimation 1.5s ease 1'
                    : currentScreen === 3
                    ? 'movein-four 2s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                    : 'none',
              }}
            >
              <p className='final-screen-task'>
                {localStorage.getItem(`Task ${screens[currentScreen - 3].id}`)}
              </p>
            </div>

            {currentScreen + 1 < screens.length && (
              <div
                className={`final-screens final-screen-${
                  screens[currentScreen + 1].id
                }`}
                style={{
                  animation:
                    flyAwayIndex === currentScreen + 1
                      ? 'flyAwayAnimation 1.5s ease 1'
                      : currentScreen === 3
                      ? 'movein-five 1.9s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                      : 'none', // FIXME:
                }}
              >
                <p className='final-screen-task'>
                  {localStorage.getItem(
                    `Task ${screens[currentScreen - 2].id}`
                  )}
                </p>
              </div>
            )}

            {currentScreen + 2 < screens.length && (
              <div
                className={`final-screens final-screen-${
                  screens[currentScreen + 2].id
                }`}
                style={{
                  animation:
                    flyAwayIndex === currentScreen + 2
                      ? 'flyAwayAnimation 1.5s ease 1'
                      : currentScreen === 3
                      ? 'movein-six 2.4s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                      : 'none',
                }}
              >
                <p className='final-screen-task'>
                  {localStorage.getItem(
                    `Task ${screens[currentScreen - 1].id}`
                  )}
                </p>
              </div>
            )}
          </div>

          <div id='buttons-container'>
            {3 > currentScreen > 0 ? (
              <button
                onClick={() => setCurrentScreen(currentScreen - 1)}
                disabled={currentScreen === 0}
              >
                ←
              </button>
            ) : (
              <button onClick={openModal}>ℹ</button>
            )}
            {currentScreen < 2 ? (
              <button
                onClick={() => setCurrentScreen(currentScreen + 1)}
                disabled={task.length === 0}
              >
                →
              </button>
            ) : (
              <button onClick={() => handleFlyAway()}>✅</button>
            )}
          </div>
          <button id='edit-button' onClick={() => setCurrentScreen(0)}>
            EDIT TASKS
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
