import { useState } from 'react';
import { View } from 'react-native';
import { putUser } from '../api/users';

import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';

export default function Register() {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const submit = async (): Promise<void> => {
        if (firstname.length > 0 && lastname.length > 0 && email.length > 0) {
            const userId: number | any = await putUser({
                firstname,
                lastname,
                email
            });

            if (!isNaN(userId)) {
                console.log(userId);
            }
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