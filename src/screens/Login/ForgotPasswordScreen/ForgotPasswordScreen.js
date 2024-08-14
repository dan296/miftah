import React, {useState} from 'react';
import { View, Text, useWindowDimensions, ScrollView, Alert } from 'react-native';
import styles from './forgotPassword.style';
import CustomInput from '../../../components/common/inputs/CustomInput';
import CustomButton from '../../../components/common/buttons/CustomButton';
import { COLORS } from '../../../constants';
import BackToSignInButton from '../../../components/common/buttons/BackToSignInButton/BackToSignInButton';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute, useNavigation } from '@react-navigation/native';


const ForgotPasswordScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [loading, setLoading] = useState(false);
	const {control, handleSubmit, watch} = useForm({
		defaultValues: {username: route?.params?.username}, 
	});
	const username = watch("username");

	const onSendPressed = async (data) => {
		if(loading) {
			return
	   	}
		setLoading(true);

		try {
			const response = await Auth.forgotPassword(data.username);
			navigation.navigate('Reset', {username});
		} catch(e) {
			console.log(e.message);
			Alert.alert('oops', e.message);
		}
		setLoading(false);
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
				
				<CustomButton onPress={handleSubmit(onSendPressed)} text={loading ? "Sending..." : "Send"} bgColor={COLORS.primary}/>
				
				<BackToSignInButton />

			</View>
		</ScrollView>
		)
}

export default ForgotPasswordScreen