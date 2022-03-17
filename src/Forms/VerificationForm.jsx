import {useContext, useState} from 'react';
import {UserContext} from './../App';
import {
    Button,
    FormControl,
    Input,
    Box,
    Stack,
    Text
} from '@chakra-ui/react';
import {Auth} from 'aws-amplify';
import {Navigate, useNavigate} from 'react-router';

export default function VerificationForm() {

    let navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
    const [code, setCode] = useState('')

    const handleVerificationCodeConfirmation = async () => { // If MFA is enabled, sign-in should be confirmed with the confirmation code
        const loggedUser = await Auth.confirmSignIn(user, code, "SMS_MFA")
        setUser(loggedUser)

        console.log("User:", code);
        console.log("LoggedUser:", loggedUser);
        navigate("../welcome", {replace: true});
    }


    return (
        <Box rounded={'lg'}
            bg={'blackAlpha.500'}
            color={'white'}
            boxShadow={'lg'}
            w={350}
            p={5}>
            <Stack spacing={4}
                w={'full'}
                maxW={'md'}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>

                <Text fontSize={'sm'}
                    color={'gray.400'}>
                    Enter Verification Code
                </Text>

                <FormControl id="email">
                    <Input placeholder="Enter your verification code"
                        _placeholder={
                            {color: 'gray.500'}
                        }
                        type="text"
                        onChange={
                            (e) => setCode(e.target.value)
                        }/>
                </FormControl>
                <Stack spacing={6}>
                    <Button bg={'blue.400'}
                        color={'white'}
                        _hover={
                            {bg: 'blue.500'}
                        }
                        onClick={
                            () => handleVerificationCodeConfirmation()
                    }>
                        Verify
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
