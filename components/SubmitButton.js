'use client'

import {useFormStatus} from 'react-dom'

function SubmitButton({children, pendingLabel}){
  const { pending }= useFormStatus()
  // const [pending, setPending] = useState(false)


  return <button className="bg-accent-500 px-5 ms:px-8 py-3 ms:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending}>
  {pending ? pendingLabel : children}
</button>
}

export default SubmitButton;