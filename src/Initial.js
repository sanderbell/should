import IconButtonContainer from './IconButtonContainer';

function Initial({
  canFlyAway,
  noButtonScale,
  firstInStorage,
  secondInStorage,
  thirdInStorage,
  openModal,
  blurTransitionVisible,
  handleFlyAway,
  setScreen,
  prevStorageTask,
  contentBlurred,
  modalVisible,
  burntModalVisible,
  screens,
  screen,
  inputRef,
  isGreen,
  getRandomPlaceholder,
  task,
  handleKeyDown,
  handleSaveTask,
  handleTaskInputChange,
  handleBlurContent,
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
        {screens[screen].heading}
      </h1>
      <input
        ref={inputRef}
        className={`initial-input ${isGreen ? 'initial-input-saved' : ''}`}
        id={`initial-input-${screens[screen].id}`}
        type='text'
        autoFocus={contentBlurred}
        autoComplete='off'
        maxLength='25'
        spellCheck='false'
        placeholder={getRandomPlaceholder()}
        value={isGreen ? 'Saved!' : task}
        onFocus={handleBlurContent}
        onBlur={handleSaveTask}
        onChange={handleTaskInputChange}
        onKeyDown={handleKeyDown}
      />
      <IconButtonContainer
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
          contentBlurred,
          screen,
          task,
        }}
      />
    </div>
  );
}

export default Initial;
