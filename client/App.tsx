import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Register from './components/Register';
import Login from './components/Login';
import Location from './components/Location';

import { trpc } from './client/util/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: 'http://192.168.1.10:8000/trpc',
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Register" component={Register} />

                        <Tab.Screen name="Login" component={Login} />

                        <Tab.Screen name="Location" component={Location} />
                    </Tab.Navigator>
                </NavigationContainer>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
