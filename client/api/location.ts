import {
    getForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync,
} from 'expo-location';
import { getFromStore } from './storage';

export async function fetchLocation(): Promise<LocationObject | null> {
    const permission = await getForegroundPermissionsAsync();

    if (!permission.granted) {
        await requestForegroundPermissionsAsync();
        return null;
    }

    const location: LocationObject = await getCurrentPositionAsync({});
    return location;
}

interface Location {
    longitude: number;
    latitude: number;
}

export async function assignLocationToUser(location: Location): Promise<null> {
    const jwt: string | null = await getFromStore<string>('jwt');

    if (jwt) {
        const assignLocationToUserRequest = await fetch(
            'http://192.168.1.8:8000/users/location',
            {
                method: 'post',
                body: JSON.stringify(location),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        const assignLocationToUserRequestResponse =
            await assignLocationToUserRequest.json();
    }

    return null;
}
