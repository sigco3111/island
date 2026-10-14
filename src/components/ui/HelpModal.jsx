import Kbd from "../Kbd";
import KeyBindingItem from "../KeyBindingItem";

/**
 * Modal for displaying keyboard shortcuts and help information
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the modal
 * @param {Function} props.onClose - Function to close the modal
 */
function HelpModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div role='dialog' aria-modal='true' className='fixed inset-0 bg-ocean/50 backdrop-blur-md flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow max-w-2xl w-full p-6'>
        <h2 className='text-xl font-semibold mb-4'>도움말과 단축키</h2>
        <div className='mb-4'>
          <h3 className='font-medium mb-4'>키보드 단축키</h3>
          <ul className='list-outside list-none ml-0 space-y-1'>
            <li>
              <KeyBindingItem keyCombination={["e"]} action='편집 모드 전환' tag='span' />
            </li>
            <li>
              <KeyBindingItem keyCombination={["v"]} action='이동 도구 (카메라 조작)' tag='span' />
            </li>
            <li className='flex items-center gap-x-3'>
              <KeyBindingItem keyCombination={["a", "s"]} action='지형 높이기 / 낮추기' separator=' ' tag='span' />
            </li>
            <li className='pt-2 pb-3 text-sm'>
              <strong className='text-blue-600'>팁!</strong> 지형 편집 중 <Kbd>Alt</Kbd>를 누르면 높이기와 낮추기를 빠르게 전환합니다.
              <br />
              <Kbd>Ctrl</Kbd>를 누른 채 카메라를 조절하세요.
            </li>
            <li>
              <KeyBindingItem keyCombination={["[", "]"]} action='브러시 크기 줄이기 / 늘리기' separator=' ' tag='span' />
            </li>
            <li>
              <KeyBindingItem keyCombination={["-", "+"]} action='브러시 강도 줄이기 / 늘리기' separator=' ' tag='span' />
            </li>
            <li>
              <KeyBindingItem keyCombination={["u", "y"]} action='실행 취소 / 다시 실행' tag='span' />
            </li>
            <li>
              <KeyBindingItem keyCombination={["Shift + R"]} action='초기화' tag='span' />
            </li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className='cursor-pointer mt-2 px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default HelpModal;
