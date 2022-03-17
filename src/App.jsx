import {useEffect, useState, createContext} from 'react'
import Amplify, {Auth, Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
import Views from './Views';
import {useNavigate} from "react-router-dom";


Amplify.configure(awsconfig);

export const UserContext = createContext();

function App() {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasAccount, setHasAccount] = useState(true)
    const [error, setError] = useState('')

    let navigate = useNavigate();

    const clearFormInputs = () => {
        setEmail('');
        setPassword('');
    }

    async function handleSignUp() {
        try {
            const {user} = await Auth.signUp({
                "username": "moganegb@gmail.com",
                "password": "Tswalano@42",
                attributes: {
                    "email": "moganegb@gmail.com",
                    "phone_number": "+27617262421"
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp("tswalano@gmail.com", "196442");
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    const handleSignIn = async () => {
        await Auth.signIn(email, password).then(async (user) => {
           debugger
            if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') { // TODO - Show the Varification component
                console.log("MFA Code sent....");
                setUser(user);
                navigate("../otp", {replace: true});
            } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') { // TODO - User should enter password
                console.log("New Password is required");
            } else { // TODO ...something else here
                console.log("Else statemenet");
                setUser(user);
                navigate("../welcome", {replace: true});
            }
        }).catch((e) => {
            if (e.message) {
                setError(e.message)
            } else {
                setError("unknon error occured")
                console.log("Error", e)
            }
        })
    }

    function handleChange(event) {
        setCode(event.target.value)
    }

    const authListerner = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log(user);
            setUser(user);
            navigate("../welcome", {replace: true});
        } catch {
            setUser('');
        }}

    useEffect(() => {
        authListerner()
    }, [])

    return (
        <UserContext.Provider value={
            {
                email,
                setEmail,
                password,
                setPassword,
                handleSignIn,
                handleSignUp,
                error,
                setError,
                hasAccount,
                setHasAccount,
                user,
                setUser
            }
        }>
            <Views/>
        </UserContext.Provider>
    // <div> {
    //     user ? (
    //         <HomePage user={user}/>
    //     ) : (
    //         <>

    //         </>
    //     )
    // }</div>
    )
}


// const LoginForm = (
//     <Flex height='100vh'
//         alignItems={'center'}
//         justifyContent='center'
//         backgroundColor={'gray.700'}>
//         <Flex direction={'column'}>
//             <Heading color={'white'}
//                 alignSelf={'center'}>Amplify React App</Heading>

//             <Form email={email}
//                 setEmail={setEmail}
//                 password={password}
//                 setPassword={setPassword}
//                 handleSignIn={signIn}
//                 handleSignUp={signUp}
//                 error={error}
//                 setError={setError}
//                 hasAccount={hasAccount}
//                 setHasAccount={setHasAccount}/>
//         </Flex>

//     </Flex>
// )

export default App
