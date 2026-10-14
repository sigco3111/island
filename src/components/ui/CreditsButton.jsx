/**
 * Button to show credits
 * @param {Object} props
 * @param {Function} props.onShowCredits - Function to show credits modal
 */
function CreditsButton({ onShowCredits }) {
  return (
    <div className='absolute bottom-[26px] right-12 w-auto h-[26px] flex items-center'>
      <button onClick={onShowCredits} className='btn-dotted text-white'>
        제작진
      </button>
    </div>
  );
}

export default CreditsButton;
