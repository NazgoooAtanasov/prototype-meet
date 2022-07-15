import { fetchLocation } from '../api/location';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { LocationObject } from 'expo-location';
import { style } from '../styles/styles';

function LocationDetails(props: { location: LocationObject | null }) {
    if (props.location) {
        return <Text> latitude: {props.location.coords.latitude}, longitude: {props.location.coords.longitude} </Text>;
    }

    return <></>;
}

export default function Location() {
    const [location, setLocation] = useState<LocationObject | null>(null);

    async function setCurrentLocation() {
        setLocation(await fetchLocation());
    }

    return (
        <View style={style.container}>
            <Button title="Location" onPress={setCurrentLocation} />
            <LocationDetails location={location} />
        </View>
    );
}
