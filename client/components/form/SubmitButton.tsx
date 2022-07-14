import { Button, StyleSheet, View } from 'react-native';

export default function SubmitButton(props: { title: string, submitCallback: any }) {
    return (
        <View style={buttonStyle.button}>
            <Button title={props.title} onPress={props.submitCallback} />
        </View>
    )
}

const buttonStyle = StyleSheet.create({
    button: {
        marginTop: 10
    }
});
