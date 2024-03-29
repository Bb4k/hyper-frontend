import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, Text } from "react-native";
import { AppContext } from '../../context/app.context';
import { CustomInput, UserList } from '../../components';
import { addComment, getComments } from '../../utils/utils';

export default function Comments({ navigation, route }) {
    const { themeColors, API_URL, profile } = useContext(AppContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

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
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (comments.length == 0) {
                getComments(route.params?.postData.post.id, API_URL).then((res) => setComments(res));
            }
        }
        return unsub();
    }, []);

    return (
        <>
            {comments.length > 0 &&
                <FlatList
                    style={styles.canvas}
                    data={comments}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ index, item }) => (
                        <UserList navigation={navigation} user={item} listType={'comment'} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            }
            {comments.length == 0 &&
                <View style={styles.canvas}>
                    <Text style={{ width: '100%', textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, paddingVertical: 15 }}>
                        No comments yet
                    </Text>
                </View>
            }
            {profile.user?.role != 'guest' &&
                <View style={styles.commentContainer}>
                    <Image source={{ uri: profile.user.picture }} style={styles.profilePicture} />
                    <CustomInput
                        value={comment}
                        onChangeText={setComment}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            var formData = {
                                authorPostId: route.params?.postData.user.id,
                                postId: route.params?.postData.post.id,
                                userId: profile.user.id,
                                text: comment
                            }
                            addComment(formData, API_URL).then((newComments) => {

                                var tempComment = {
                                    authorPostId: route.params?.postData.user.id,
                                    user: {
                                        id: profile.user.id,
                                        username: profile.user.username,
                                        picture: profile.user.picture
                                    },
                                    comment: {
                                        id: newComments[newComments.length - 1].id,
                                        text: comment
                                    }
                                }

                                // setComments(comments => [...comments, tempComment]);
                                setComment('');
                            });
                        }}>
                        <Image source={require('../../assets/send.png')} style={styles.btnStyle} />
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}