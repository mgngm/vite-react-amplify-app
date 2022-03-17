import {
    Flex,
    Box,
    Text,
    Badge,
    Avatar,
    Button
} from '@chakra-ui/react'
import React, {useContext, useEffect} from 'react'
import {UserContext} from '../App'
import {Auth, PubSub} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub';
import {useNavigate} from 'react-router';

export default function HomePage() { // Apply plugin with configuration

    let navigate = useNavigate()

    useEffect(() => {
        //currentAuthenticatedUser
        Auth.currentCredentials().then((info) => {
            console.log("Info", info)
            const cognitoIdentityId = info._identityId;
            console.log("_identityId", cognitoIdentityId);
        });


        Auth.currentCredentials().then((info) => {
            const cognitoIdentityId = info.identityId;
            console.log('identityId', cognitoIdentityId);
        });
    }, [])

    PubSub.addPluggable(new AWSIoTProvider({aws_pubsub_region: 'us-east-1', aws_pubsub_endpoint: 'wss://a38wc09pg36fnc-ats.iot.us-east-1.amazonaws.com/mqtt'})).then(res => console.log()).catch(err => console.error(err))

    PubSub.subscribe('myTopic').subscribe({
        next: data => console.log('Message received', data),
        error: error => console.error(error),
        complete: () => console.log('Done')
    });

    PubSub.publish('myTopic', {msg: 'Hello to all subscribers!'}).then(res => console.log("Message Published", res)).catch(err => console.error(err))


    const {user, setUser} = useContext(UserContext)
    const {email} = user ?. attributes

    function signOut() {
        Auth.signOut().then(res => {
            console.log("Logged out", res)
            navigate("../", {replace: true});

        }).catch(err => console.error(err))
    }

    
    return (
        <Box>
            <Flex p={3}
                rounded={10}
                backgroundColor={'gray.100'}>
                <Avatar src='https://bit.ly/sage-adebayo'/>
                <Box ml='3'>
                    <Text fontWeight='bold'
                        color={'gray.900'}>
                        Tswalano Van Dyk
                        <Badge ml='1' colorScheme='green'
                            rounded={15}>
                            {
                            true ? "Verified" : "UnVerified"
                        } </Badge>
                    </Text>
                    <Text fontSize='sm'
                        color={'gray.900'}>
                        {email}</Text>
                </Box>
            </Flex>

            <Flex justifyContent={'center'}
                alignItems="center">
                <Box pt={3}>
                    <Button bg={'HighlightText'}
                        fontSize={'sm'}
                        fontWeight={400}
                        _hover={
                            {bg: 'blue.500'}
                        }
                        onClick={
                            () => signOut()
                    }>
                        Logout
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}
