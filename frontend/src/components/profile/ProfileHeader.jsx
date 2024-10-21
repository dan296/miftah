import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GoBackNavigationButton from '../common/buttons/GoBackNavigationButton/GoBackNavigationButton'
import { COLORS, FONT, SIZES } from '../../constants'
import FgText from '../common/text/FgText'

const ProfileHeader = ({title}) => {
  return (
    <>
        <GoBackNavigationButton />
        <View style={{ flex: 1, marginBottom: 15}} >
            <View style={[styles.subwrap, styles.subwrapLarge]}>
                <FgText style={[styles.title ,{ flex: 1 }]} text={title} />
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    subwrap: {
      flexDirection: "row", 
      alignItems: "center",
      borderColor: COLORS.gray, 
      borderBottomWidth: 1
    },
    subwrapLarge: {
      paddingVertical: SIZES.xLarge, 
      borderBottomWidth: 0
    },
    title: {
      fontFamily: FONT.bold,
      fontSize: SIZES.xxLarge
    }
  });

export default ProfileHeader