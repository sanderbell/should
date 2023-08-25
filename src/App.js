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

  const [screen, setScreen] = useState(
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
  // const [blurTransitionVisible, setBlurTransitionVisible] = useState('nay!');

  const canUndoRef = useRef(false); // A var that carries the fact that user pressed undo button thru all rerenders
  const undoButtonShown = canUndoRef.current;

  const storageTask = localStorage.getItem(`Task ${screens[screen].id}`);
  const doneForToday = localStorage.getItem(`Done for today`);

  // const statusBarStyle = document.getElementById('status-bar');

  // statusBarStyle.setAttribute(
  //   'content',
  //   screen === 0 && modalVisible
  //     ? '#f0f0f0'
  //     : screen === 0 && !modalVisible
  //     ? '#ffe8ea'
  //     : screen === 1
  //     ? '#fff5e8'
  //     : screen === 2
  //     ? '#e8fffe'
  //     : screen === 3
  //     ? '#f8f2f0'
  //     : screen === 4
  //     ? '#f2f1e9'
  //     : screen === 5
  //     ? '#d8f4f5'
  //     : '#e7fce6'
  // );

  const inputRef = useRef(null);

  useEffect(() => {
    doneForToday && !allInStorage && setScreen(6);
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

  // useEffect(() => {
  //   if (0 < screen < 3) {
  //     setBlurTransitionVisible('yay!');

  //     setTimeout(() => {
  //       setBlurTransitionVisible(null);
  //     }, 220);
  //   }
  // }, [screen]);

  function isNotIOS() {
    const userAgent = window.navigator.userAgent;
    return !(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
  }

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
    setScreen(0)
    isNotIOS() &&
      setTimeout(() => {
        inputRef.current.focus();
      }, 500);
  };

  const prevStorageTask =
    screen > 0 ? localStorage.getItem(`Task ${screens[screen - 1].id}`) : null;

  useEffect(() => {
    if (storageTask) {
      setTask(storageTask);
    } else {
      setTask('');
    }
  }, [storageTask]);

  const handleFlyAway = () => {
    canUndoRef.current = true;
    screen === 5 && setNoButtonScale(true);
    setFlyAwayIndex(screen);
    setCanFlyAway(false);

    startCountdown();

    setTimeout(() => {
      setScreen(screen + 1);
      setFlyAwayIndex(-1);
    }, 500);

    if (canUndoRef.current) {
      if (screen === 3) {
        const taskOneData = localStorage.getItem('Task one');
        localStorage.setItem('Mask one', taskOneData);
        localStorage.removeItem('Task one');
        console.log('Task one changed to Mask one');
      } else if (screen === 4) {
        const taskTwoData = localStorage.getItem('Task two');
        localStorage.setItem('Mask two', taskTwoData);
        localStorage.removeItem('Task two');
        console.log('Task two changed to Mask two');
      } else if (screen === 5) {
        const taskThreeData = localStorage.getItem('Task three');
        localStorage.setItem('Mask three', taskThreeData);
        localStorage.removeItem('Task three');
        console.log('Task three changed to Mask three');
        localStorage.setItem('Done for today', JSON.stringify(true));
      }
    }

    setTimeout(() => {
      canUndoRef.current = false;
      setCanFlyAway(true);
    }, 1800);
  };

  const handleTaskInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSaveTask = () => {
    setContentBlurred(false);
    if (task.length > 0) {
      if (task !== localStorage.getItem(`Task ${screens[screen].id}`)) {
        setIsGreen(true);
        localStorage.setItem(`Task ${screens[screen].id}`, task.trim());
        setTask(task.trim());
        setTimeout(() => {
          setIsGreen(false);
          setScreen(
            screen === 2 && !firstInStorage && secondInStorage
              ? screen + 2
              : screen === 2 && !firstInStorage && !secondInStorage
              ? screen + 3
              : screen + 1
          );
        }, 800);
      }
    } else {
      localStorage.removeItem(`Task ${screens[screen].id}`);
    }
  };

  const handleBlurContent = () => {
    setContentBlurred(true);
  };

  const handleClearAll = () => {
    const userConfirmedRemove = window.confirm(
      '🔪 Should we remove all tasks?'
    );

    if (userConfirmedRemove) {
      [
        'Task one',
        'Task two',
        'Task three',
        'Mask one',
        'Mask two',
        'Mask three',
      ].forEach((key) => {
        localStorage.removeItem(key);
      });
      localStorage.removeItem('Done for today');
      canUndoRef.current = false;
      setScreen(0);
      isNotIOS() &&
        setTimeout(() => {
          inputRef.current.focus();
        }, 500);
    }
  };

  const handleUndo = () => {
    canUndoRef.current = false;
    setScreen(screen - 1);
    setCanFlyAway(true);

    if (screen === 4) {
      const maskOneData = localStorage.getItem('Mask one');
      localStorage.setItem('Task one', maskOneData);
      localStorage.removeItem('Mask one');
      console.log('Mask one changed to Task one');
    } else if (screen === 5) {
      const maskTwoData = localStorage.getItem('Mask two');
      localStorage.setItem('Task two', maskTwoData);
      localStorage.removeItem('Mask two');
      console.log('Mask two changed to Task two');
    } else if (screen === 6) {
      const maskThreeData = localStorage.getItem('Mask three');
      localStorage.setItem('Task three', maskThreeData);
      localStorage.removeItem('Mask three');
      console.log('Mask three changed to Task three');
      localStorage.setItem('Done for today', JSON.stringify(true));
    }
  };

  const handleEdit = () => {
    setScreen(screen - 3);

    isNotIOS() &&
      setTimeout(() => {
        inputRef.current.focus();
      }, 500);
  };

  const handleStartAllOver = () => {
    const userConfirmedStart = window.confirm(
      `😳 Wow! Do you really want more tasks today?`
    );
    if (userConfirmedStart) {
      localStorage.removeItem('Done for today');
      setScreen(0);
      canUndoRef.current = false;
      isNotIOS() &&
        setTimeout(() => {
          inputRef.current.focus();
        }, 500);
    }
  };

  const startCountdown = () => {
    let timeLeft = 1.8;
    const interval = setInterval(() => {
      timeLeft -= 0.1;
      setProgressWidth((timeLeft / 1.8) * 100);
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

  console.log('screen is', screen);

  return (
    <div
      id='desktop-container'
      style={{
        backgroundColor:
          screen === 0
            ? '#ffe8ea'
            : screen === 1
            ? '#fff5e8'
            : screen === 2
            ? '#e8fffe'
            : screen === 3
            ? '#f8f2f0'
            : screen === 4
            ? '#f2f1e9'
            : screen === 5
            ? '#d8f4f5'
            : '#e7fce6',
      }}
    >
      <div className='App'>
        {(modalVisible || oldVisitor === false) && (
          <Modal {...{ closeModal }} />
        )}

        {burntModalVisible && isOnFire && (
          <BurntModal {...{ closeBurntModal }} />
        )}

        {screen < 3 ? (
          <Initial
            {...{
              canFlyAway,
              noButtonScale,
              firstInStorage,
              secondInStorage,
              thirdInStorage,
              openModal,
              handleFlyAway,
              setScreen,
              prevStorageTask,
              inputRef,
              modalVisible,
              screens,
              screen,
              oldVisitor,
              isGreen,
              contentBlurred,
              getRandomPlaceholder,
              task,
              handleSaveTask,
              handleTaskInputChange,
              handleBlurContent,
              // blurTransitionVisible,
            }}
          />
        ) : (
          <Final
            {...{
              handleEdit,
              canFlyAway,
              handleStartAllOver,
              doneForToday,
              progressWidth,
              handleClearAll,
              handleUndo,
              undoButtonShown,
              screens,
              screen,
              flyAwayIndex,
              handleFlyAway,
              setScreen,
              openModal,
              task,
              noButtonScale,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
