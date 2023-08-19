function Initial({
  contentBlurred,
  modalVisible,
  burntModalVisible,
  screens,
  currentScreen,
  oldVisitor,
  inputRef,
  isGreen,
  getRandomPlaceholder,
  task,
  handleKeyDown,
  handleSaveTask,
  handleTaskInputChange,
  handleBlurContent,
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
      // style={{ backgroundImage: 'url(/src/static/two.png)' }}
    >
      <h1
        style={
          contentBlurred
            ? { opacity: 0.5, filter: 'blur(8px)', transition: 'all 0.5s' }
            : null
        }
      >
        {screens[currentScreen].heading}
      </h1>
      <input
        ref={inputRef}
        className={`initial-input ${isGreen ? 'initial-input-saved' : ''}`}
        id={`initial-input-${screens[currentScreen].id}`}
        type='text'
        autoFocus={contentBlurred}
        autoComplete='off'
        maxLength='20'
        spellCheck='false'
        placeholder={getRandomPlaceholder()}
        value={isGreen ? 'Saved!' : task}
        onFocus={handleBlurContent}
        onBlur={handleSaveTask}
        onChange={handleTaskInputChange}
        onKeyDown={handleKeyDown}
      />
      <div
        id='buttons-container'
        style={
          contentBlurred
            ? { opacity: 0.2, filter: 'blur(12px)', transition: 'all 0.5s' }
            : null
        }
      >
        {currentScreen > 0 ? (
          <button
            onClick={() => setCurrentScreen(currentScreen - 1)}
            disabled={currentScreen === 0 || !prevStorageTask}
          >
            ⬅️
          </button>
        ) : (
          <button onClick={openModal}>ℹ️</button>
        )}
        {currentScreen < 2 ? (
          <button
            onClick={() => setCurrentScreen(currentScreen + 1)}
            disabled={task.length === 0}
          >
            ➡️
          </button>
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
          </button>
        )}
      </div>
    </div>
  );
}

export default Initial;