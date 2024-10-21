import styles from './search.style';
import { useState } from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import { icons, SIZES, COLORS } from '../../../constants';

const Search = props => {
    return (
        <View style={styles.searchContainer}>
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
            {/*<TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    style={styles.searchBtnImage}
                />
            </TouchableOpacity>*/}
        </View>
    )
}

export default Search