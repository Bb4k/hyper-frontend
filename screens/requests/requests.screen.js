import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from "react-native";
import { AppContext } from '../../context/app.context';
import { UserList } from '../../components';
import { getRequests } from '../../utils/utils';

export default function Requests({ navigation }) {
    const { themeColors, profile, API_URL } = useContext(AppContext);
    const [requests, setRequests] = useState(null);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
            marginBottom: 52,
        },
        title: {
            fontFamily: 'Montserrat-Medium',
            fontSize: 17,
            color: 'white',
            paddingLeft: 13,
            paddingBottom: 3,
            paddingTop: 10,
            width: '100%',
            borderBottomColor: 'rgba(255, 255, 255, 0.3)',
            borderBottomWidth: 1
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (requests == null) {
                getRequests(profile.user.id, API_URL).then((res) => setRequests(res));
            }
        }
        return unsub();
    }, [requests]);

    return (
        <>
            {requests &&
                <View style={styles.canvas}>
                    <Text style={styles.title}>Friend requests</Text>
                    {
                        requests.friendships?.length > 0 &&
                        <FlatList
                            style={styles.canvas}
                            data={requests.friendships}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ index, item }) => (
                                <UserList navigation={navigation} user={item} listType={'request'} />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                    {
                        requests.friendships?.length == 0 &&
                        <Text style={{ width: '100%', textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, paddingVertical: 15 }}>
                            No requests for now
                        </Text>
                    }

                    <Text style={styles.title}>Comment requests</Text>
                    {
                        requests.comments?.length > 0 &&
                        <FlatList
                            style={styles.canvas}
                            data={requests.comments}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ index, item }) => (
                                <UserList navigation={navigation} user={item} listType={'comment-request'} />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                    {
                        requests.comments?.length == 0 &&
                        <Text style={{ width: '100%', textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, paddingVertical: 15 }}>
                            No comments to approve
                        </Text>
                    }

                    {
                        requests.warnings?.length > 0 &&
                        <>
                            <Text style={styles.title}>Warnings</Text>
                            <FlatList
                                style={styles.canvas}
                                data={requests.warnings}
                                keyExtractor={(item, index) => `${index}`}
                                renderItem={({ index, item }) => (
                                    <UserList navigation={navigation} user={item} listType={'warning'} />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </>
                    }
                </View>
            }
        </>
    );
}