import React, {useState} from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from './resetPassword.style';
import CustomInput from '../../../components/common/inputs/CustomInput';
import CustomButton from '../../../components/common/buttons/CustomButton';
import { COLORS } from '../../../constants';
import BackToSignInButton from '../../../components/common/buttons/BackToSignInButton/BackToSignInButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute, useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const {control, handleSubmit, watch} = useForm({
		defaultValues: {username: route?.params?.username}, 
	});
	const pwd = watch('password');
	const [loading, setLoading] = useState(false);

	const onSubmitPressed = async (data) => {
		if(loading) {
			return
	   	}
		setLoading(true);

		try {
			const response = await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
			navigation.navigate('SignIn', {username});
		} catch(e) {
			console.log(e.message);
			Alert.alert('oops', e.message);
		}
		setLoading(false);
		//navigation.navigate('SignIn');
		//navigation.navigate('app');
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Reset Password</Text>
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
						validate: value => (value && value.length == 6) || 'Code must be 6 characters'
					}}
				/>
				<CustomInput 
					name = "password"
					placeholder="New Password" 
					control={control} 
					secureTextEntry={true}
					rules={{
						required: 'Password is required', 
						minLength: {
							value: 8, 
							message: 'Password should contain at least 8 characters'
						},
						pattern: {
							value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
							message: 'Password should contain at least 1 number, capital letter, and symbol (@#$%^&+=!)'
						}
					}}
				/>
				<CustomInput 
					name = "confimpassword"
					placeholder="Confirm Password" 
					control={control} 
					secureTextEntry={true}
					rules={{
						validate: value => value === pwd || 'Passwords do not match',
						
					}}
				/>
				
				<CustomButton onPress={handleSubmit(onSubmitPressed)} text="Submit" bgColor={COLORS.dark}/>
				
				<BackToSignInButton />
				
			</View>
		</ScrollView>
		)
}

export default ResetPasswordScreen