import React, { useState } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import stylesList from './../styles/list_styles';
import stylesGeneral from './../styles/general_styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


type ListDetailsProps = NativeStackScreenProps<RootStackParamList, 'ListDetails'>;

const ListDetails: React.FC<ListDetailsProps> = ({ route }) => {
    const list = route.params?.list;
    const [backgroundImage, setBackgroundImage] = useState(null); // Estado para el fondo de pantalla
    

    if (!list) {
        return (
        <ImageBackground
            source={backgroundImage || require('../../assets/images/background2.webp')} 
            style={stylesGeneral.backgroundImage}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'red' }}>No list found</Text>
            </View>
        </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={backgroundImage || require('../../assets/images/background2.webp')} 
            style={stylesGeneral.backgroundImage}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{list.title}</Text>
            <FlatList
                data={list.items}
                renderItem={({ item }) => (
                <View style={stylesList.listItemContainer}>
                    <View style={stylesList.listItemBullet} />
                    <Text style={stylesList.listItemText}>{item}</Text>
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
        </ImageBackground>
    );
    };

    export default ListDetails;
