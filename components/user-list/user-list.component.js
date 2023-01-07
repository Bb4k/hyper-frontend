import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { deleteComment, getProfile } from "../../utils/utils";

export default function UserList({ navigate, user, listType }) {
    const { themeColors, API_URL } = useContext(AppContext);

    const setType = () => {
        if (listType == 'searchResult') {
            if (user.friend)
                return 'You are already friends';
            else
                return '';
        } else if (listType == 'comment') {
            return user.comment;
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

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, listType != 'comment' && {alignItems: 'center'}]}
            onPress={() => { }}>
            <Image source={{ uri: user.user_profile_pic }} style={styles.profilePicture} />
            <View style={styles.textContainer}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.textStyle, { fontSize: 17, lineHeight: 17, fontFamily: 'Montserrat-Bold' }]}>{user.username}</Text>
                    <Text style={styles.textStyle}>{underText}</Text>
                </View>
                {listType == 'request' &&
                    <View style={styles.requests}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.accept]}
                            onPress={() => { }}>
                            <Text style={styles.actionText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.reject]}
                            onPress={() => { }}>
                            <Text style={styles.actionText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                }
                {listType == 'comment' &&
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { }}>
                        <Image source={require('../../assets/delete.png')} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    );
}
