import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { AppContext } from '../../context/app.context';
import { Post } from '../../components';
import { getFeedPosts } from '../../utils/utils';

export default function Feed({ navigation }) {
    const { themeColors, user, API_URL, deviceW, deviceH } = useContext(AppContext);
    const [posts, setPosts] = useState([]);

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
            if (posts.length == 0) {
                setPosts(getFeedPosts(API_URL)); //.then((res) => setPosts(res));
            }
        }
        return unsub();
    }, []);

    return (
        <FlatList
            style={styles.canvas}
            data={posts}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ index, item }) => (
                <Post navigation={navigation} postData={item} />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}