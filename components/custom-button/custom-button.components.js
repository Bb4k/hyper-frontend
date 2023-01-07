import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../../context/app.context";

export default function CustomButton({ navigation, text, size, padding, onPress }) {

    const { themeColors, deviceW } = useContext(AppContext);

    const styles = StyleSheet.create({
        defaultButtonStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.blue,
            // minWidth: deviceW * 0.5,
            borderRadius: 10,
        },
        buttonStyle: {
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        bigButtonStyle: {
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
        buttonTextStyle: {
            fontFamily: 'Montserrat-Bold',
            color: themeColors.darkPrimary,
            fontSize: 20,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.defaultButtonStyle, padding, size ? styles.bigButtonStyle : styles.buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.buttonTextStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );

}