import React from 'react';

import MenuPrincipal from "./src/MenuPrincipal";


export default class App extends React.Component {

    state = {
        voyages: []
    }

    render() {
        return (
            <MenuPrincipal 
                screenProps={{
                    voyages: this.state.voyages,
                    ajouterVoyage: (voyage) => this.ajouterVoyage(voyage),
                    update: () => this.update()
                }}
            />
        );
    }

    ajouterVoyage(voyage) {
        this.setState({
            voyages : [...this.state.voyages, voyage]
        })
    }

    update() {
        this.setState();
    }
}

