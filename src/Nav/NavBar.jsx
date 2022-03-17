import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Button
} from '@chakra-ui/react';
import {Auth} from 'aws-amplify';


export default function NavBar(props) {


    async function signOut() {
        console.log("SignOut");
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const {email} = props

    return (
        <Box bg={'gray.700'}
            h={'100vh'}>
            <Box bg={'gray.900'}
                px={4}>
                <Flex h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    {/* <Flex bg={'gray.900'}
                    color={'gray.600'}
                    minH={'60px'}
                    py={
                        {base: 2}
                    }
                    px={
                        {base: 100}
                    }
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={'gray.900'}
                    align={'center'}> */}
                    <Flex flex={
                            {base: 1}
                        }
                        justify={
                            {
                                base: 'center',
                                md: 'start'
                            }
                    }>
                        <Text textAlign={'center'}
                            fontFamily={'heading'}
                            color={'white'}>
                            Amplify App
                        </Text>
                    </Flex>

                    <Stack flex={
                            {
                                base: 1,
                                md: 0
                            }
                        }
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Button bg={'HighlightText'}
                            fontSize={'sm'}
                            fontWeight={400}>
                            {email} </Button>
                        <Button display={
                                {
                                    base: 'none',
                                    md: 'inline-flex'
                                }
                            }
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'pink.400'}
                            href={'#'}
                            _hover={
                                {bg: 'pink.300'}
                            }
                            onClick={
                                () => signOut()
                        }>
                            Sign Out
                        </Button>
                    </Stack>
                </Flex>

            </Box>

            {/* <Box height={''}>
                <Flex h={'100%'}
                    alignItems={'center'}
                    justifyContent='center'
                    backgroundColor={'gray.700'}
                    color={'white'}>
                    Main Content Here

                </Flex>
            </Box> */} </Box>
    );
}
