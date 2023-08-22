// import Footer from './Footer';
import extIcon from './static/ext.png';

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
        <button className='modal-btn' onClick={closeBurntModal}>
          <img src={extIcon} alt='Deal!' />
        </button>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default BurntModal;
