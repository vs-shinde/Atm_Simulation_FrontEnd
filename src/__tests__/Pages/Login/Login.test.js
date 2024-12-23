import React from 'react';
import '@testing-library/jest-dom';
import AuthProvider from '../../../Context/AuthContext';
import { cleanup, render,screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../../App';
import axios from 'axios';

describe('<App> component test reder',()=>{
    beforeEach(()=>{
        const loginAction = jest.fn();
        const logoutAction = jest.fn();
        const userId = null;
        const token = '';
        sessionStorage.setItem('token','');
        sessionStorage.setItem('userId','');
        render(<AuthProvider value={{loginAction,logoutAction,userId,token}}><App /></AuthProvider>);
    })
   afterEach(()=>{
      sessionStorage.removeItem('token','');
      sessionStorage.removeItem('userId','');
      cleanup();
   });
   it('Login component render, check Login button is visible', async () => {
      
      
      const accountNumberInputText = screen.getByPlaceholderText('Enter account no');
      const pinInputText = screen.getByPlaceholderText('Enter PIN');
      const loginButton = screen.getByTestId('btn-login');

      expect(accountNumberInputText).toBeInTheDocument();
      expect(pinInputText).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();

      fireEvent.change(accountNumberInputText,{target: {id: 'accountNo',value: 'satyanand.tiwari@ltimindtree.com'}});
      fireEvent.change(pinInputText,{target: {id: 'pin',value: '1254'}});
      fireEvent.click(loginButton);
      
      await waitFor(()=>{
        const errorMsg = screen.getByText('Something went wrong. Please try latter.');
        expect(errorMsg).toBeInTheDocument();
      });
   });
});
