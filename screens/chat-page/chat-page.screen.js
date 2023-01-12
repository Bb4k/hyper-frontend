import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { AppContext } from '../../context/app.context';
import { Message } from '../../components';
import { sendMessage, getChat } from '../../utils/utils';
import { CustomInput } from '../../components';

export default function ChatPage({ navigation, route }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);
    const [endUser, setEndUser] = useState(route.params?.userId);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.black,
            width: '100%',
            height: '100%',
            marginBottom: 52,
        },
        commentContainer: {
            zIndex: 2,
            position: 'absolute',
            bottom: 52,
            width: '100%',
            backgroundColor: themeColors.black,
            paddingHorizontal: 17,
            paddingTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)'
        },
        profilePicture: {
            height: 40,
            width: 40,
            resizeMode: 'contain',
            borderRadius: 50,
            borderColor: themeColors.yellow,
            borderWidth: 1,
            marginRight: 17
        },
        btnStyle: {
            height: 30,
            width: 30,
            marginLeft: 17
        },
        usernameStyle: {
            color: 'white',
            fontSize: 17,
            lineHeight: 17,
            fontFamily: 'Montserrat-Bold'
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (messages.length == 0) {
                getChat(profile.user.id, endUser, API_URL).then((res) => {
                    setMessages(res.conversations);
                    setEndUser(res.friend_user);
                });

            }
        }
        return unsub();
    }, [messages]);

    return (

        <View style={styles.canvas}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 17,
                width: '100%',
                backgroundColor: themeColors.black,
                zIndex: 3,
                borderBottomColor: 'rgba(255, 255, 255, 0.3)',
                borderBottomWidth: 1,
            }}>
                <Image source={{ uri: endUser.picture }} style={styles.profilePicture} />
                <Text style={styles.usernameStyle}>{endUser.username}</Text>
            </View>
            {messages.length > 0 &&
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ index, item }) => (
                        <Message text={item.text} userId={item.userId} />
                    )}
                    showsVerticalScrollIndicator={true}
                />
            }
            <View style={styles.commentContainer}>
                <CustomInput
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity
                    onPress={() => {
                        var formData = {
                            userFromId: profile.user.id,
                            userToId: route.params?.userId,
                            text: message,
                        }
                        message != '' && sendMessage(formData, API_URL).then((newMessage) => {
                            setMessage('');
                        });
                    }}>
                    <Image source={require('../../assets/send.png')} style={styles.btnStyle} />
                </TouchableOpacity>
            </View>
        </View >
    );
}