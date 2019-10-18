import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

/**
 * Le composant Entete représente le titre de l'application.
 */
export default Entete = () => (
    <View style={styles.entete}>
        <Text style={styles.texteEntete}>Actions</Text>
    </View>
)

const styles = StyleSheet.create({
    // style à appliquer à l'élément <View>
    entete: {
        marginTop: 80
    },
    // style à appliquer à l'élément <Text>
    texteEntete: {
        textAlign: 'center',
        fontSize: 72,
        color: 'rgba(175, 47, 47, 0.25)',
        fontWeight: '100'
    },
})