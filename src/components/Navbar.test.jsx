import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
globalThis.jest = vi;

const mockRouterContext = {
    history: {
        push: jest.fn(),
        location: { pathname: '/home' }
    }
};

describe('Navbar component', () => {
    it('should show correct title and selection', async () => {
        const title = 'Hello World';
        const { getByText } = await render(
            <MemoryRouter>
                <Navbar title={title} router={mockRouterContext} />
            </MemoryRouter>
        );

        // Check for valid title
        expect(getByText(title)).toBeInTheDocument();

        // Check for home to have navbar-link-active class
        expect(getByText('Home')).toHaveClass('navbar-link-active');

        // Check for Create New Post to not have navbar-link-active class
        expect(getByText('Create New Post')).not.toHaveClass(
            'navbar-link-active'
        );
    });
});
