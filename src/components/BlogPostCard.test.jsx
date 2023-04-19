import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';
globalThis.jest = vi;

const mockData = [
    {
        id: 1,
        title: 'Hello World',
        content: '123123123',
        last_updated: '2023-04-19T00:01:14.952Z',
        originally_published: '2023-04-19T00:01:14.952Z'
    }
];

const mockRouterContext = {
    history: {
        push: jest.fn(),
        location: { pathname: '/blog/' + mockData[0].id }
    }
};

describe('BlogPostCard component', () => {
    it('should render the correct information', async () => {
        const { getByText } = await render(
            <MemoryRouter>
                <BlogPostCard router={mockRouterContext} {...mockData[0]} />
            </MemoryRouter>
        );

        // Check for valid title
        expect(
            getByText(`#${mockData[0].id} - ${mockData[0].title}`)
        ).toBeInTheDocument();

        // Check for valid Published On date
        const published_on =
            `Published on ` +
            new Date(mockData[0].originally_published).toLocaleString();
        expect(getByText(published_on)).toBeInTheDocument();

        // Check for valid Last Updated date
        const last_updated =
            `Last updated on ` +
            new Date(mockData[0].last_updated).toLocaleString();
        expect(getByText(last_updated)).toBeInTheDocument();
    });
});
