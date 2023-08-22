// import Footer from './Footer';
import okIcon from './static/ok.png';

function Modal({ closeModal }) {
  return (
    <div className='modal'>
      <div className='modal-content-wrapper'>
        <h2 className='modal-heading'>Welcome to should:</h2>
        <p className='modal-text'>
          Here at our whimsical realm, we don't bite off more than we can chew.
          Instead, we embrace the magic of three daily tasks:{' '}
          <span className='modal-span' id='modal-span-one'>
            1
          </span>{' '}
          the most important,{' '}
          <span className='modal-span' id='modal-span-two'>
            2
          </span>{' '}
          a nice-to-do, and{' '}
          <span className='modal-span' id='modal-span-three'>
            3
          </span>{' '}
          the least important. <br></br><br></br>As the clock strikes midnight, those to-dos
          vanish in a puff of smoke, making way for a fresh day. Hey, let's keep
          it snappy: up to 25 characters each. Are you in?
        </p>
        <button className='modal-btn' onClick={closeModal}>
          <img src={okIcon} alt='Deal!'/>
        </button>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Modal;
