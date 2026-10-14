import { motion, AnimatePresence } from "framer-motion";
import { Pencil, X } from "lucide-react";

import KeyBindingItem from "../KeyBindingItem";

import ToolTip from "./ToolTip";

/**
 * Toggle button for edit mode
 * @param {Object} props
 * @param {boolean} props.editMode - Current edit mode state
 * @param {Function} props.toggleEditMode - Function to toggle edit mode
 */
const ToolbarToggle = ({ editMode, toggleEditMode }) => (
  <button
    onClick={toggleEditMode}
    aria-label='편집 모드 전환'
    className='relative cursor-pointer w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400'
  >
    <AnimatePresence mode='wait'>
      {editMode ? (
        <div className='group'>
          <motion.div
            key='close'
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 20, opacity: 0 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <X strokeWidth={1} />
          </motion.div>
          <ToolTip>
            <KeyBindingItem keyCombination={["e"]} action='편집 모드 종료' tag='span' flip />
          </ToolTip>
        </div>
      ) : (
        <div className='group'>
          <motion.div
            key='edit'
            initial={{ rotate: 20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -20, opacity: 0 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <Pencil strokeWidth={1} />
          </motion.div>
          <ToolTip>
            <KeyBindingItem keyCombination={["e"]} action='편집 모드' tag='span' flip />
          </ToolTip>
        </div>
      )}
    </AnimatePresence>
  </button>
);

export default ToolbarToggle;
