import React from 'react'
import {StyleSheet, Text, TouchableHighlight} from 'react-native'

/**
 * Le composant BoutonAction est paramétrable via son nom.
 */

 function getStyle(nom) {
     let style = styles.texte;
     if(nom === 'Supprimer') {
         style = styles.supprimer;
     } else if (nom === 'Terminer') {
         style = styles.termine;
     }
     return style;
 }

const BoutonAction = ({nom, action, onPress}) => (
    <TouchableHighlight
        underlayColor='#efefef'
        style={styles.bouton}
        onPress={onPress}
        >
        <Text style={getStyle(nom)}>
            {nom}
        </Text>
    </TouchableHighlight>
)
const styles = StyleSheet.create({
    bouton: {
        alignSelf: 'flex-end',
        padding: 7,
        borderColor: '#ededed',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 5,
    },
    texte: {
        color: '#666666',
    },
    termine: {
        color: 'green',
        fontWeight: 'bold',
    },
    supprimer: {
        color: 'rgba(175, 47, 47, 1)',
    },
})
export default BoutonAction