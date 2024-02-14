import { useAuth } from '@/context/AuthContext'

const DropdownButton: React.FC<{
  label: string
  onClick: () => void
  icon?: JSX.Element
}> = ({ label, onClick, icon }) => {
  const { user } = useAuth()
  if (user) {
    return
  }
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-black transition duration-300"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  )
}

export default DropdownButton
