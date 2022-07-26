import { assignLocationToUser, fetchLocation } from '../api/location';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { LocationObject } from 'expo-location';
import { style } from '../styles/styles';
import { trpc } from '../client/util/trpc';

function LocationDetails(props: { location: LocationObject | null }) {
    if (props.location) {
        return (
            <Text>
                {' '}
                latitude: {props.location.coords.latitude}, longitude:{' '}
                {props.location.coords.longitude}{' '}
            </Text>
        );
    }

    return <></>;
}

export default function Location() {
    const locationMutation = trpc.useMutation(['users.location']);

    const [location, setLocation] = useState<LocationObject | null>(null);

    async function setCurrentLocation() {
        const apiLocation: LocationObject | null = await fetchLocation();

        if (apiLocation) {
            const setLocation = await locationMutation.mutateAsync({
                longitude: apiLocation.coords.longitude,
                latitude: apiLocation.coords.latitude,
            });

            console.log(setLocation);
        }

        setLocation(apiLocation);
    }

    return (
        <View style={style.container}>
            <Button title="Location" onPress={setCurrentLocation} />
            <LocationDetails location={location} />
        </View>
    );
}
