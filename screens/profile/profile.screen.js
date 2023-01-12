import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
// import AppLoading from 'expo-app-loading';
import { AppContext } from '../../context/app.context';
import { getPRdetails, getProfile, sendFriendRequest } from '../../utils/utils';
import { PR } from '../../components'

export default function Profile({ navigation, route }) {
    const { themeColors, API_URL, deviceW, profile, setProfile } = useContext(AppContext);
    const [currentProfile, setCurrentProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [PRs, setPRs] = useState([1]);
    const [sendReq, setSendReq] = useState(false);

    // const isFocused = useIsFocused();

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
            padding: 10,
            backgroundColor: themeColors.yellow,
        },
        profilePicture: {
            height: 127,
            width: 84,
            resizeMode: 'cover',
            borderColor: themeColors.blue,
            borderWidth: 3,
            borderRadius: 15,
            marginRight: 10,
        },
        profileStatsContainer: {
            flex: 1,
        },
        profileStats: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        profile: {
            maxWidth: 150
        },
        effect: {
            color: themeColors.black,
            fontSize: 16,
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
            minWidth: 74,
            paddingHorizontal: 8,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
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

    useFocusEffect(
        React.useCallback(() => {
            getProfile(profile.user.id, route.params?.profile.user.id, API_URL).then((res) => {
                setCurrentProfile(res);
                setPosts(res.posts);
                setPRs([]);
            })
        }, [route.params?.profile])
    );

    useEffect(() => {
        const unsub = () => {
            if (PRs.length == 0) {
                for (const PR of currentProfile.usersPr) {
                    getPRdetails(PR.prId, API_URL)
                        .then((data) => setPRs(PRs => [...PRs, { icon: data.icon, id: data.id, name: data.name, weight: PR.weight }]))
                        .then((data2) => { setPRs([...data2].sort((a, b) => a.id - b.id)) });
                }
            }
        };
        return unsub();
    }, [PRs]);

    const buttonText = (reqSent) => {
        if (currentProfile.are_friends == 1)
            return "GYM BRO"
        if (!reqSent || currentProfile.are_friends == 0)
            return "ADD FRIEND"
        return "ALREADY ADDED"
    }

    const viewRight = (profile2check) => {
        if (profile2check.user.id != profile.user.id) {
            if (profile.user?.role == 'admin')
                return true;
            if (profile2check.are_friends == 1)
                return true;
            else if (profile2check.user?.private == 0)
                return true;
        } else {
            return true;
        }
        return false;
    }

    const privateAccountMessage = (message) => {
        return (
            <View style={{ backgroundColor: themeColors.blue, width: '100%', alignItems: 'center' }}>
                <Text style={[styles.effect, { paddingVertical: 20, marginBottom: 0 }]}>{message}</Text>
            </View>
        )
    }

    return (
        <>
            {currentProfile &&
                <ScrollView style={styles.canvas}>
                    <View style={styles.headerContainer}>
                        <Image source={{ uri: currentProfile.user.picture }} style={styles.profilePicture} />
                        <View style={styles.profileStatsContainer}>
                            <View style={styles.profileStats}>
                                <View style={styles.profile}>
                                    <Text style={styles.effect}>@{currentProfile.user.username}</Text>
                                    {viewRight(currentProfile) &&
                                        <Text style={styles.userStats}>h: {currentProfile.user.height}cm{"\n"}w: {currentProfile.user.weight}kg</Text>
                                    }
                                    {profile.user?.role == 'guest' && currentProfile.user.id == profile.user.id &&
                                        <Text style={styles.userStats}>Log in to see your profile</Text>
                                    }
                                </View>
                                <View style={styles.friends}>
                                    <Text style={[styles.effect, { textAlign: 'center' }]}>friends{"\n"}{currentProfile.friends}</Text>
                                </View>
                            </View>
                            <View style={styles.btnsContainer}>
                                {currentProfile.user.id == profile.user.id && profile.user?.role != 'guest' &&
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
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => { setProfile(null); navigation.navigate("RoleSelectScreen") }}>
                                            <Text style={styles.btnStyle}>OUT</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                                {currentProfile.user.id != profile.user.id && profile.user?.role != 'guest' &&
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => { !sendReq && sendFriendRequest({ user1Id: profile.user.id, user2Id: currentProfile.user.id }).then(setSendReq(true)) }}>
                                        <Text style={styles.btnStyle}>{buttonText(sendReq)}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    <Text style={styles.title}>Current PRs</Text>
                    {viewRight(currentProfile) &&
                        <PR data={PRs} />
                    }
                    {!viewRight(currentProfile) &&
                        privateAccountMessage("This account is private")
                    }
                    <Text style={styles.title}>Posts</Text>
                    {viewRight(currentProfile) &&
                        <FlatList
                            numColumns={3}
                            data={posts}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ index, item }) => {
                                return (<>{
                                    item.deleted != 1 &&
                                    <TouchableOpacity onPress={() => { navigation.navigate("PostPage", { postId: item.id }) }}>
                                        <Image source={{ uri: item.media1 }} style={{ height: deviceW / 3, width: deviceW / 3, resizeMode: 'cover', marginHorizontal: deviceW * 0.005, marginBottom: deviceW * 0.01 }} />
                                    </TouchableOpacity>
                                }</>)
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                    {!viewRight(currentProfile) &&
                        privateAccountMessage("Become bros to see posts")
                    }
                </ScrollView>
            }
            {/* {currentProfile == null && <AppLoading />} */}
        </>
    );
}