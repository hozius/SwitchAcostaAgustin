import React from 'react'
import { Image, View, Text, Button } from 'react-native'
import Card from '../../components/card';
import { styles } from './styles';

const GameOverScreen = ({ rounds, choice, last, onRestart }) => {
    return (
        <View style={styles.container}>
            {last == choice ? 
            <Image style={styles.image} source={require('../../../assets/images/ganaste.jpg')} />
            :
            <Image style={styles.image} source={require('../../../assets/images/game-overa.png')} />
            }
                
            
            <Card style={styles.cardContainer}>
                <Text style={styles.choice}>Número a adivinar: {choice}</Text>
                <Text style={styles.rounds}>Intentos: {rounds}</Text>
                <Text style={styles.rounds}>Ultimo: {last}</Text>
            </Card>
            <Button title='Volver a jugar' onPress={onRestart} />
        </View>
    )
}

export default GameOverScreen;