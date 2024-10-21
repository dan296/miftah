import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'
import { COLORS } from '../../../constants'
import Icon from '../../icons/Icons'

const ScreenHeaderBtn = ({ name, type, size, handlePress, color, style }) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            {/*<Image
                source={iconUrl}
                resizeMode="cover"
                style={styles.btnImg(dimension) }
    />*/}
            <Icon 
                name={name}
                type={type}
                size={size}
                color={color}
                style={[style, {margin: 0}]}
            />
        </TouchableOpacity>
  )
}

export default ScreenHeaderBtn