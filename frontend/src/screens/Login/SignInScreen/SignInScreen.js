import React, {useContext, useState} from 'react';
import { View, Image, useWindowDimensions, ScrollView, Alert } from 'react-native';
import Logo from '../../../../assets/images/logo-transparent.png';
import styles from './login.style';
import CustomInput from '../../../components/common/inputs/CustomInput';
import CustomButton from '../../../components/common/buttons/CustomButton';
import SignInButtons from '../../../components/common/buttons/SocialButtons/SignIn/SignInButtons';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon, { Icons } from '../../../components/icons/Icons';
import { COLORS, THEMES } from '../../../constants';
import { useTheme } from '../../../contexts/ThemeContext';

const SignInScreen = () => {
	const {activeColors} = useTheme();
	const navigation = useNavigation();
	const {height} = useWindowDimensions();
	const [loading, setLoading] = useState(false);
	const route = useRoute();
	const {control, handleSubmit, watch} = useForm({
		defaultValues: {username: route?.params?.username}, 
	});
	const username = watch('username');

	const onSignInPressed = async (data) => {
		if(loading) {
			 return
		}

		setLoading(true);

		try {
			const response = await Auth.signIn(data.username, data.password);
			console.log(response);
			//navigation.navigate('app');
		} catch(e) {
			Alert.alert('oops', e.message);
		}
		setLoading(false);
	}

	const onForgotPressed = () => {
		navigation.navigate('Forgot', {username});
	}

	const onSignUpPressed = () => {
		navigation.navigate('SignUp')
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Icon
					name="logo-full"
					type={Icons.IcoMoon}
					size={120}
					color={activeColors.fg}
					style={[{margin: 10}]}
				/>
				<CustomInput 
					name = "username"
					placeholder="Username" 
					control={control} 
					rules={{required: 'Username is required'}}
				/>
				<CustomInput 
					name = "password"
					placeholder="Password" 
					control={control} 
					secureTextEntry={true}
					rules={{
						required: 'Password is required', 
						minLength: {
							value: 3, 
							message: 'Password should contain at least 3 characters'
						}
					}}
				/>
				
				<CustomButton 
					onPress={handleSubmit(onSignInPressed)} 
					text={loading ? "Signing In..." : "Sign In"} 
					bgColor={loading ? activeColors.bg : activeColors.bgLight} 
					fgColor={activeColors.fg}
					icon = {
						{
						  name: "sign-out",
						  type: Icons.Octicons,
						  size: 20,
						  color: "white"
						}
					  } 
				/>
				<CustomButton 
					onPress={onForgotPressed} 
					text="Forgot Password?" 
					type="TERTIARY" 
				/>

				<SignInButtons />

				<CustomButton 
					onPress={onSignUpPressed} 
					text="Don't have an account? Create one" 
					type="TERTIARY" 
				/>

			</View>
		</ScrollView>
		)
}

export default SignInScreen