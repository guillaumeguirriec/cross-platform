import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        option: 'toutes'
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        this.setState({
            texteSaisie: nouvelleSaisie
        });
        console.log('la saisie à changée', nouvelleSaisie)
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider !')
        this.setState({
            actions : [...this.state.actions, {titre: this.state.texteSaisie, terminer: false}],
            texteSaisie :  ''
        });
    }

    fonctionSupprimer(index) {
        this.setState((state) => ({
            actions : state.actions.filter((action, i) => i !== index)
        }));
    }

    fonctionTerminer(action) {
        action.terminer = !action.terminer;
        this.setState();
    }

    setOption(option) {
        this.setState({
            option: option
        });
    }

    render() {
        let {texteSaisie, actions} = this.state

        if (this.state.option == 'actives') {
            actions = actions.filter((action) => action.terminer == false);
        }

        if (this.state.option == 'terminées') {
            actions = actions.filter((action) => action.terminer == true);
        }

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions 
                        actions={actions}
                        fonctionTerminer={(action) => this.fonctionTerminer(action)}
                        fonctionSupprimer={(index) => this.fonctionSupprimer(index)}
                    />
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu setOption={(option) => this.setOption(option)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})