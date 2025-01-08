import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const AdminRoute = async ({children}) => {

  const session = await auth();

  if(!session?.user?.admin){
    redirect('/')
  }

  return (
    <>
    {children}
    </>
  )
}

export default AdminRoute