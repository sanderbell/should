function Final({
  screens,
  currentScreen,
  flyAwayIndex,
  handleFlyAway,
  setCurrentScreen,
  openModal,
  task,
}) {
  return (
    <div id='final-content'>
      <h1> {screens[currentScreen].heading} </h1>
      <div id='final-screens-container'>
        <div
          className={`final-screens final-screen-${screens[currentScreen].id} ${
            flyAwayIndex === currentScreen ? 'fly-away' : ''
          }`}
          style={{
            animation:
              flyAwayIndex === currentScreen
                ? 'flyAwayAnimation 1.5s ease 1'
                : currentScreen === 3
                ? 'movein-four 2.7s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
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
                  ? 'movein-five 2.5s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                  : 'none',
            }}
          >
            <p className='final-screen-task'>
              {localStorage.getItem(`Task ${screens[currentScreen - 2].id}`)}
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
                  ? 'movein-six 2.3s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                  : 'none',
            }}
          >
            <p className='final-screen-task'>
              {localStorage.getItem(`Task ${screens[currentScreen - 1].id}`)}
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
      {currentScreen < screens.length - 1 && (
        <button
          id='edit-button'
          onClick={() => setCurrentScreen(currentScreen - 3)}
        >
          ✂️ EDIT TASKS
        </button>
      )}
    </div>
  );
}

export default Final;
