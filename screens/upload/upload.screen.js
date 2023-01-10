import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity, FlatList } from "react-native";
import { AppContext } from '../../context/app.context';
import { CustomButton, CustomInput, ImageUpload, PR } from '../../components';
import { getAchivements, uploadPost, getProfile } from '../../utils/utils';

export default function Upload({ navigation }) {
    const { themeColors, API_URL, deviceW, profile, setProfile } = useContext(AppContext);
    const [kg, setKg] = useState(0);
    const [media, setMedia] = useState('https://i.ibb.co/D4MNgSK/psot.png');
    const [achivements, setAchivements] = useState([]);
    const [title, setTitle] = useState('');
    const [selected, setSelected] = useState(0);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
            marginBottom: 52,
        },
        title: {
            backgroundColor: themeColors.yellow,
            color: themeColors.black,
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            paddingVertical: 13,
            width: '100%',
            textAlign: 'center'
        },
        kgStyle: {
            backgroundColor: themeColors.black,
            color: 'white',
            fontFamily: 'Montserrat-Bold',
            fontSize: 35,
            paddingVertical: 5,
            textAlign: 'center'
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (achivements.length == 0) {
                getAchivements(API_URL)
                    .then((result) => setAchivements(result))
                    .then((res2) => setAchivements([...res2].sort((a, b) => a.id - b.id)));
            }
        };
        return unsub();
    }, [achivements]);

    return (
        <ScrollView style={styles.canvas}>
            <Text style={styles.title}>Select achivement</Text>
            <PR data={achivements} onPress={setSelected} selected={selected} />
            <Text style={styles.title}>Select kg</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { setKg(kg - 1) }}>
                    <Text style={styles.kgStyle}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.kgStyle, { minWidth: 70, paddingHorizontal: 10 }]}>{kg}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { setKg(kg + 1) }}>
                    <Text style={styles.kgStyle}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Add proof</Text>
            <ImageUpload pickerResponse={media} setPickerResponse={setMedia} size={70} paddingVertical={40} />
            <Text style={styles.title}>Add title</Text>
            <View style={{ paddingHorizontal: 17, paddingVertical: 5 }}>
                <CustomInput
                    title={''}
                    value={title}
                    onChangeText={setTitle}
                />
                <CustomButton
                    style={{ backgroundColor: themeColors.pink, marginHorizontal: deviceW * 0.3 }}
                    text={"POST"}
                    onPress={() => {
                        var bodyFormData = {
                            userId: profile.user.id,
                            weight: kg,
                            prId: selected,
                            media: media,
                            title: title,
                        }
                        uploadPost(bodyFormData, API_URL).then(() => { navigation.goBack() });
                    }}
                />
            </View>

        </ScrollView >
    );
}