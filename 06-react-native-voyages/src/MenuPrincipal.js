import React from 'react'
import {Text, View} from 'react-native'
import { couleurs } from './Theme'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import  ListerVoyages from './ListerVoyages'
import  UnVoyage from './UnVoyage'
import AjouterVoyage from './AjouterVoyage'

const options = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: couleurs.primaire
        },
        headerTintColor: '#fff'
    }
}

const VoyagesNav = createStackNavigator({
    ListerVoyages: { screen: ListerVoyages},
    UnVoyage: { screen: UnVoyage }
}, options)


const MenuPrincipal = createBottomTabNavigator({
    ListerVoyages: { screen: VoyagesNav }, // noter ici que la route 'ListerVoyages' conduit à une nouvelle navigation.
    AjouterVoyage: { screen: AjouterVoyage }
})

export default MenuPrincipal