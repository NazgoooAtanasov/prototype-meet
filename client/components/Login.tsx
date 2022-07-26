import { useState } from 'react';
import { View } from 'react-native';
import { saveToStore } from '../api/storage';
import { style } from '../styles/styles';
import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';
import { trpc } from '../client/util/trpc';

export default function Login() {
    const signinMutation = trpc.useMutation(['auth.signin']);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function signinHandle() {
        const token = await signinMutation.mutateAsync({ email, password });

        if (token.jwt) {
            await saveToStore<string>('jwt', token.jwt);
        } else {
            // @TODO: error handling here
        }
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
