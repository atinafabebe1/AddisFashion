import { CheckboxProps } from '@/types'

const Checkbox: React.FC<CheckboxProps> = ({ label, id, onChange }) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        id={id}
        aria-describedby={id}
        type="checkbox"
        className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
        onChange={onChange}
      />
    </div>
    <div className="ml-3 text-sm">
      <label
        htmlFor={id}
        className="font-light text-gray-500 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </label>
    </div>
  </div>
)

export default Checkbox
