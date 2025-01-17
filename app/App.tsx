import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './context/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import ScreenMain from './screens/screenMain';
import ScreenList from './screens/screenList';
import ListDetails from './screens/listDetails';
import ThemeSettings from './screens/themeSettings';

export type RootStackParamList = {
    Home: undefined;
    Theme: undefined;
    main: undefined;
    list: undefined;
    ListDetails: { list: { id: string; title: string; colorIndex: number; items: string[] } };
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: true,
                tabBarStyle: { display: 'none' },
            }}
        >
            <Tab.Screen name="main" component={ScreenMain} />
            <Tab.Screen name="list" component={ScreenList} />
            <Tab.Screen name="ListDetails" component={ListDetails}/>

        </Tab.Navigator>
    );
}

export default function App() {
    const { theme } = useTheme();
    const [headerTitle, setHeaderTitle] = useState('Notes App');

    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                drawerStyle: {
                    backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5',
                },
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
                },
                headerTintColor: theme === 'dark' ? '#f5f5f5' : '#000000',
                headerTitle: () => (
                    <Text
                        style={[
                            styles.headerTitle, 
                            { color: theme === 'dark' ? '#f5f5f5' : '#000000' }
                        ]}
                    >
                        {route.name === 'Home' ? 'Notes App' : 'Theme Settings'}
                    </Text>
                ),
                headerTitleAlign: 'center',
                drawerLabelStyle: {
                    color: theme === 'dark' ? '#f5f5f5' : '#000000',
                },
            })}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerIcon: ({ size }) => {
                        const iconColor = theme === 'dark' ? '#f5f5f5' : '#000000';
                        return <FontAwesome name="home" size={size} color={iconColor} />;
                    },
                }}
            >
                {() => <Tabs setHeaderTitle={setHeaderTitle} />}
            </Drawer.Screen>

            <Drawer.Screen
                name="Theme"
                component={ThemeSettings}
                options={{
                    headerTitle: () => (
                        <Text
                            style={[
                                styles.headerTitle, 
                                { color: theme === 'dark' ? '#f5f5f5' : '#000000' }
                            ]}
                        >
                            Theme Settings
                        </Text>
                    ),
                    drawerIcon: ({ size }) => {
                        const iconColor = theme === 'dark' ? '#f5f5f5' : '#000000';
                        return <FontAwesome name="paint-brush" size={size} color={iconColor} />;
                    },
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
