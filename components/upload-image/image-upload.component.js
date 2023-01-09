import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, PermissionsAndroid } from "react-native";
import { AppContext } from "../../context/app.context";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function ImageUpload({ navigation, pickerResponse, setPickerResponse, size, paddingVertical }) {
    const { themeColors } = useContext(AppContext);
    const [touch, setTouch] = useState(false);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 13,
            paddingVertical: pickerResponse ? 0 : paddingVertical,
            // marginBottom: 8,
        },
        image: {
            resizeMode: 'contain',
            height: 50,
            width: 50,
            paddingBottom: 10
        }
    });

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: "Hyper File Permission",
                    message:
                        "Hyper needs access to your files ",
                    // buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "Ok"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        },
    };

    const openGallery = async () => {
        requestCameraPermission().then(async () => {
            const image = await launchCamera(options);
            console.log(image);
        });
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container]}
            onPress={() => { setTouch(true) }}>
            {!touch &&
                <>
                    <Image source={require('../../assets/upload-big-arrow.png')} style={[styles.image, { height: size, width: size }]} />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>Select media</Text>
                </>
            }
            {/* {pickerResponse &&
                <Image source={{ uri: pickerResponse }} style={{ height: size + paddingVertical, width: size + paddingVertical, resizeMode: 'contain' }}} */}
            {touch &&
                <Image source={{ uri: pickerResponse }} style={{ height: size + paddingVertical, width: size + paddingVertical, resizeMode: 'contain' }} />
            }
        </TouchableOpacity>
    );
}
