import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, fonctionTerminer, fonctionSupprimer}) => {

    return (
        <View>
            {actions.map((action, index) => (
                <UneAction
                    key={index}
                    action={action} 
                    fonctionTerminer={() => fonctionTerminer(action)}
                    fonctionSupprimer={() => fonctionSupprimer(index)}
                />
            ))}
        </View>
    )
}

export default ListeActions