import { View, Text, TextInput } from 'react-native'
import React, { useContext } from 'react'
import styles from './inputs.style'
import { Controller } from 'react-hook-form'
import { useTheme } from '../../../contexts/ThemeContext'
import { THEMES } from '../../../constants'

const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry, autoCapitalize="none", maxLength}) => {
  const {activeColors} = useTheme();
  
  return (
      <Controller
        control = {control}
        name = {name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : styles.container.borderColor, backgroundColor: activeColors.bgLight}]}>
              <TextInput 
                value={value} 
                onChangeText={onChange} 
                onBlur={onBlur} 
                placeholder={placeholder} 
                secureTextEntry={secureTextEntry}
                style={[styles.input, {color: activeColors.fg}]}
                autoCapitalize = {autoCapitalize}
                maxLength = {maxLength}
                placeholderTextColor="gray"
              />
            </View>
            {error && (<Text style={styles.error}>{error.message || 'Error'}</Text>)}
          </>
        )}
      />
    
  )
}

export default CustomInput