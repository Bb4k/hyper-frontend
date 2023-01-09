import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, BackHandler } from "react-native";
import { AppContext } from '../../context/app.context';
import { getPRdetails, getProfile, sendFriendRequest } from '../../utils/utils';
import { PR } from '../../components'

export default function Profile({ navigation, route }) {
    const { themeColors, API_URL, deviceW, profile } = useContext(AppContext);
    const [posts, setPosts] = useState(route.params?.profile.posts);
    const [PRs, setPRs] = useState([]);
    const [sendReq, setSendReq] = useState(false);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            // height: '100%',
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
    });

    useEffect(() => {
        const unsub = () => {
            if (PRs.length == 0) {
                for (const PR of route.params?.profile.usersPr) {
                    getPRdetails(PR.prId, API_URL)
                        .then((data) => setPRs(PRs => [...PRs, { icon: data.icon, id: data.id, name: data.name, weight: PR.weight }]))
                        .then((data2) => { setPRs([...data2].sort((a, b) => a.id - b.id)) });
                }
            }
        };
        return unsub();
    }, [PRs]);

    return (
        <ScrollView style={styles.canvas}>
            <View style={styles.headerContainer}>
                <Image source={{ uri: route.params?.profile.user.picture }} style={styles.profilePicture} />
                <View style={styles.profileStatsContainer}>
                    <View style={styles.profileStats}>
                        <View style={styles.profile}>
                            <Text style={styles.effect}>@{route.params?.profile.user.username}</Text>
                            <Text style={styles.userStats}>h: {route.params?.profile.user.height}cm{"\n"}w: {route.params?.profile.user.weight}kg</Text>
                        </View>
                        <View style={styles.friends}>
                            <Text style={[styles.effect, { textAlign: 'center' }]}>friends{"\n"}{route.params?.profile.friends}</Text>
                        </View>
                    </View>
                    <View style={styles.btnsContainer}>
                        {route.params?.profile.user.id == profile.user.id &&
                            <>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { navigation.navigate("Upload") }}>
                                    <Text style={styles.btnStyle}>POST</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { navigation.navigate("EditProfile") }}>
                                    <Text style={styles.btnStyle}>EDIT</Text>
                                </TouchableOpacity>
                            </>
                        }
                        {route.params?.profile.user.id != profile.user.id &&
                            <>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { !sendReq && sendFriendRequest({ user1Id: profile.user.id, user2Id: route.params?.profile.user.id }).then(setSendReq(true)) }}>
                                    <Text style={styles.btnStyle}>{!sendReq ? "ADD FRIEND" : "ALREADY ADDED"}</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                </View>
            </View>
            <Text style={styles.title}>Current PRs</Text>
            <PR data={PRs} />
            <Text style={styles.title}>Posts</Text>
            <FlatList
                numColumns={3}
                columnWrapperStyle={{
                    marginBottom: deviceW * 0.03,
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