import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { } from "../../utils/utils";

export default function Conversation({ navigation, user }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);

    const styles = StyleSheet.create({
        container: {
            padding: 17,
            flexDirection: 'row',
            borderBottomColor: 'rgba(255, 255, 255, 0.3)',
            borderBottomWidth: 1,
            alignItems: 'center'
        },
        profilePicture: {
            height: 55,
            width: 55,
            marginRight: 13,
            borderRadius: 10,
            borderColor: themeColors.yellow,
            borderWidth: 2
        },
        usernameStyle: {
            color: 'white',
            fontSize: 17,
            lineHeight: 17,
            fontFamily: 'Montserrat-Bold'
        }
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => { navigation.navigate("ChatPage", { userId: user.id }) }}>
            <Image source={{ uri: user.picture }} style={styles.profilePicture} />
            <Text style={styles.usernameStyle}>{user.username}</Text>
        </TouchableOpacity>
    );
}