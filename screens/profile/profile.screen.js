import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from "react-native";
import { AppContext } from '../../context/app.context';
import { getPRdetails } from '../../utils/utils';

export default function Profile({ navigation }) {
    const { themeColors, user, API_URL, deviceW, profile } = useContext(AppContext);
    const [posts, setPosts] = useState(profile.posts);
    const [PRs, setPRs] = useState([]);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
            marginBottom: 52,
        },
        headerContainer: {
            flexDirection: 'row',
            alignContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 17,
            backgroundColor: themeColors.yellow,
        },
        profilePicture: {
            height: 127,
            width: 84,
            resizeMode: 'contain',
            borderColor: themeColors.blue,
            borderWidth: 3,
            borderRadius: 15,
            marginRight: 17,
        },
        profileStatsContainer: {
            flex: 1,
        },
        profileStats: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        profile: {

        },
        effect: {
            color: themeColors.black,
            fontSize: 19,
            fontFamily: 'Montserrat-Bold',
            marginBottom: 7,
        },
        userStats: {
            color: themeColors.black,
            fontSize: 15,
            fontFamily: 'Montserrat-Medium',
            marginBottom: 7,
        },
        friends: {

        },
        btnsContainer: {
            flexDirection: 'row',
        },
        button: {
            backgroundColor: themeColors.black,
            borderRadius: 7,
            width: 74,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 17,
            borderBottomColor: themeColors.blue,
            borderRightColor: themeColors.blue,
            borderLeftColor: themeColors.pink,
            borderTopColor: themeColors.pink,
            borderWidth: 4,
        },
        btnStyle: {
            color: 'white',
            fontSize: 20,
            fontFamily: 'Montserrat-Medium',
        },
        title: {
            color: themeColors.blue,
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            paddingVertical: 13,
            width: '100%',
            textAlign: 'center'
        },
        PRlist: {
            backgroundColor: 'rgba(5, 156, 227, 0.2)',
            width: '100%',
            paddingHorizontal: 17,
            paddingVertical: 10,
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (PRs.length == 0) {
                for (const PR of profile.usersPr) {
                    getPRdetails(PR.prId, API_URL).then((data) => setPRs(PRs => [...PRs, { icon: data.icon, id: data.id, name: data.name, weight: PR.weight }]));
                }
            }
        };
        return unsub();
    }, [PRs]);

    const renderPR = (data, index) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 7 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: data.icon }} style={{ height: 35, width: 35, resizeMode: 'contain', marginRight: 17 }} />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>{data.name}</Text>
                </View>
                <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>{data.weight}kg</Text>
            </View>
        );
    };

    return (
        <ScrollView style={styles.canvas}>
            <View style={styles.headerContainer}>
                <Image source={{ uri: user.picture }} style={styles.profilePicture} />
                <View style={styles.profileStatsContainer}>
                    <View style={styles.profileStats}>
                        <View style={styles.profile}>
                            <Text style={styles.effect}>@{user.username}</Text>
                            <Text style={styles.userStats}>h: {user.height}cm{"\n"}w: {user.weight}kg</Text>
                        </View>
                        <View style={styles.friends}>
                            <Text style={[styles.effect, { textAlign: 'center' }]}>friends{"\n"}{user.friends_count}</Text>
                        </View>
                    </View>
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { }}>
                            <Text style={styles.btnStyle}>POST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { }}>
                            <Text style={styles.btnStyle}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={styles.title}>Current PRs</Text>
            <FlatList
                style={styles.PRlist}
                data={PRs}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ index, item }) => (
                    renderPR(item)
                )}
                showsVerticalScrollIndicator={false}
            />
            <Text style={styles.title}>Posts</Text>
            <FlatList
                numColumns={3}                  // set number of columns 
                columnWrapperStyle={{
                    marginBottom: deviceW * 0.03,
                    // flex: 1
                    justifyContent: "space-between"
                }}
                data={posts}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ index, item }) => (
                    <Image source={{ uri: item.media }} style={{ height: deviceW / 3.2, width: deviceW / 3.2, resizeMode: 'contain' }} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </ScrollView>
    );
}