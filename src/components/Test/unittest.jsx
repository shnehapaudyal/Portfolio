import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestAutomationHub from './test';

describe('TestAutomationHub', () => {
  it('renders main heading and sections', () => {
    render(<TestAutomationHub />);
    expect(screen.getByText(/Automation Testing Learning Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/Popular Tools/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
    expect(screen.getByText(/Tutorials/i)).toBeInTheDocument();
    expect(screen.getByText(/User Registration/i)).toBeInTheDocument();
  });

  it('shows error messages when registration form is submitted empty', () => {
    render(<TestAutomationHub />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
  });

  it('shows thank you message on successful registration', () => {
    render(<TestAutomationHub />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'Test@1234' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: '+12345678901' } });
    fireEvent.change(screen.getByPlaceholderText(/Address/i), { target: { value: '123 Main St' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/Thank you for submitting/i)).toBeInTheDocument();
  });
});