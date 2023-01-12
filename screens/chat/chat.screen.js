import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from "react-native";
import { AppContext } from '../../context/app.context';

export default function Chat({ navigation }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);

    const styles = StyleSheet.create({

    });

    return (<View></View>);
}