import React, {useState} from 'react';
import { View, Text, useWindowDimensions, ScrollView, Alert } from 'react-native';
import styles from './confirmEmail.style';
import CustomInput from '../../../components/common/inputs/CustomInput';
import CustomButton from '../../../components/common/buttons/CustomButton';
import BackToSignInButton from '../../../components/common/buttons/BackToSignInButton/BackToSignInButton';
import { useForm } from 'react-hook-form';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const ConfirmEmailScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const {control, handleSubmit, watch} = useForm({
		defaultValues: {username: route?.params?.username}, 
	});
	const [loading, setLoading] = useState(false);

	const [resending, setResending] = useState(false);
	const username = watch('username');

	const onResendCode = async () => {
		if(resending) {
			return
	   	}
		setResending(true);

		try {
			const response = await Auth.resendSignUp(username);
		} catch(e) {
			console.log(e.message);
			Alert.alert('oops', e.message);
		}
		setResending(false);
	}

	const onConfirmPressed = async (data) => {
		if(loading) {
			return
	   	}
		setLoading(true);

		try {
			const response = await Auth.confirmSignUp(data.username, data.code);
			navigation.navigate('SignIn', {username});
		} catch(e) {
			console.log(e.message);
			Alert.alert('oops', e.message);
		}
		setLoading(false);
		//
		//navigation.navigate('app');
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Confirm Email</Text>
				<CustomInput 
					name = "username"
					placeholder="Username" 
					control={control} 
					rules={{required: 'Username is required'}}
				/>
				<CustomInput 
					name = "code"
					placeholder="Enter your confirmation code" 
					control={control} 
					autoCapitalize="characters"
					maxLength={6}
					rules={{
						pattern: {
							value: /^[0-9]*$/,
							message: 'Alphanumeric only'
						},
						validate: value => value.length == 6 || 'Code must be 6 characters'
					}}
				/>
				
				<CustomButton onPress={handleSubmit(onConfirmPressed)} text={loading ? "Confirming..." : "Confirm"} />
				
				<CustomButton onPress={onResendCode} text={resending ? "Resending..." : "Resend code"} type="SECONDARY" />

				<BackToSignInButton />

			</View>
		</ScrollView>
		)
}

export default ConfirmEmailScreen