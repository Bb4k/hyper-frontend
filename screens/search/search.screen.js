import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import { AppContext } from '../../context/app.context';
import { UserList } from '../../components';

export default function Search({ navigation }) {
    const { themeColors, deviceW, searchResults } = useContext(AppContext);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
        },
    });

    return (
        <ScrollView style={styles.canvas}>
            {!searchResults &&
                <ScrollView style={{ flexDirection: 'row', marginBottom: 52 }}>
                    <Image source={require('../../assets/ad1.png')} style={{ width: deviceW }} />
                    <Image source={require('../../assets/ad2.png')} style={{ width: deviceW }} />
                    <Image source={require('../../assets/ad3.png')} style={{ width: deviceW }} />
                </ScrollView>
            }
            {searchResults &&
                <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ index, item }) => (
                        <UserList navigation={navigation} user={item} listType={'searchResult'} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            }
        </ScrollView>
    );
}