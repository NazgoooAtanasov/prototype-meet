import {
    getForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync,
} from 'expo-location';

export async function fetchLocation(): Promise<LocationObject | null> {
    const permission = await getForegroundPermissionsAsync();

    if (!permission.granted) {
        await requestForegroundPermissionsAsync();
        return null;
    }

    const location: LocationObject = await getCurrentPositionAsync({});

    return location;
}
