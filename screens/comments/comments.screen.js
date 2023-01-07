import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList } from "react-native";
import { AppContext } from '../../context/app.context';
import { UserList } from '../../components';
import { getComments } from '../../utils/utils';

export default function Comments({ navigation, post_id }) {
    const { themeColors, API_URL } = useContext(AppContext);
    const [comments, setComments] = useState([]);

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
            if (comments.length == 0) {
                setComments(getComments(post_id, API_URL)); //.then((res) => setPosts(res));
            }
        }

        return unsub();
    }, []);

    return (
        <FlatList
            style={styles.canvas}
            data={comments}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ index, item }) => (
                <UserList user={item} listType={'comment'} />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}