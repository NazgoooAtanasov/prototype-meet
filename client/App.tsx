import { StyleSheet, Text, View } from 'react-native';
import Register from './components/Register';

export default function App() {
    return (
        <View style={styles.container}>
            <Register />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
