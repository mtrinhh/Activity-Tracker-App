import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateActivity from './CreateActivity';

it('renders the "Create New Activity" heading', () => {
    render(<CreateActivity />);
    const heading = screen.getByText('Create New Activity');
    expect(heading).toBeInTheDocument();
});

test('renders the "Username" label', () => {
    render(<CreateActivity />);
    const usernameLabel = screen.getByText('Username:');
    expect(usernameLabel).toBeInTheDocument();
}); 
