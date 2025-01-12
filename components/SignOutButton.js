import { signOutAction } from '@/lib/actions';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

function SignOutButton({iconClass}) {
  return (
    <form action={signOutAction}>
       <button className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
      <ArrowRightOnRectangleIcon className={`h-5 w-5 text-primary-600 ${iconClass || ''}`} />
      <span>Sign out</span>
    </button>
    </form>
  );
}

export default SignOutButton;
