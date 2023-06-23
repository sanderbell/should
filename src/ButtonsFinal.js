import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ButtonsFinal(
  screens,
  currentScreen,
  task,
  setCurrentScreen,
  openModal,
  handleFlyAway
) {
  return (
    <div id='buttons-container'>
      {3 > currentScreen > 0 ? (
        <button
          onClick={() => setCurrentScreen(currentScreen - 1)}
          disabled={currentScreen === 0}
        >
          ←
        </button>
      ) : currentScreen !== 6 ? (
        <button onClick={openModal}>ℹ</button>
      ) : null}
      {currentScreen < 2 ? (
        <button
          onClick={() => setCurrentScreen(currentScreen + 1)}
          disabled={task.length === 0}
        >
          →
        </button>
      ) : (
        <FontAwesomeIcon
          icon={faCheck}
          size='2xl'
          style={
            currentScreen === 6
              ? {
                  transform: 'translateY(-270%) scale(5)',
                  transition: 'transform 2s cubic-bezier(0.84, -0.26, 0.16, 1)',
                }
              : null
          }
          onClick={currentScreen !== 6 ? () => handleFlyAway() : null}
        />
      )}

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

export default ButtonsFinal;
