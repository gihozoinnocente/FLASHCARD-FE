import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { ApolloClient, ApolloClientOptions, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import OneFlashCard from './OneFlashCard';
// import FlashCard from './FlashCard';
// import ListFlashCard from './ListFlashCard';
import AllFlashCard from './AllFlashcard';

const theme = createTheme({
	palette: {
		secondary: {
			main: '#54ff68',
			dark: '#00ca36',
			light: '#91ff9a',
		},
		primary: {
			main: '#5b35dd',
			light: '#9463ff',
			dark: '#0700aa',
		},
	},
	typography: {
		fontSize: 12,
		fontFamily: 'Roboto sans-serif',
	},
});

let clientObject: object = {
	uri: process.env.REACT_APP_BACKEND_URL,
	cache: new InMemoryCache(),
};

if (localStorage.getItem('token')) {
	clientObject = Object.assign(clientObject, {
		headers: { Authorization: `${localStorage.getItem('token')}` },
	});
}

const client = new ApolloClient(clientObject as ApolloClientOptions<typeof clientObject>);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ApolloProvider client={client}>
				<Routes>
					<Route path='' element={<Home />}></Route>
					<Route path='sign-in' element={<SignIn />}></Route>
					<Route path='sign-up' element={<SignUp />}></Route>
					{/* <Route path='flashcard' element={<FlashCard />}> */}
						{/* <Route path='' element={<ListFlashCard />} /> */}
						{/* <Route path=':id' element={<OneFlashCard />} /> */}
					{/* </Route> */}
					<Route path='allflashcard' element={<AllFlashCard />}></Route>
				</Routes>
				<ToastContainer />
			</ApolloProvider>
		</ThemeProvider>
	);
}

export default App;
