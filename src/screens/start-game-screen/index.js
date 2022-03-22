import React, { useState } from 'react';
import {
    Text,
    View,
    Button,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    ScrollView,
} from 'react-native';
import { colors } from '../../constants/theme';
import Header from '../../components/header';
import Card from '../../components/card';
import Input from '../../components/input';
import { styles } from './styles';


const isIOS = Platform.OS === 'ios';


const StartGameScreen = ({ onStartGame }) => {
    const [inputValue, setInputValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    
    const handleOnChange = (text) => {
        setInputValue(text.replace(/[^0-9]/g, ''));
    }

    const handleResetInput = () => {
        setInputValue('');
        setConfirmed(false);
    }

    const handleConfirmInput = () => {
        const chosenNumber = parseInt(inputValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setInputValue('');
    }

    const confirmedOutput = confirmed ? (
        <Card style={styles.containerConfirmed}>
            <Text style={styles.cardTitle}>Tu Selección</Text>
            <Text style={styles.confirmedText}>{selectedNumber}</Text>
            <View style={styles.buttonsContainer}>
                <Button title='Empezar Juego' onPress={() => onStartGame(selectedNumber)} color='#1c60ab'/>
            </View>
        </Card>
    ) : null;

    return (
        <ScrollView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView 
                    behavior={isIOS ? '' : 'height'}
                    style={styles.container}
                >   
                    <View style={styles.container}> 
                        <Header title='Selección de número' />
                        <Card>
                            <Text style={styles.cardTitle}>Cargue un número [00-99]</Text>
                            <View style={styles.inputContainer}>
                                <Input 
                                    blurOnSubmit
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    placeholder='Ej: 00' 
                                    placeholderTextColor={colors.placeholderColor}
                                    maxLength={2}
                                    handleOnChange={(value) => handleOnChange(value)}
                                    returnKeyType='done'
                                    value={inputValue}
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button title='Limpiar' onPress={() => handleResetInput()} color='#1c60ab'/>
                                <Button title='Confirmar' onPress={() => handleConfirmInput()} color='#1c60ab'/>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default StartGameScreen;