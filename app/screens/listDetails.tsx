import React from 'react';
import { View, Text, FlatList } from 'react-native';
import stylesList from './../styles/list_styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


type ListDetailsProps = NativeStackScreenProps<RootStackParamList, 'ListDetails'>;

const ListDetails: React.FC<ListDetailsProps> = ({ route }) => {
    const list = route.params?.list;

    if (!list) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'red' }}>No list found</Text>
        </View>
        );
    }

    return (
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
    );
    };

    export default ListDetails;
