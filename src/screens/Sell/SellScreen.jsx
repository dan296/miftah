import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import { COLORS, SIZES } from '../../constants';
import styles from './sellscreen.style';
import { ThemeContext, useTheme } from '../../contexts/ThemeContext';
import FgText from '../../components/common/text/FgText';


const SellScreen = () => {
    const {activeColors} = useTheme();
    const [hasItemsInCloset, setHasItemsInCloset] = useState(false);

    // Simulate adding an item to the closet
    const handleAddItem = () => {
        // Perform your logic to add an item
        // For example, you might call an API or update a state variable
        // Here, we're just simulating that an item was added
        setHasItemsInCloset(true);
    };

    return (
    <View style={{ flex: 1, alignItems:"center", padding: SIZES.medium, backgroundColor: activeColors.bg}} >
        {hasItemsInCloset ? (
            // Display the content when the user has items in the closet
            // Replace this with your actual content
            <FgText text="You have items in your closet" />
        ) : (
            // Display the message when the user has no items in the closet
            <View style={{justifyContent: "center"}}>
                <FgText text="You have no decks creted" />
                <TouchableOpacity onPress={handleAddItem}>
                    <FgText text="Create a deck" />
                </TouchableOpacity>
            </View>
        )}
    </View>
  )
}

export default SellScreen