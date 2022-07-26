import {
    getForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync,
} from 'expo-location';
import { request } from '../utils/request';
import { getFromStore } from './storage';
import { ServerResponse } from './types';

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

export async function assignLocationToUser(location: Location): Promise<void> {
    const jwt: string | null = await getFromStore<string>('jwt');

    if (jwt) {
        const assignLocation: ServerResponse<Location> = await request(
            '/users/location',
            {
                method: 'post',
                body: JSON.stringify(location),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
    }
}
