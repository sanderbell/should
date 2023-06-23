function BurntModal({ closeBurntModal }) {
  return (
    <div className='modal'>
      <h2 className='modal-heading'>They're gone!</h2>
      <p className='modal-text'>
        At the stroke of midnight, we unleashed the fiery inferno upon your
        to-dos! Behold, a new day dawns with fresh challenges! Let's conquer
        them with fervor!
      </p>
      <button onClick={closeBurntModal}>🧯</button>
    </div>
  );
}

export default BurntModal;
