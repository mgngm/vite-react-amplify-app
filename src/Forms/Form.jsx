import React from 'react'
import {
    Box,
    FormControl,
    Input,
    FormLabel,
    FormHelperText,
    Button,
    Link
} from '@chakra-ui/react';

export default function Form(props) {

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
    } = props

    return (<div>
        <Box w={400}
            display='flex'
            p={12}
            alignItems='center'
            color={'white'}
            backgroundColor={'blackAlpha.500'}
            rounded={6}>
            <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' autoFocus
                    value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }/>

                <FormLabel htmlFor='email'>Password</FormLabel>
                <Input id='password' type='password'
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }/>

                <Box display='flex' mt='2' alignItems='center' justifyContent='space-between'>
                    {
                    hasAccount ? (
                                   <React.Fragment>
                                       <Button colorScheme='teal' size='sm'
                                           mt={2}
                                           onClick={
                                               () => handleSignIn()
                                       }>
                                           Sign In
                                       </Button>
                                       <FormHelperText>Don't have an accout?
                                           <Link color={'white'}
                                               ml={2} onClick={() => setHasAccount(!hasAccount)}>
                                               Sign Up</Link>
                                       </FormHelperText>
                                   </React.Fragment>
                               ) : (
                                   <React.Fragment>
                                       <Button colorScheme='teal' size='sm'
                                           mt={2}
                                           onClick={
                                               () => handleSignUp()
                                       }>
                                           Sign Up
                                       </Button>
                                       <FormHelperText>Already have an account?
                                           <Link color={'white'}
                                               ml={2} onClick={() => setHasAccount(!hasAccount)}>
                                               Sign In</Link>
                                       </FormHelperText>
                                   </React.Fragment>
                              )
                                        } </Box>
                                    <FormHelperText color={'red.200'} pt={5}>{error}</FormHelperText>
                                    </FormControl>                                                                
                                    
                                </Box>
                            </div>
                    )
                }
