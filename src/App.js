import { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';
import Initial from './Initial';
import Final from './Final';

function App() {
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
      heading: `Yay! All done for today! Come tomorrow!`,
      id: 'seven',
    },
  ];
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

  const [firstInStorage, secondInStorage, thirdInStorage] = [
    localStorage.getItem('Task one'),
    localStorage.getItem('Task two'),
    localStorage.getItem('Task three'),
  ];
  const allInStorage = firstInStorage && secondInStorage && thirdInStorage;

  const [currentScreen, setCurrentScreen] = useState(
    allInStorage
      ? 3
      : secondInStorage && thirdInStorage
      ? 4
      : thirdInStorage
      ? 5
      : 0
  );
  const [task, setTask] = useState('');
  const [flyAwayIndex, setFlyAwayIndex] = useState(-1);
  const [isGreen, setIsGreen] = useState(false);
  const [oldVisitor, setOldVisitor] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const storageTask = localStorage.getItem(`Task ${screens[currentScreen].id}`);

  useEffect(() => {
    const isOldVisitor = JSON.parse(localStorage.getItem('Old visitor'));
    setOldVisitor(isOldVisitor ? true : false);
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setOldVisitor(true);
    localStorage.setItem('Old visitor', JSON.stringify(true));
  };

  const prevStorageTask =
    currentScreen > 0
      ? localStorage.getItem(`Task ${screens[currentScreen - 1].id}`)
      : null;

  useEffect(() => {
    if (storageTask) {
      setTask(storageTask);
    } else {
      setTask('');
    }
  }, [storageTask]);

  const handleFlyAway = () => {
    setFlyAwayIndex(currentScreen);
    setTimeout(() => {
      setCurrentScreen(currentScreen + 1);
      setFlyAwayIndex(-1);

      if (currentScreen === 3) {
        localStorage.removeItem(`Task one`);
      } else if (currentScreen === 4) {
        localStorage.removeItem(`Task two`);
      } else if (currentScreen === 5) {
        localStorage.removeItem(`Task three`);
      } else if (currentScreen === 6) {
        setCurrentScreen(0);
        return;
      }

      setFlyAwayIndex(-1);
      setCurrentScreen(currentScreen + 1);
    }, 500);
  };

  const handleTaskInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveTask();
      if (task.length > 0) {
        setIsGreen(true);
        setTimeout(() => {
          handleFlyAway();
          setIsGreen(false);
        }, 1000);
      }
    }
  };

  const handleSaveTask = () => {
    if (task.length > 0) {
      if (task !== localStorage.getItem(`Task ${screens[currentScreen].id}`)) {
        setIsGreen(true);
        setTimeout(() => {
          setIsGreen(false);
        }, 800);
        localStorage.setItem(`Task ${screens[currentScreen].id}`, task.trim());
        setTask(task.trim());
      }
    } else {
      localStorage.removeItem(`Task ${screens[currentScreen].id}`);
      getRandomPlaceholder();
    }
  };

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholder.length);
    return placeholder[randomIndex];
  };

  return (
    <div
      className='App'
      style={{
        backgroundColor:
          currentScreen === 0
            ? '#ffeded'
            : currentScreen === 1
            ? '#e4fafe'
            : currentScreen === 2
            ? '#fbffe6'
            : '#eceeec',
      }}
    >
      {(modalVisible || oldVisitor === false) && (
        <Modal closeModal={closeModal} />
      )}

      {currentScreen < 3 ? (
        <Initial
          modalVisible={modalVisible}
          screens={screens}
          currentScreen={currentScreen}
          oldVisitor={oldVisitor}
          isGreen={isGreen}
          getRandomPlaceholder={getRandomPlaceholder}
          task={task}
          handleKeyDown={handleKeyDown}
          handleSaveTask={handleSaveTask}
          handleTaskInputChange={handleTaskInputChange}
          firstInStorage={firstInStorage}
          secondInStorage={secondInStorage}
          thirdInStorage={thirdInStorage}
          openModal={openModal}
          setCurrentScreen={setCurrentScreen}
          prevStorageTask={prevStorageTask}
        />
      ) : (
        <Final
          screens={screens}
          currentScreen={currentScreen}
          flyAwayIndex={flyAwayIndex}
          handleFlyAway={handleFlyAway}
          setCurrentScreen={setCurrentScreen}
          openModal={openModal}
          task={task}
        />
      )}
    </div>
  );
}

export default App;
