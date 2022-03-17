import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Box, ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom';
import Test from './Test';
import PinpointAnalytics from './Components/PinpointAnalytics';

ReactDOM.render (
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <Test/>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
