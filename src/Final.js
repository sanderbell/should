import Footer from './Footer';

function Final({
  screens,
  undoButtonShown,
  canFlyAway,
  doneForToday,
  handleUndo,
  currentScreen,
  progressWidth,
  flyAwayIndex,
  handleFlyAway,
  setCurrentScreen,
  openModal,
  task,
  handleClearAll,
  noButtonScale,
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
            ⬅️ //TODO: ARROW LEFT
          </button>
        ) : currentScreen < 3 ? (
          <button onClick={openModal}>ℹ️</button>
        ) : currentScreen < 6 ? (
          <button onClick={() => setCurrentScreen(currentScreen - 3)}>
            ✏️
          </button>
        ) : null}
        {currentScreen < 2 ? (
          <button
            onClick={() => setCurrentScreen(currentScreen + 1)}
            disabled={task.length === 0}
          >
            ➡️ //TODO: ARROW RIGHT
          </button>
        ) : (
          <button
            disabled={
              canFlyAway === false && currentScreen !== 3 && currentScreen !== 6
            }
            className={noButtonScale ? 'no-hover' : null}
            style={
              currentScreen === 6
                ? {
                    transform: 'translateY(-160%) scale(4) rotate(360deg)', //FIXME: delete scale from button:hover
                    transition:
                      'transform 2s cubic-bezier(0.84, -0.5, 0.16, 1)',
                  }
                : null
            }
            onClick={currentScreen !== 6 ? () => handleFlyAway() : null}
          >
            ✅
          </button>
        )}
      </div>
      {currentScreen < 6 ? (
        <button id='bottom-button' onClick={handleClearAll}>
          CLEAR ALL
        </button>
      ) : (
        <button
          id='bottom-button'
          onClick={() => {
            localStorage.removeItem('Done for today');
            setCurrentScreen(0);
          }}
        >
          START ALL OVER
        </button>
      )}
      {undoButtonShown === true ? (
        <button onClick={handleUndo} id='can-undo'>
          UNDO
          <div id='progress-bar' style={{ width: `${progressWidth}%` }}></div>
        </button>
      ) : null}
      {doneForToday && <Footer />}
    </div>
  );
}

export default Final;
