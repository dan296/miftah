import React from 'react'
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';

const BackToSignInButton = ({text="Back to Sign in"}) => {
    const navigation = useNavigation();

    return (
        <CustomButton text={text} type="TERTIARY" onPress={() => navigation.navigate('SignIn')}/>
    )
}

export default BackToSignInButton