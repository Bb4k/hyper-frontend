import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from "react-native";
import { Conversation } from '../../components';
import { AppContext } from '../../context/app.context';
import { getDMs } from '../../utils/utils';

export default function Chat({ navigation }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);
    const [chats, setChats] = useState([]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
            marginBottom: 52
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (chats.length == 0) {
                getDMs(profile.user.id, API_URL).then((res) => setChats(res));
            }
        }
        return unsub();
    }, [chats]);

    return (
        <View styles={styles.container}>
            <FlatList
                contentContainerStyle={styles.container}
                data={chats}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ index, item }) => (
                    <Conversation navigation={navigation} user={item} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}