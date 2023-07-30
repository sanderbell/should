import Footer from './Footer';

function BurntModal({ closeBurntModal }) {
  return (
    <div className='modal'>
      <div className='modal-content-wrapper'>
        <h2 className='modal-heading'>They're gone...</h2>
        <p className='modal-text'>
          At the stroke of midnight, the fiery inferno was unleashed upon your
          to-dos! Behold, a new day dawns with fresh challenges! Let's conquer
          them with fervor!
        </p>
        <button className='ready-btn' onClick={closeBurntModal}>
          🧯
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default BurntModal;
