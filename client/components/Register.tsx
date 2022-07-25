import { useState } from 'react';
import { View } from 'react-native';

import { saveToStore } from '../api/storage';
import { trpc } from '../client/util/trpc';
import { style } from '../styles/styles';

import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';

export default function Register() {
    const createUserMutation = trpc.useMutation(['auth.signup']);

    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submit = async (): Promise<void> => {
        if (firstname.length > 0 && lastname.length > 0 && email.length > 0) {
            const user = await createUserMutation.mutateAsync({
                firstname,
                lastname,
                email,
                password,
            });

            await saveToStore<string>('jwt', user.jwt);
        }
    };

    return (
        <View style={style.container}>
            <InputField
                label="firstname"
                value={firstname}
                setValue={setFirstname}
            />
            <InputField
                label="lastname"
                value={lastname}
                setValue={setLastname}
            />
            <InputField label="email" value={email} setValue={setEmail} />
            <InputField
                label="password"
                value={password}
                setValue={setPassword}
                type="password"
            />
            <SubmitButton title="Sign up" submitCallback={submit} />
        </View>
    );
}
