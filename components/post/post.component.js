import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { hypePost, unhypePost } from "../../utils/utils";
import PopUp from "../popup/popup.component";

export default function Post({ navigation, postData }) {
    const { themeColors, API_URL, deviceW, profile } = useContext(AppContext);
    const [liked, setLiked] = useState(false);
    const [nrLikes, setNrLikes] = useState(postData.post.likes);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const styles = StyleSheet.create({
        reactionContainer: {
            padding: 13,
            flexDirection: 'row',
        },
        post: {
            resizeMode: 'contain',
            width: deviceW,
            height: deviceW,
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        icon: {
            resizeMode: 'contain',
            height: 22,
            width: 22,
            marginRight: 17
        },
        title: {
            color: 'white',
            fontSize: 13,
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
        <>
            {!deleted &&
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 13, paddingVertical: 8 }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {
                                navigation.navigate("Profile", {
                                    profile: {
                                        user: {
                                            id: postData.user.id
                                        }
                                    }
                                })
                            }}>
                            <Image source={{ uri: postData.user.picture }} style={[{ width: 30, height: 30, borderRadius: 50, marginRight: 13 }]} />
                            <Text style={[styles.title, { paddingHorizontal: 0, fontSize: 14 }]}>{postData.user.username}</Text>
                        </TouchableOpacity>
                        {profile.user?.role == 'admin' &&
                            <TouchableOpacity
                                key={`${postData.post.id}-4`}
                                onPress={() => { setShowPopup(true) }} >
                                <Image source={require('../../assets/dots.png')} style={[styles.icon, { marginRight: 0 }]} />
                            </TouchableOpacity>
                        }
                    </View>
                    <Image source={{ uri: postData.post.media }} style={styles.post} />
                    <View style={styles.reactionContainer}>
                        <TouchableOpacity
                            key={`${postData.post.id}-1`}
                            onPress={() => {
                                if (profile.user?.role != 'guest') {
                                    setLiked(!liked);
                                    liked && unhypePost(postData.post.id, API_URL) && setNrLikes(nrLikes - 1);
                                    !liked && hypePost(postData.post.id, API_URL) && setNrLikes(nrLikes + 1);
                                }
                            }}>
                            {!liked &&
                                <Image source={require('../../assets/muscles.png')} style={styles.icon} />
                            }
                            {liked &&
                                <Image source={require('../../assets/muscles-up.png')} style={styles.icon} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            key={`${postData.post.id}-2`}
                            onPress={() => { navigation.navigate('Comments', { postData: postData }) }} >
                            <Image source={require('../../assets/chat-bubble.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            key={`${postData.post.id}-3`}
                            onPress={() => { console.log('Share') }} >
                            <Image source={require('../../assets/send.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{postData.user.username}: {postData.post.title}</Text>
                    <Text style={styles.stats}>{nrLikes} hypes, {postData.comments} comments</Text>
                </View>
            }
            <PopUp post={postData} show={showPopup} onSelect={setShowPopup} setOption={setDeleted} />
        </>
    );
}
