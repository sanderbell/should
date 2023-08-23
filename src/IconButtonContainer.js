import arrowLeftIcon from './static/larrow.png';
import arrowRightIcon from './static/rarrow.png';
import infoIcon from './static/info.png';
import saluteIcon from './static/salute.png';
import doneIcon from './static/done.png';

function IconButtonContainer({
  canFlyAway,
  noButtonScale,
  firstInStorage,
  secondInStorage,
  thirdInStorage,
  openModal,
  handleFlyAway,
  setScreen,
  prevStorageTask,
  contentBlurred,
  screen,
  task,
}) {
  return (
    <div
      id='buttons-container'
      style={
        contentBlurred
          ? { opacity: 0.2, filter: 'blur(12px)', transition: 'all 0.5s' }
          : null
      }
    >
      {screen === 0 ? (
        <>
          <button onClick={openModal}>
            <img draggable='false' src={infoIcon} alt='More info' />
          </button>
          <button
            onClick={() => setScreen(screen + 1)}
            disabled={task.length === 0}
          >
            <img draggable='false' src={arrowRightIcon} alt='Forward' />
          </button>
        </>
      ) : screen === 1 ? (
        <>
          <button
            onClick={() => setScreen(screen - 1)}
            disabled={screen === 0 || !prevStorageTask}
          >
            <img draggable='false' src={arrowLeftIcon} alt='Back' />
          </button>
          <button
            onClick={() => setScreen(screen + 1)}
            disabled={task.length === 0}
          >
            <img draggable='false' src={arrowRightIcon} alt='Forward' />
          </button>
        </>
      ) : screen === 2 ? (
        <>
          <button
            onClick={() => setScreen(screen - 1)}
            disabled={screen === 0 || !prevStorageTask}
          >
            <img draggable='false' src={arrowLeftIcon} alt='Back' />
          </button>
          <button
            onClick={() =>
              firstInStorage
                ? setScreen(screen + 1)
                : secondInStorage
                ? setScreen(screen + 2)
                : thirdInStorage
                ? setScreen(screen + 3)
                : 0
            }
            disabled={task.length === 0}
          >
            <img draggable='false' src={saluteIcon} alt='Ready to tackle!' />
          </button>
        </>
      ) : screen > 2 ? (
        <button
          disabled={canFlyAway === false && screen !== 3 && screen !== 6}
          className={noButtonScale ? 'no-hover' : null}
          style={
            screen === 6
              ? {
                  transform: 'translateY(-200%) scale(3.7) rotate(360deg)',
                  transition: 'transform 2s cubic-bezier(0.84, -0.7, 0.16, 1)',
                }
              : null
          }
          onClick={screen < 6 ? handleFlyAway : null}
        >
          <img draggable='false' src={doneIcon} alt='Done!' />
        </button>
      ) : (
        'null'
      )}
    </div>
  );
}

export default IconButtonContainer;
