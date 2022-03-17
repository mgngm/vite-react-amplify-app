import React, {useContext} from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import {UserContext} from '../App';

function SigninForm() {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        handleSignUp,
        hasAccount,
        setHasAccount,
        error,
        setError
    } = useContext(UserContext)


    return (
        <Box rounded={'lg'}
            bg={'blackAlpha.500'}
            color={'white'}
            boxShadow={'lg'}
            w={350}
            p={5}>
            <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input id='email' type='email' autoFocus
                        value={email}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }/>
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input id='password' type='password'
                        value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }/>
                </FormControl>
             {hasAccount ? (   <Stack spacing={10}>
                    <Stack>
                        <Text>Don't have an account?
                            <Link ml={2}
                                onClick={
                                    () => setHasAccount(!hasAccount)
                            }>
                                Sign Up</Link>
                        </Text>

                        <Text color={'red.200'}>
                            {error}</Text>
                    </Stack>


                    <Button bg={'blue.400'}
                        color={'white'}
                        _hover={
                            {bg: 'blue.500'}
                        }
                        onClick={
                            () => handleSignIn()
                    }>
                        Sign in
                    </Button>
                </Stack>):   <Stack spacing={10}>
                    <Stack>
                        <Text>Already have an account?
                            <Link ml={2}
                                onClick={
                                    () => setHasAccount(!hasAccount)
                            }>
                                Sign In</Link>
                        </Text>

                        <Text color={'red.200'}>
                            {error}</Text>
                    </Stack>


                    <Button bg={'blue.700'}
                        color={'white'}
                        _hover={
                            {bg: 'blue.500'}
                        }
                        onClick={
                            () => handleSignUp()
                    }>
                        Sign Up
                    </Button>
                </Stack>}
            </Stack>
        </Box>
    )
}

export default SigninForm
