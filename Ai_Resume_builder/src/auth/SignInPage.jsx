import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center my-20 items-center'>
        <SignIn signUpUrl='/auth/sign-up'/>
    </div>
  )
}

export default SignInPage