import React, {useState} from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from './signup.style';
import CustomInput from '../../../components/common/inputs/CustomInput';
import CustomButton from '../../../components/common/buttons/CustomButton';
import SignInButtons from '../../../components/common/buttons/SocialButtons/SignIn/SignInButtons';
import BackToSignInButton from '../../../components/common/buttons/BackToSignInButton/BackToSignInButton';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { COLORS } from '../../../constants';


const SignUpScreen = () => {
	const navigation = useNavigation();
	const {control, handleSubmit, watch} = useForm();
	const pwd = watch('password');
	const [loading, setLoading] = useState(false);

	const onTermsOfUsePressed = () => {
		console.warn("Terms of Use");
	}
	const onPrivacyPressed = () => {
		console.warn("Privacy");
	}

	const onSignUpPressed = async(data) => {
		if(loading) {
			return
	   	}
		setLoading(true);

		const {username, password, email, name} = data;

		try {
			const response = await Auth.signUp({
				username,
				password,
				attributes: {email, name, preferred_username: username}
			});
			console.log(response);
			navigation.navigate('ConfirmEmail', {username});
		} catch(e) {
				console.log(e.message);
			Alert.alert('oops', e.message);
		}
		setLoading(false);
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Create an account</Text>
				<CustomInput 
					name = "name"
					placeholder="Name" 
					control={control} 
					rules={{
						required: 'Name is required',
						minLength: {
							value: 3, 
							message: 'Name should contain at least 3 characters'
						},
						maxLength: {
							value: 24, 
							message: 'Name should be less than 24 characters'
						},
					}}
				/>
				<CustomInput 
					name = "username"
					placeholder="Username" 
					control={control} 
					rules={{
						required: 'Username is required',
						minLength: {
							value: 3, 
							message: 'Username should contain at least 3 characters'
						},
						maxLength: {
							value: 24, 
							message: 'Username should be less than 24 characters'
						},
					}}
				/>
				<CustomInput 
					name = "email"
					placeholder="Email" 
					control={control} 
					rules={{
						required: 'Email is required',
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: "Invalid email"
						}
					}}
				/>
				<CustomInput 
					name = "password"
					placeholder="Password (Example5%)" 
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
				<CustomButton onPress={handleSubmit(onSignUpPressed)} text={loading ? "Signing Up..." : "Sign Up"} bgColor={COLORS.primary} />
				<Text>By registering, you confirm that you accept
					<Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use </Text> and 
					<Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
				</Text>
				
				<SignInButtons />
				<BackToSignInButton text="Already have an account? Sign in"/>

			</View>
		</ScrollView>
		)
}

export default SignUpScreen