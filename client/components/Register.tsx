import { useState } from 'react';
import { View } from 'react-native';
import { User } from '../api/types';
import { putUser } from '../api/users';

import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';

export default function Register() {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const submit = async (): Promise<void> => {
        if (firstname.length > 0 && lastname.length > 0 && email.length > 0) {
            const user: User = await putUser({
                firstname,
                lastname,
                email
            });

            console.log(user);
        }
    }

    return (
        <View>
            <InputField label="firstname" value={firstname} setValue={setFirstname} />
            <InputField label="lastname" value={lastname} setValue={setLastname} />
            <InputField label="email" value={email} setValue={setEmail} />
            <SubmitButton title="Register" submitCallback={submit} />
        </View>
    )
}
