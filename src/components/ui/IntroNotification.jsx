import { motion } from "framer-motion";

/**
 * Intro notification displayed on first visit
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the notification
 * @param {Function} props.onDismiss - Function to dismiss the notification
 * @param {Function} props.onCreateNewIsland - Function to create a new island
 */
function IntroNotification({ show, onDismiss, onCreateNewIsland }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg p-8 w-11/12 max-w-xl z-50 cursor-default'
    >
      <div className='text-left space-y-2 mb-3'>
        <p className='font-medium text-base'>🏝️ Model Island - 나만의 섬을 빚고 꾸며보세요 🏝️</p>
      </div>
      <p className='text-sm text-gray-700 mb-3'>
        왼쪽 위 연필 버튼을 눌러 섬을 편집해보세요! 아래 버튼으로 빈 섬부터 새로 만들 수도 있습니다.
      </p>
      <div className='flex justify-between items-center'>
        <button onClick={onCreateNewIsland} className='btn'>
          Create New Island
        </button>
        <button onClick={onDismiss} className='btn-dotted !text-sm text-slate-600'>
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}

export default IntroNotification;
