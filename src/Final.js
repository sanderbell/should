// import Footer from './Footer';
import BottomButtonContainer from './BottomButtonContainer';
import IconButtonContainer from './IconButtonContainer';

function Final({
  handleEdit,
  screens,
  undoButtonShown,
  canFlyAway,
  handleStartAllOver,
  handleUndo,
  screen,
  progressWidth,
  flyAwayIndex,
  handleFlyAway,
  setScreen,
  openModal,
  task,
  handleClearAll,
  noButtonScale,
}) {
  return (
    <div id='final-content'>
      <h1> {screens[screen].heading} </h1>
      <div id='final-screens-container'>
        <div
          className={`final-screens final-screen-${screens[screen].id} ${
            flyAwayIndex === screen ? 'fly-away' : ''
          }`}
          style={{
            animation:
              flyAwayIndex === screen
                ? 'flyAwayAnimation 1.5s ease 1'
                : screen === 3
                ? 'movein-four 2.7s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                : 'none',
          }}
        >
          <p className='final-screen-task'>
            {localStorage.getItem(`Task ${screens[screen - 3].id}`)}
          </p>
        </div>

        {screen + 1 < screens.length && (
          <div
            className={`final-screens final-screen-${screens[screen + 1].id}`}
            style={{
              animation:
                flyAwayIndex === screen + 1
                  ? 'flyAwayAnimation 1.5s ease 1'
                  : screen === 3
                  ? 'movein-five 2.5s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                  : 'none',
            }}
          >
            <p className='final-screen-task'>
              {localStorage.getItem(`Task ${screens[screen - 2].id}`)}
            </p>
          </div>
        )}

        {screen + 2 < screens.length && (
          <div
            className={`final-screens final-screen-${screens[screen + 2].id}`}
            style={{
              animation:
                flyAwayIndex === screen + 2
                  ? 'flyAwayAnimation 1.5s ease 1'
                  : screen === 3
                  ? 'movein-six 2.3s cubic-bezier(0.84, -0.26, 0.16, 1) 1'
                  : 'none',
            }}
          >
            <p className='final-screen-task'>
              {localStorage.getItem(`Task ${screens[screen - 1].id}`)}
            </p>
          </div>
        )}
      </div>

      <IconButtonContainer
        {...{
          canFlyAway,
          noButtonScale,
          openModal,
          handleFlyAway,
          setScreen,
          screen,
          task,
        }}
      />
      <BottomButtonContainer
        {...{
          handleEdit,
          setScreen,
          undoButtonShown,
          screen,
          handleClearAll,
          handleStartAllOver,
          progressWidth,
          handleUndo,
        }}
      />
    </div>
  );
}

export default Final;
