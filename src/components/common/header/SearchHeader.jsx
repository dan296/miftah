import styles from './searchheader.style';
import { useContext, useState } from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import { icons, SIZES, COLORS } from '../../../constants';
import { ThemeContext, useTheme } from '../../../contexts/ThemeContext';
import Icon, { Icons } from '../../icons/Icons';

const SearchHeader = props => {
    const {activeColors} = useTheme();
    return (
        <View style={styles.searchContainer}>
            <View style={[styles.searchWrapper, {backgroundColor: activeColors.bgLight}]}>
                <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                    <Icon
                        type={Icons.Ionicons}
                        name={"search"}
                        size={20}
                        color={activeColors.fg}
                        //style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder={props.placehld}
                    placeholderTextColor={COLORS.gray}
                    maxLength={props.len}
                    clearButtonMode="while-editing"
                    autoCapitalize={props.capitalize}
                />
            </View>
            {/*
            
            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={props.placehld}
                    placeholderTextColor={COLORS.gray2}
                    maxLength={props.len}
                    clearButtonMode="while-editing"
                    autoCapitalize={props.capitalize}
                    onChangeText={text => props.setTextVal(text)}
                    value={props.textVal}
                />
            </View>
            
            <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    style={styles.searchBtnImage}
                />
            </TouchableOpacity>*/}
        </View>
    )
}

export default SearchHeader