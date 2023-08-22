function BottomButtonContainer({
  setScreen,
  undoButtonShown,
  screen,
  handleClearAll,
  handleStartAllOver,
  progressWidth,
  handleUndo,
  handleEdit,
}) {
  return (
    <div id='bottom-buttons-container'>
      {screen < 6 && !undoButtonShown ? (
        <>
          <button className='bottom-button' onClick={handleEdit}>
            EDIT TASK
          </button>
          <button className='bottom-button' onClick={handleClearAll}>
            CLEAR ALL
          </button>
        </>
      ) : screen === 6 && !undoButtonShown ? (
        <button
          id='button-start-again'
          className='bottom-button'
          onClick={handleStartAllOver}
        >
          SET NEW TASKS
        </button>
      ) : undefined}
      {undoButtonShown === true ? (
        <button onClick={handleUndo} id='can-undo'>
          UNDO
          <div id='progress-bar' style={{ width: `${progressWidth}%` }}></div>
        </button>
      ) : null}
    </div>
  );
}

export default BottomButtonContainer;
