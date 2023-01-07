import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";
import { AppContext } from "../../context/app.context";
import { getSearchResults } from "../../utils/utils";

export default function Header({ navigate }) {
    const { themeColors, username, API_URL, searchBar, searchText, setSearchText, getFriend, setSearchResults } = useContext(AppContext);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
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
                            setSearchResults(getSearchResults(text, API_URL));
                        }}
                        autoCapitalize={'none'}
                    />
                </>
            }
            {!searchBar &&
                <Image source={require('../../assets/hyper-logo.png')} style={{ resizeMode: 'contain', height: 45, width: '100%' }} />
            }
        </View>
    );
}
