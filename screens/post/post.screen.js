import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, BackHandler } from "react-native";
import { AppContext } from '../../context/app.context';
import { getPost } from '../../utils/utils';
import { Post } from '../../components';
import Carousel from 'react-native-snap-carousel';

export default function PostPage({ navigation, route }) {
    const { themeColors, API_URL } = useContext(AppContext);
    const [post, setPost] = useState(null);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            flex: 1
        },
    });

    useEffect(() => {
        const unsub = () => {
            if (post == null) {
                getPost(route.params?.postId, API_URL).then((res) => setPost(res));
            }
        }
        return unsub();
    }, [post]);

    return (
        <View style={styles.canvas}>
            {post &&
                <Post navigation={navigation} postData={post} />
            }
        </View>
    );
}
