import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { navigationRef } from "../../navigation/root.navigation";
import { acceptFriendRequest, deleteComment, getProfile, rejectFriendRequest } from "../../utils/utils";

export default function UserList({ navigation, user, listType }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);
    const [deleted, setDeleted] = useState(false);
    const friendRequest = {
        user1Id: user.friendrequest?.user1Id,
        user2Id: user.friendrequest?.user2Id
    };

    const setType = () => {
        if (listType == 'searchResult') {
            if (user.are_friends)
                return 'You are already friends';
            else
                return '';
        } else if (listType == 'comment') {
            return user.comment.text;
        }
        return 'Wants to be your gym bro';
    }

    const underText = setType();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 13,
            paddingVertical: 7
        },
        profilePicture: {
            height: 55,
            width: 55,
            marginRight: 13,
            borderRadius: 10,
            borderColor: themeColors.yellow,
            borderWidth: 2
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
        },
        textStyle: {
            color: 'white',
            fontSize: 13,
            fontFamily: 'Montserrat-Medium',
            maxWidth: 200
        },
        requests: {
            justifyContent: 'center',
            alignContent: 'space-between',
            alignItems: 'center',
        },
        actionButton: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 26,
            borderRadius: 7,
        },
        actionText: {
            color: 'white',
            fontSize: 15,
            fontFamily: 'Montserrat-Bold',
        },
        accept: {
            backgroundColor: themeColors.blue,
            marginBottom: 5,
        },
        reject: {
            backgroundColor: themeColors.pink
        }
    });

    return !deleted && (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, listType != 'comment' && { alignItems: 'center' }]}
            onPress={() => {
                navigation.navigate("Profile", {
                    profile: {
                        user: {
                            id: user.user.id
                        }
                    },
                    friends: user.are_friends || user.friendship?.status
                })
            }}>
            <Image source={{ uri: user.user.picture }} style={styles.profilePicture} />
            <View style={styles.textContainer}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.textStyle, { fontSize: 17, lineHeight: 17, fontFamily: 'Montserrat-Bold' }]}>{user.user.username}</Text>
                    <Text style={styles.textStyle}>{underText}</Text>
                </View>
                {listType == 'request' &&
                    <View style={styles.requests}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.accept]}
                            onPress={() => { acceptFriendRequest(friendRequest, API_URL).then(() => setDeleted(true)); }}>
                            <Text style={styles.actionText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.reject]}
                            onPress={() => { rejectFriendRequest(friendRequest, API_URL).then(() => setDeleted(true)); }}>
                            <Text style={styles.actionText}>Reject</Text>
                        </TouchableOpacity>
                    </View >
                }
                {
                    listType == 'comment' && user.user.id == profile.user.id &&
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            deleteComment(user.comment.id, API_URL);
                            setDeleted(true);
                        }}>
                        <Image source={require('../../assets/delete.png')} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                }
            </View >
        </TouchableOpacity >
    );
}
