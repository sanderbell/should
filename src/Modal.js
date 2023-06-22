function Modal({ closeModal }) {
  return (
    <div className='modal'>
      <h2 className='modal-heading'>Welcome to should:</h2>
      <p className='modal-text'>
        This is how it works: worksworksworksw
        <br />
        sworksworksworksworkswsworksw
        <br />
        sworksworkswoorksworksw
        <br />
        sworksworksworksworksw
        <br />
        sworksworksworkswworksw
        <br />
        sworks workswoorksworksw
        <br />
        sworksworkswosworks
      </p>
      <button onClick={closeModal}>✖️</button>
    </div>
  );
}

export default Modal;
