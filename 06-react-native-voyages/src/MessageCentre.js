import React from "react";
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

import {couleurs} from './Theme'

const MessageCentre = ({message}) => (
    <View style={styles.conteneurVide}>
        <Text style={styles.message}>{message}</Text>
    </View>
)
const styles = StyleSheet.create({
    conteneurVide: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: couleurs.primary
    },
    message: {
        alignSelf: 'center',
        fontSize: 20
    }
})
export default MessageCentre