import React, { useContext } from 'react'
import CustomButton from '../../CustomButton'
import { Icons } from '../../../../icons/Icons';
import { useTheme } from '../../../../../contexts/ThemeContext';
import { THEMES } from '../../../../../constants';

const SignInButtons = () => {
	const {activeColors} = useTheme();

    const onSignInSocial = async (provider) => {
		try {
		  // Perform authentication based on the selected provider
		  switch (provider) {
			case 'facebook':
			  // Implement Facebook sign-in logic
			  console.warn(provider);
			  break;
			case 'google':
			  // Implement Google sign-in logic
			  console.warn(provider);
			  break;
			case 'apple':
			  // Implement Apple sign-in logic
			  console.warn(provider);
			  break;
			default:
			  // Handle unsupported providers
			  break;
		  }
		} catch (error) {
		  console.error('Error signing in:', error);
		}
	  };

    return (
        <>
            <CustomButton 
				onPress={() => onSignInSocial('facebook')} 
				text="Sign In with Facebook" 
				bgColor={activeColors.bgLight}
				fgColor={activeColors.fg}
				icon = {
					{
					  name: "sc-facebook",
					  type: Icons.EvilIcons,
					  size: 24,
					  color: "#4765A9",
					  style: {borderRightColor: "#4765A9", borderRightWidth: 1}
					}
				  } 
			/>
            <CustomButton 
				onPress={() => onSignInSocial('google')} 
				text="Sign In with Google" 
				bgColor={activeColors.bgLight}
				fgColor={activeColors.fg}
				icon = {
					{
					  name: "google",
					  type: Icons.MaterialCommunityIcons,
					  size: 20,
					  color: "#DD4D44",
					  style: {borderRightColor: "#DD4D44", borderRightWidth: 1}
					}
				  } 
			/>
            <CustomButton 
				onPress={() => onSignInSocial('apple')} 
				text="Sign In with Apple" 
				bgColor={activeColors.bgLight}
				fgColor={activeColors.fg}
				icon = {
					{
					  name: "logo-apple",
					  type: Icons.Ionicons,
					  size: 20,
					  color: activeColors.fg,
					  style: {borderRightColor: activeColors.fg, borderRightWidth: 1}
					}
				  } 
			/>
        </>
    )
}

export default SignInButtons