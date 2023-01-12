import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { } from "../../utils/utils";

export default function Message({ text, userId }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);

    const styles = StyleSheet.create({
        messageStyle: {
            color: 'white',
            fontFamily: 'Montserrat-Medium',
            fontSize: 17,
            lineHeight: 17,
            padding: 10,
            backgroundColor: themeColors.pink,
            borderRadius: 10,
        },
        message: {
            marginVertical: 5,
            marginHorizontal: 17,
            flexDirection: 'row',
        },
        messageRight: {
            justifyContent: 'flex-end'
        },
    });

    return (
        <View style={[styles.message, userId == profile.user.id && styles.messageRight]}>
            <Text style={[styles.messageStyle, userId == profile.user.id && { backgroundColor: themeColors.blue }]}>{text}</Text>
        </View>
    );
}