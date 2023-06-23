function Modal({ closeModal }) {
  return (
    <div className='modal'>
      <h2 className='modal-heading'>Welcome to should:</h2>
      <p className='modal-text'>
        Set three daily tasks: the most important, a nice-to-do, and the least
        important. At midnight, they'll burn, making room for the new day. Keep
        it concise: under 20 characters each. Because less is more.
        <br /><br />
        Ready?
      </p>
      <button onClick={closeModal}>🤝</button>
    </div>
  );
}

export default Modal;
