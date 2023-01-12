import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { AppContext } from "../../context/app.context";
import * as DocumentPicker from 'expo-document-picker';

export default function ImageUpload({ navigation, pickerResponse, setPickerResponse, size, paddingVertical, allowMultiple = false }) {
    const { themeColors } = useContext(AppContext);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 13,
            paddingVertical: pickerResponse ? 0 : paddingVertical,
        },
        image: {
            resizeMode: 'contain',
            height: 50,
            width: 50,
            paddingBottom: 10
        }
    });

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'image/jpeg'
            });
            if (res.type == 'success')
                setPickerResponse(pickerResponse => [...pickerResponse, res.uri]);
            // console.log(res.uri);
        } catch (err) {
            setPickerResponse(false);
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, pickerResponse.length > 0 && allowMultiple && { justifyContent: 'center', flexDirection: 'row' }]}
            onPress={() => {
                if (pickerResponse.length == 0)
                    selectFile();
            }}>
            {pickerResponse.length == 0 &&
                <>
                    <Image source={require('../../assets/upload-big-arrow.png')} style={[styles.image, { height: size, width: size }]} />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>Select media</Text>
                </>
            }
            {pickerResponse.length > 0 &&
                <FlatList
                    horizontal
                    style={{ flexGrow: 0 }}
                    data={pickerResponse}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ index, item }) => (
                        <Image source={{ uri: item }} style={{ height: size + paddingVertical, width: size + paddingVertical, resizeMode: 'cover', marginHorizontal: 5 }} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            }
            {pickerResponse.length < 3 && pickerResponse.length > 0 && allowMultiple &&
                <TouchableOpacity onPress={selectFile}>
                    <Image source={require('../../assets/add.png')} style={[styles.image, { height: size, width: size }]} />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    );
}
