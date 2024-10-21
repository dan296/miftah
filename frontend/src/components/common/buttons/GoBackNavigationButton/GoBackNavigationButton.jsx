import { TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Icon, { Icons } from '../../../icons/Icons'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../../constants'
import { ThemeContext, useTheme} from '../../../../contexts/ThemeContext'

const GoBackNavigationButton = () => {
    const navigation = useNavigation();
    const {activeColors} = useTheme();
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <Icon 
                type={Icons.Ionicons}
                name="chevron-back"
                size={20}
                color = {activeColors.fg}
            />
        </TouchableOpacity>
    )
}

export default GoBackNavigationButton