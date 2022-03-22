import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { styles } from './style'
import Card from '../../components/card'
import Header from '../../components/header'

const GameScreen = ({ userOptions, onGameOver }) => {
    const generateRandomBetween = useCallback((min, max, exclude) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const rndNum = Math.floor(Math.random() * (max - min)) + min;
        if (rndNum === exclude) {
            return generateRandomBetween(min, max, exclude);
        }
        else return rndNum;
    }, [currentHigh, currentLow, currentGuess, userOptions])

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userOptions))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    useEffect(() => {
        if(currentGuess === userOptions) onGameOver(rounds,currentGuess)
    }, [currentGuess, userOptions, onGameOver])

    const handlerNextGuess = (direction) => {
        if(
            (direction === 'lower' && currentGuess < userOptions) ||
            (direction === 'greater' && currentGuess > userOptions)
        ) {
            Alert.alert('No es por ahí...', 'Perdiste una chance', [{text: '¡Continuar!'}, {text: 'Abandonar',onPress:() => (onGameOver(rounds,currentGuess))}])
        }else{
            if(direction === 'lower') {
                currentHigh.current = currentGuess
            } else {
                currentLow.current = currentGuess
            }
            const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
            setCurrentGuess(nextNumber)
        }
        setRounds(current => current +1)
    }

    return (
        <View style={styles.container}>
            <Header title='Adivina el número' />
            <Card style={styles.cardContainer}>
                <Text style={styles.cardTitle}>¡Ultimo valor!</Text>
                <Text style={styles.confirmedText}>{currentGuess}</Text>
                <View style={styles.buttonsContainer}>
                    <Button title='Menor' onPress={() => handlerNextGuess('lower')} color='#1c60ab'/>
                    <Button title='Mayor' onPress={() => handlerNextGuess('greater')} color='#1c60ab'/>
                </View>    
                <Text style={styles.rounds}>Intentos: {rounds}</Text>        
            </Card>
        </View>
    )
} 

export default GameScreen;