import { useState, useEffect, useRef } from 'react';
import './App.css';
import Modal from './Modal';
import BurntModal from './BurntModal';
import Initial from './Initial';
import Final from './Final';

function App() {
  useEffect(() => {
    const preventScroll = (event) => {
      event.preventDefault();
    };

    document.body.addEventListener('touchmove', preventScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, []);

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
      heading: `It'd also be nice to:`,
      id: 'five',
    },

    {
      heading: `Finally, I might:`,
      id: 'six',
    },

    {
      heading: `Yay! All done for today`,
      id: 'seven',
    },
  ];
  const placeholder = [
    'Run 10 miles',
    'Unfreeze my fridge',
    'Meditate',
    'Donate $100',
    'Buy some durian',
    'Plan next week',
    'Go to the gym',
    'Apply for the refund',
    'Book a room',
    'Decide on the trip',
    'Order groceries',
    'Read 50 pages',
    'Wash clothes',
    'Arrange my vacay',
    'Pay bills',
    'Water my ficus',
    'Call my bro',
  ];

  const [firstInStorage, secondInStorage, thirdInStorage] = [
    localStorage.getItem('Task one'),
    localStorage.getItem('Task two'),
    localStorage.getItem('Task three'),
  ];

  const now = new Date();
  const [day, month, year] = [
    now.getDate(),
    now.getMonth() + 1,
    now.getFullYear(),
  ];
  const timeStamp = localStorage.getItem('Timestamp');
  const [tsDay, tsMonth, tsYear] = timeStamp
    ? timeStamp.split(',').map(Number)
    : [0, 0, 0];

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
  const [burntModalVisible, setBurntModalVisible] = useState(true);
  const [contentBlurred, setContentBlurred] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);
  const [noButtonScale, setNoButtonScale] = useState(false);
  const [canFlyAway, setCanFlyAway] = useState(true);

  const canUndoRef = useRef(false); // A var that carries the fact that user pressed undo button thru all rerenders
  const undoButtonShown = canUndoRef.current;

  const storageTask = localStorage.getItem(`Task ${screens[currentScreen].id}`);
  const doneForToday = localStorage.getItem(`Done for today`);

  const inputRef = useRef(null);

  useEffect(() => {
    doneForToday && !allInStorage && setCurrentScreen(6);
  }, [allInStorage, doneForToday]);

  useEffect(() => {
    if (contentBlurred) {
      inputRef.current.focus();
    }
  }, [contentBlurred]);

  useEffect(() => {
    const isOldVisitor = JSON.parse(localStorage.getItem('Old visitor'));
    setOldVisitor(isOldVisitor ? true : false);
    burnTasksAtMidnight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOnFire = oldVisitor
    ? JSON.parse(localStorage.getItem('Is it on fire?'))
    : false;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setOldVisitor(true);
    localStorage.setItem(`Timestamp`, [day, month, year]);
    localStorage.setItem('Old visitor', JSON.stringify(true));
  };

  const closeBurntModal = () => {
    localStorage.setItem('Is it on fire?', JSON.stringify(false));
    setBurntModalVisible(false);
    localStorage.setItem(`Timestamp`, [day, month, year]);
    window.location.reload();
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
    canUndoRef.current = true;
    currentScreen === 5 && setNoButtonScale(true);
    setFlyAwayIndex(currentScreen);
    setCanFlyAway(false);

    startCountdown();

    setTimeout(() => {
      setCurrentScreen(currentScreen + 1);
      setFlyAwayIndex(-1);
    }, 500);

    setTimeout(() => {
      if (canUndoRef.current) {
        if (currentScreen === 3) {
          localStorage.removeItem(`Task one`);
          console.log('Task one removed');
        } else if (currentScreen === 4) {
          localStorage.removeItem(`Task two`);
          console.log('Task two removed');
        } else if (currentScreen === 5) {
          localStorage.removeItem(`Task three`);
          console.log('Task three removed');
          localStorage.setItem(`Done for today`, JSON.stringify(true));
        }

        canUndoRef.current = false;
      }
      setCanFlyAway(true);
    }, 5000);
  };

  const handleTaskInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSaveTask = () => {
    setContentBlurred(false);
    if (task.length > 0) {
      if (task !== localStorage.getItem(`Task ${screens[currentScreen].id}`)) {
        setIsGreen(true);
        localStorage.setItem(`Task ${screens[currentScreen].id}`, task.trim());
        setTask(task.trim());
        setTimeout(() => {
          setIsGreen(false);
        }, 800);
        setTimeout(() => {
          setCurrentScreen(currentScreen + 1);
        }, 800);
      }
    } else {
      localStorage.removeItem(`Task ${screens[currentScreen].id}`);
      getRandomPlaceholder();
    }
  };

  const handleBlurContent = () => {
    setContentBlurred(true);
  };

  const handleClearAll = () => {
    ['Task one', 'Task two', 'Task three'].forEach((key) => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem('Done for today');
    setTimeout(() => {
      setCurrentScreen(0);
    }, 400);
  };

  const handleUndo = () => {
    setCurrentScreen(currentScreen - 1);
    setCanFlyAway(true);
    canUndoRef.current = false;
  };

  const startCountdown = () => {
    let timeLeft = 5;
    const interval = setInterval(() => {
      timeLeft -= 0.1;
      setProgressWidth((timeLeft / 5) * 100);
      if (timeLeft <= 0 || canUndoRef.current === false) {
        clearInterval(interval);
      }
    }, 100);
  };

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholder.length);
    return placeholder[randomIndex];
  };

  const burnTasksAtMidnight = () => {
    if (day > tsDay || (day <= tsDay && (month > tsMonth || year > tsYear))) {
      timeStamp && localStorage.setItem('Is it on fire?', JSON.stringify(true)); //TODO: Delete this line?
      screens.forEach((screen) => localStorage.removeItem(`Task ${screen.id}`));
      localStorage.removeItem(`Done for today`);
    }
  };


  console.log('currentScreen is', currentScreen);

  const statusBarStyle = document.getElementById('status-bar-style');

  if (statusBarStyle) {
    statusBarStyle.setAttribute(
      'content',
      currentScreen === 0
        ? '#ffe8ea'
        : currentScreen === 1
        ? '#fff5e8'
        : currentScreen === 2
        ? '#e8fffe'
        : currentScreen === 3
        ? '#f8f2f0'
        : currentScreen === 4
        ? '#f2f1e9'
        : currentScreen === 5
        ? '#d8f4f5'
        : '#e7fce6'
    );
  }

  return (
    <div
      className='App'
      style={{
        backgroundColor:
          currentScreen === 0
            ? '#ffe8ea'
            : currentScreen === 1
            ? '#fff5e8'
            : currentScreen === 2
            ? '#e8fffe'
            : currentScreen === 3
            ? '#f8f2f0'
            : currentScreen === 4
            ? '#f2f1e9'
            : currentScreen === 5
            ? '#d8f4f5'
            : '#e7fce6',
      }}
    >
      {(modalVisible || oldVisitor === false) && <Modal {...{ closeModal }} />}

      {burntModalVisible && isOnFire && <BurntModal {...{ closeBurntModal }} />}

      {currentScreen < 3 ? (
        <Initial
          {...{
            inputRef,
            modalVisible,
            screens,
            currentScreen,
            oldVisitor,
            isGreen,
            contentBlurred,
            getRandomPlaceholder,
            task,
            handleSaveTask,
            handleTaskInputChange,
            handleBlurContent,
            firstInStorage,
            secondInStorage,
            thirdInStorage,
            openModal,
            setCurrentScreen,
            prevStorageTask,
          }}
        />
      ) : (
        <Final
          {...{
            canFlyAway,
            doneForToday,
            progressWidth,
            handleClearAll,
            handleUndo,
            undoButtonShown,
            screens,
            currentScreen,
            flyAwayIndex,
            handleFlyAway,
            setCurrentScreen,
            openModal,
            task,
            noButtonScale,
          }}
        />
      )}
    </div>
  );
}

export default App;
