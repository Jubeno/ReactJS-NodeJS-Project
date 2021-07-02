// import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'
// import { API_PATHS } from '../../../library/common/constants';
// import SignIn from './SignIn';
// import {
//     QueryClient,
//     QueryClientProvider
// } from 'react-query';



// const queryClient = new QueryClient()
// const server = setupServer(
//     rest.get(API_PATHS.signIn, (req, res, ctx) => {
//         return res(ctx.json({ greeting: 'Hello there!!' }))
//     })
// );

// // establish API mocking before all tests
// beforeAll(() => server.listen());
// // reset any request handlers that are declared as a part of our tests
// afterEach(() => server.resetHandlers());
// // clean up once the tests are done
// afterAll(() => server.close());


// describe('SIGN IN', () => {
//     test('loads and displays greeting', async () => {
//         render(
//             <QueryClientProvider client={queryClient}>
//                 <SignIn />
//             </QueryClientProvider>
//         )
//         fireEvent.click(screen.getByText('Submit'));
    
//         const heading = await waitFor(() => screen.getByRole('heading'));
//         expect(heading).toHaveTextContent('Greeting')
//     });


//     test('handled server error', async () => {
//         server.use(
//             rest.get(API_PATHS.signIn, (req, res, ctx) => {
//                 return res(ctx.status(500))
//             })
//         )
//     })
// })


