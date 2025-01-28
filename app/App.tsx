import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, StyleSheet } from 'react-native';
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
    const [headerTitle, setHeaderTitle] = useState('Notes App');

    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({

                headerTitle: () => (
                    <Text
                        style={[
                            styles.headerTitle, 
                        ]}
                    >
                        {route.name === 'Home' ? 'Notes App' : 'Customization'}
                    </Text>
                ),
                headerTitleAlign: 'center',
            })}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerIcon: ({ size }) => {
                        return <FontAwesome name="home" size={size} color={'black'} />;
                    },
                }}
            >
                {() => <Tabs setHeaderTitle={setHeaderTitle} />}
            </Drawer.Screen>

            <Drawer.Screen
                name="Customization"
                component={ThemeSettings}
                options={{
                    headerTitle: () => (
                        <Text
                            style={[
                                styles.headerTitle, 
                            ]}
                        >
                            Customization
                        </Text>
                    ),
                    drawerIcon: ({ size }) => {
                        return <FontAwesome name="paint-brush" size={size} color={'black'} />;
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
