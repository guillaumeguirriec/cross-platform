import React from 'react'
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native'

/**
 * Bouton permettant de créer une nouvelle action.
 *
 * Il reçoit une propriété du composant parent `onValider` fonction à invoquer lorsque l'on appuie sur le bouton.
 */
const BoutonCreer = ({onValider}) => (
    <View style={styles.conteneurBouton}>
        <TouchableHighlight
            onPress={onValider}
            underlayColor='#efefef'
            style={styles.bouton}>
            <Text style={styles.valider}>
                Valider
            </Text>
        </TouchableHighlight>
    </View>
)
const styles = StyleSheet.create({
    conteneurBouton: {
        alignItems: 'flex-end',
    },
    bouton: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ffffff',
        width: 200,
        marginRight: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    valider: {
        color: '#666666',
        fontWeight: '600',
    },
})
export default BoutonCreer