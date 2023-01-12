import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, PermissionsAndroid } from "react-native";
import { AppContext } from "../../context/app.context";
import * as DocumentPicker from 'expo-document-picker';

export default function ImageUpload({ navigation, pickerResponse, setPickerResponse, size, paddingVertical }) {
    const { themeColors } = useContext(AppContext);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
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
                setPickerResponse(res.uri);
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
            style={[styles.container]}
            onPress={selectFile}>
            {!pickerResponse &&
                <>
                    <Image source={require('../../assets/upload-big-arrow.png')} style={[styles.image, { height: size, width: size }]} />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>Select media</Text>
                </>
            }
            {pickerResponse &&
                <Image source={{ uri: pickerResponse }} style={{ height: size + paddingVertical, width: size + paddingVertical, resizeMode: 'cover' }} />
            }
        </TouchableOpacity>
    );
}
