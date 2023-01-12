import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/app.context";
import { getSearchResults, searchUser } from "../../utils/utils";

export default function Header({ navigate }) {
    const { themeColors, API_URL, profile, searchBar, searchText, setSearchText, setSearchResults, deviceW } = useContext(AppContext);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: deviceW,
            height: 52,
            justifyContent: 'center'
        },
        input: {
            marginVertical: 10,
            marginHorizontal: 13,
            paddingLeft: 30,
            backgroundColor: 'rgba(255,255,255,0.5)',
            color: 'white',
            fontSize: 17,
            fontFamily: 'Montserrat-Medium',
            borderRadius: 10,
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (searchText.length > 0) {
                searchUser(profile.user.id, searchText, API_URL).then((results) => setSearchResults(results));
            }
        };
        return unsub();
    }, [searchText]);

    return (
        <View style={styles.canvas}>
            {searchBar &&
                <>
                    <Image source={require('../../assets/magnifying-glass.png')} style={{ resizeMode: 'contain', height: 15, width: 15, marginLeft: 20, position: 'absolute' }} />
                    <TextInput
                        style={styles.input}
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            // getSearchResults(text, API_URL).then((res) => { setSearchResults(res) });
                            // setSearchResults(getSearchResults(text, API_URL));
                        }}
                        autoCapitalize={'none'}
                    />
                </>
            }
            {!searchBar &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 17, width: '100%' }}>
                    <View style={{ height: 25, width: 25 }} />
                    <Image source={require('../../assets/hyper-logo.png')} style={{ resizeMode: 'contain', height: 45, width: '50%' }} />
                    <TouchableOpacity onPress={() => { navigate("Chat") }}>
                        <Image source={require('../../assets/send.png')} style={{ resizeMode: 'contain', height: 25, width: 25 }} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}
