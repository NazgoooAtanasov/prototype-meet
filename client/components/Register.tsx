import { useState } from 'react';
import { View } from 'react-native';
import { saveToStore } from '../api/storage';
import { Token, User } from '../api/types';
import { putUser } from '../api/users';

import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';

export default function Register() {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submit = async (): Promise<void> => {
        if (firstname.length > 0 && lastname.length > 0 && email.length > 0) {
            const user: (User & Token) = await putUser({
                firstname,
                lastname,
                email,
                password
            });

            await saveToStore<string>('jwt', user.jwt);
        }
    }

    return (
        <View>
            <InputField label="firstname" value={firstname} setValue={setFirstname} />
            <InputField label="lastname" value={lastname} setValue={setLastname} />
            <InputField label="email" value={email} setValue={setEmail} />
            <InputField label="password" value={password} setValue={setPassword} type="password" />
            <SubmitButton title="Register" submitCallback={submit} />
        </View>
    )
}
