import { StyleSheet, Dimensions } from 'react-native';
import { margin, fontSize, colors } from '../../constants/theme';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    image: {
        width: width - 40,
        height: height * 0.2,
        marginVertical: margin.large,
    },
    cardContainer: {
        width: width / 1.1,
        height: height * 0.2,
        marginVertical: margin.large,
        
        justifyContent: 'center',
    },
    rounds: {
        fontSize: 32,
        color: colors.primary,
        marginHorizontal: margin.medium,
    },
    choice: {
        fontSize: 32,
        color: colors.primary,
        marginHorizontal: margin.medium,

    }
});