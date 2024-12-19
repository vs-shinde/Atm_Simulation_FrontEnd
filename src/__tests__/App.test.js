import React from 'react';
import '@testing-library/jest-dom';
import App from '../App';
import AuthProvider from '../Context/AuthContext';
import { cleanup, render,screen } from '@testing-library/react';

describe('<App> component test reder',()=>{
   afterEach(()=>{
      cleanup();
   });
   it('User Login then load homepage', async () => {
      sessionStorage.setItem('token','test-token');
      sessionStorage.setItem('userId','5');
      const { container } = render(<AuthProvider><App /></AuthProvider>);
      const withdrawText = screen.getByText('Withdraw');
      expect(withdrawText).toHaveTextContent('Withdraw');
   });
   
   it('Without login check signup here', async () => {
      sessionStorage.setItem('token','');
      sessionStorage.setItem('userId','');
      const { container } = render(<AuthProvider><App /></AuthProvider>);
      const signupText = screen.getByText('Sign up here');
      expect(signupText).toHaveTextContent('Sign up here');
   });
});
