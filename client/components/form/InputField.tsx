import { TextInput, StyleSheet } from 'react-native';

export default function InputField(props: {
    label: string;
    value: string;
    setValue: any;
    type?: string;
}) {
    return (
        <TextInput
            style={inputStyle.input}
            placeholder={props.label}
            value={props.value}
            onChangeText={props.setValue}
            secureTextEntry={props.type === 'password'}
        />
    );
}

const inputStyle = StyleSheet.create({
    input: {
        borderColor: '#000',
        borderWidth: 1,
        width: 100,
        marginTop: 10,
        paddingLeft: 5,
    },
});
