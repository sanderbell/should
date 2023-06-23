function Initial({
  modalVisible,
  burntModalVisible,
  screens,
  currentScreen,
  oldVisitor,
  isGreen,
  getRandomPlaceholder,
  task,
  handleKeyDown,
  handleSaveTask,
  handleTaskInputChange,
  firstInStorage,
  secondInStorage,
  thirdInStorage,
  openModal,
  setCurrentScreen,
  prevStorageTask,
}) {
  return (
    <div
      className={
        modalVisible || burntModalVisible
          ? 'initial-content blurred'
          : 'initial-content'
      }
    >
      <h1> {screens[currentScreen].heading} </h1>

      <input
        className={`initial-input ${isGreen ? 'initial-input-saved' : ''}`}
        id={`initial-input-${screens[currentScreen].id}`}
        type='text'
        autoFocus={oldVisitor ? true : false}
        autoComplete='off'
        maxLength='20'
        spellCheck='false'
        placeholder={getRandomPlaceholder()}
        value={task}
        onBlur={handleSaveTask}
        onChange={handleTaskInputChange}
        onKeyDown={handleKeyDown}
      />

      <div id='buttons-container'>
        {currentScreen > 0 ? (
          <button
            onClick={() => setCurrentScreen(currentScreen - 1)}
            disabled={currentScreen === 0 || !prevStorageTask}
          >
            ⬅️
          </button> //FIXME: Arrow left
        ) : (
          <button onClick={openModal}>ℹ️</button> //FIXME: Info
        )}
        {currentScreen < 2 ? (
          <button
            onClick={() => setCurrentScreen(currentScreen + 1)}
            disabled={task.length === 0}
          >
            ➡️
          </button> //FIXME: Arrow right
        ) : (
          <button
            onClick={() =>
              firstInStorage
                ? setCurrentScreen(currentScreen + 1)
                : secondInStorage
                ? setCurrentScreen(currentScreen + 2)
                : thirdInStorage
                ? setCurrentScreen(currentScreen + 3)
                : 0
            }
            disabled={task.length === 0}
          >
            🫡
          </button> //FIXME: Todo
        )}
      </div>
    </div>
  );
}

export default Initial;
