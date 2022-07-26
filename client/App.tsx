import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Register from './components/Register';
import Login from './components/Login';
import Location from './components/Location';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Register" component={Register} />

                <Tab.Screen name="Login" component={Login} />

                <Tab.Screen name="Location" component={Location} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
