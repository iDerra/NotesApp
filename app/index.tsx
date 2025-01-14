import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ScreenMain from './screens/screenMain';
import ScreenList from './screens/screenList';

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: true,
                tabBarStyle: { display: 'none' }, // Oculta las pestañas si no quieres mostrarlas
            }}
        >
            <Tab.Screen name="main" component={ScreenMain} />
            <Tab.Screen name="list" component={ScreenList} />
        </Tab.Navigator>
    );
}
