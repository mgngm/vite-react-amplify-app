import React from 'react'
import {Center} from '@chakra-ui/react'
import Amplify, {Auth, Analytics} from 'aws-amplify';

import awsconfig from '../aws-exports';


export default function PinpointAnalytics() {

  Amplify.configure(awsconfig);


    function PinpointAnalytics() {
        console.log("Sending record to pinpoint analytics....");
        Analytics.record({name: "Performance is not hitting the bull’s- eye with every shot – that is a circus act"}).then((result) => {
            console.log(JSON.stringify(result));

        }).catch((err) => {
            console.error(err);
        });

    }


    PinpointAnalytics();

    return (
        <div>
            <Center h='100vh'>
                This is the Center
            </Center>
        </div>
    )
}
