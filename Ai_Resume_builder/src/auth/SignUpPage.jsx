import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='flex justify-center my-20 items-center'>
    <SignUp signInUrl='sign-in'/>
    </div>
  )
}

export default SignUpPage