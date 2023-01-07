import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { navigationRef } from "../../navigation/root.navigation";

export default function Post({ navigation, postData }) {
    const { themeColors, user, API_URL, deviceW, deviceH } = useContext(AppContext);
    const [liked, setLiked] = useState(false);

    const styles = StyleSheet.create({
        reactionContainer: {
            padding: 13,
            flexDirection: 'row',
        },
        post: {
            resizeMode: 'contain',
            width: deviceW,
            height: deviceW
        },
        icon: {
            resizeMode: 'contain',
            height: 25,
            width: 25,
            marginRight: 17
        },
        title: {
            color: 'white',
            fontSize: 15,
            fontFamily: 'Montserrat-Medium',
            paddingHorizontal: 13
        },
        stats: {
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            fontFamily: 'Montserrat-Medium',
            marginBottom: 13,
            paddingHorizontal: 13
        }
    });

    return (
        <View>
            <Image source={{ uri: postData.media }} style={styles.post} />
            <View style={styles.reactionContainer}>
                <TouchableOpacity
                    key={`${postData.post_id}-1`}
                    onPress={() => { setLiked(!liked) }}>
                    {!liked &&
                        <Image source={require('../../assets/muscles.png')} style={styles.icon} />
                    }
                    {liked &&
                        <Image source={require('../../assets/muscles-up.png')} style={styles.icon} />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    key={`${postData.post_id}-2`}
                    onPress={() => { navigation.navigate('Comments', { postData }) }} >
                    <Image source={require('../../assets/chat-bubble.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                    key={`${postData.post_id}-3`}
                    onPress={() => { console.log('Share') }} >
                    <Image source={require('../../assets/send.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{postData.username}: {postData.title}</Text>
            <Text style={styles.stats}>{postData.hypes} hypes, {postData.comments} comments</Text>
        </View>
    );
}
