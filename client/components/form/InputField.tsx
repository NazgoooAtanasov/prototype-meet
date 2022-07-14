import { TextInput, StyleSheet } from 'react-native';

export default function InputField(props: { label: string, value: string, setValue: any }) {
    return ( 
        <TextInput
            style={inputStyle.input}
            placeholder={props.label}
            value={props.value}
            onChangeText={props.setValue}
        />
    );
}

const inputStyle = StyleSheet.create({
    input: {
        borderColor: '#000',
        borderWidth: 1,
        width: 100,
        marginTop: 10,
        paddingLeft: 5
    }
});
