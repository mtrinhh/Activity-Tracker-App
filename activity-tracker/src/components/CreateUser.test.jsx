import { render, screen, fireEvent } from '@testing-library/react';
import CreateUser from './CreateUser';


it('CreateUser component displays error message for existing user', () => {
    render(<CreateUser />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'existingUser' } });
    const submitButton = screen.getByText('Create User');
    fireEvent.click(submitButton);
});

it('renders the Create User button', () => {
    render(<CreateUser />);
    const createUserButton = screen.getByText('Create User');
    expect(createUserButton).toBeInTheDocument();
});