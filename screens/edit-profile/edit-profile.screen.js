import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { AppContext } from '../../context/app.context';
import { CustomButton, CustomInput, ImageUpload } from '../../components';
import { getProfile, updateProfile } from '../../utils/utils';

export default function EditProfile({ navigation }) {
    const { themeColors, API_URL, deviceW, profile, setProfile } = useContext(AppContext);
    const [height, setHeight] = useState(`${profile.user.height}`);
    const [weight, setWeight] = useState(`${profile.user.weight}`);
    const [email, setEmail] = useState(profile.user.email);
    const [media, setMedia] = useState(false);
    const [privateProfile, setPrivateProfile] = useState(profile.user.private);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            flex: 1,
            marginBottom: 52,
            paddingHorizontal: 17,
            justifyContent: 'space-between'
        },
        profilePicture: {
            height: 127,
            width: 84,
            resizeMode: 'cover',
            borderColor: themeColors.blue,
            borderWidth: 3,
            borderRadius: 15,
            marginRight: 17,
        },
    });

    return (
        <View style={styles.canvas}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 17 }}>
                    <Image source={{ uri: profile.user.picture }} style={styles.profilePicture} />
                    <ImageUpload pickerResponse={media} setPickerResponse={setMedia} size={70} paddingVertical={0} />
                </View>
                <CustomInput
                    title={'height'}
                    value={height}
                    onChangeText={setHeight}
                />
                <CustomInput
                    title={'weight'}
                    value={weight}
                    onChangeText={setWeight}
                />
                <CustomInput
                    title={'email'}
                    value={email}
                    onChangeText={setEmail}
                />
                <CustomInput
                    toggle
                    title={'private'}
                    value={privateProfile}
                    onChangeText={setPrivateProfile}
                />
            </View>
            <CustomButton
                size
                style={{ backgroundColor: themeColors.pink, marginHorizontal: deviceW * 0.3, marginBottom: 10 }}
                text={"SAVE"}
                onPress={() => {
                    var bodyFormData = {
                        username: '',
                        password: '',
                        id: profile.user.id,
                        height: parseFloat(height),
                        weight: parseFloat(weight),
                        email: email,
                        picture: media
                    }
                    updateProfile(bodyFormData, API_URL)
                        .then(() => {
                            getProfile(profile.user.id, API_URL)
                                .then((res) => {
                                    setProfile(res);
                                    navigation.goBack();
                                });
                        })
                }}
            />
        </View >
    );
}