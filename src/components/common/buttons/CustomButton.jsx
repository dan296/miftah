import { Text, Pressable } from 'react-native'
import styles from './buttons.style'
import Icon, { Icons } from '../../icons/Icons'

const CustomButton = ({ onPress, text, type="PRIMARY", bgColor, fgColor, icon}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor} : {}]}>
      {icon && (<Icon 
        name={icon.name}
        type={icon.type}
        size={icon.size}
        color={icon.color}
        style={[styles.icon, icon.style]}
      />)}
      <Text style={[styles.text, styles[`text_${type}`], fgColor ? {color: fgColor} : {}]}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton