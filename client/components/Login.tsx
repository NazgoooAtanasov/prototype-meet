import { useState } from 'react';
import { View } from 'react-native';
import { saveToStore } from '../api/storage';
import { Token } from '../api/types';
import { style } from '../styles/styles';
import { signin } from '../api/users';
import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function signinHandle() {
        const token: Token = await signin({ email, password });

        await saveToStore<string>('jwt', token.jwt);
    }

    return (
        <View style={style.container}>
            <InputField label="email" value={email} setValue={setEmail} />
            <InputField
                label="password"
                value={password}
                setValue={setPassword}
                type="password"
            />
            <SubmitButton title="Sign in" submitCallback={signinHandle} />
        </View>
    );
}
