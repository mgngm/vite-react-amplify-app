import React, {useEffect, useState} from 'react'
import Amplify, {Auth, PubSub} from 'aws-amplify';

import {AWSIoTProvider} from '@aws-amplify/pubsub';
import {Authenticator} from '@aws-amplify/ui-react';
import {
    Center,
    Box,
    Heading,
    Button,
    Flex,
    Text,
    Badge,
    Avatar
} from '@chakra-ui/react'
import awsconfig from './aws-exports';

Auth.configure(awsconfig);
Amplify.addPluggable(new AWSIoTProvider({aws_pubsub_region: 'us-east-1', aws_pubsub_endpoint: 'wss://a38wc09pg36fnc-ats.iot.us-east-1.amazonaws.com/mqtt'}));

export default function Test() {

    const [user, setUser] = useState({})
    const [errorMsg, setErrorMsg] = useState("")
    const [iot, setIoT] = useState("")

    const SignIn = () => {
        Auth.signIn("moganegb@gmail.com", "Tswalano@42").then(res => {
            console.log("User Logged:", res)
            authListerner();
        }).catch(err => console.error("Couldn't retrieve user", err))
    }

    const SignUp = () => {
        Auth.signUp({
            "username": "moganegb@gmail.com",
            "password": "Tswalano@42",
            attributes: {
                "email": "moganegb@gmail.com",
                "phone_number": "+27617262421"
            }
        }).then(user => {
            console.log("User Registered:", user)
        }).catch(err => console.error("Couldn't register user"))
    }

    const SignOut = () => {
        Auth.signOut().then(res => {
            console.log("logging out user...")
            authListerner();
        }).catch(err => console.error("Error logging out", err))
    }

    const authListerner = () => {
        Auth.currentAuthenticatedUser().then(res => {
            if (res && res ?. attributes) {
                console.log("if..");
                setErrorMsg("User is Authenticated")
                setUser(res ?. attributes)
            } else {
                console.log("here");
                setErrorMsg("User is not Authenticated")
                setUser({})
            }
        }).catch(err => {
            setErrorMsg(err)
        })
    }

    useEffect(() => {
        authListerner();
    }, [])


    return (
        <Center h={'100vh'}
            p={100}
            backgroundColor={'gray.900'}>


            <Box>
                <Flex p={3}
                    rounded={10}
                    backgroundColor={'gray.100'}>
                    {
                    user && user.email ? (
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                    ) : <></>
                }
                    <Box ml='3'>
                        {
                        user && user.email ? <>
                            <Text fontWeight='bold'
                                color={'gray.900'}>
                                Welcome User 👋
                                <Badge ml='1' colorScheme='green'
                                    rounded={15}>
                                    Online</Badge>
                            </Text>
                            <Text fontSize='sm'
                                color={'gray.900'}>
                                {
                                user ?. email
                            }</Text>
                        </> : <>
                            <Text fontWeight='bold'
                                color={'gray.900'}>
                                Welcome to the cool app test App 👌
                                <Badge ml='1' colorScheme='red'
                                    rounded={15}>Offline
                                </Badge>
                            </Text>
                            <Text fontSize='sm'
                                color={'gray.900'}>Log in to see the cool 😎
                            </Text>
                            <Text fontSize='sm'
                                color={'gray.900'}>
                                {
                                user ?. email
                            }</Text>
                        </>
                    } </Box>
                </Flex>

                <Flex justifyContent={'center'}
                    alignItems="center">
                    <Box pt={3}>
                        {
                        user && user.email ? (
                            <Button bg={'HighlightText'}
                                fontSize={'sm'}
                                fontWeight={400}
                                _hover={
                                    {bg: 'blue.500'}
                                }
                                onClick={
                                    () => SignOut()
                            }>
                                Logout
                            </Button>
                        ) : (
                            <Button bg={'HighlightText'}
                                fontSize={'sm'}
                                fontWeight={400}
                                _hover={
                                    {bg: 'blue.500'}
                                }
                                onClick={
                                    () => SignIn()
                            }>
                                Log-In
                            </Button>
                        )
                    } </Box>
                </Flex>
            </Box>
        </Center>
    )
}
