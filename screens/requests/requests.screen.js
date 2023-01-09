import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList } from "react-native";
import { AppContext } from '../../context/app.context';
import { UserList } from '../../components';
import { getRequests } from '../../utils/utils';

export default function Requests({ navigation }) {
    const { themeColors, profile, API_URL, deviceW, deviceH } = useContext(AppContext);
    const [requests, setRequests] = useState([]);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
            marginBottom: 52,
        },
    });

    useEffect(() => {
        const unsub = () => {
            if (requests.length == 0) {
                setRequests(getRequests(API_URL)); //.then((res) => setPosts(res));
            }
        }

        return unsub();
    }, []);

    return (
        <FlatList
            style={styles.canvas}
            data={requests}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ index, item }) => (
                <UserList user={item} listType={'request'} />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}