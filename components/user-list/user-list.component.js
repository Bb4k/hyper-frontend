import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/app.context";
import { acceptFriendRequest, deleteComment, acceptCommentRequest, rejectCommentRequest, rejectFriendRequest, sendWarning, deleteWarning, deletePost } from "../../utils/utils";

export default function UserList({ navigation, user, listType }) {
    // listType
    // comment          - comment from a post                                   (can be deleted)
    // searchResult     - profile preview from search page
    // request          - friend request from request page
    // comment-request  - comment request from request page
    // warning          - notification when an admin deletes your post/comment  (can be deleted)

    const { themeColors, API_URL, profile } = useContext(AppContext);
    // if it's a comment, it might have been removed by an admin, otherwise set as false 
    const [deleted, setDeleted] = useState(listType == "comment" ? user.comment.deleted == 1 || user.comment.status == 0 : false);
    const friendRequest = {
        user1Id: user.friendrequest?.user1Id,
        user2Id: user.friendrequest?.user2Id
    };
    const commentRequest = user.comment?.id;

    const setType = () => {
        if (listType == 'searchResult') {
            if (user.are_friends)
                return 'You are already friends';
            else
                return '';
        } else if (listType == 'comment' || listType == 'comment-request') {
            return user.comment.text;
        }
        if (listType == 'warning') {
            return user.comment.text == null ? "Your post has been deleted" : user.comment.text;
        }
        return 'Wants to be your gym bro';
    }

    const deleteRight = () => {
        // if it's a comment and you are an admin 
        if (listType == "comment" && profile.user?.role == 'admin')
            return true;
        // if it's a warning for a post that has been deleted by an admin
        if (listType == "warning" && user.comment.text == null && profile.user.id == user.post.userId)
            return true;
        // if it's a warning for a comment that has been deleted by an admin
        if (listType == "warning" && user.comment.text != null && profile.user.id == user.comment.userId)
            return true;
        // if it's your own comment
        if (listType == "comment" && (profile.user.id == user.comment.userId || profile.user.id == user.comment.authorPostId))
            return true;
        return false;
    }

    const underText = setType();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 13,
            paddingVertical: 7
        },
        profilePicture: {
            height: 55,
            width: 55,
            marginRight: 13,
            borderRadius: 10,
            borderColor: themeColors.yellow,
            borderWidth: 2
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
        },
        textStyle: {
            color: 'white',
            fontSize: 13,
            fontFamily: 'Montserrat-Medium',
            maxWidth: 200
        },
        requests: {
            justifyContent: 'center',
            alignContent: 'space-between',
            alignItems: 'center',
        },
        actionButton: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 26,
            borderRadius: 7,
        },
        actionText: {
            color: 'white',
            fontSize: 15,
            fontFamily: 'Montserrat-Bold',
        },
        accept: {
            backgroundColor: themeColors.blue,
            marginBottom: 5,
        },
        reject: {
            backgroundColor: themeColors.pink
        }
    });

    return (!deleted || (listType != 'comment' && user.comment.status == 1)) && (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, listType != 'comment' && { alignItems: 'center' }]}
            onPress={() => {
                listType != 'warning' && navigation.navigate("Profile", {
                    profile: {
                        user: {
                            id: user.user.id
                        }
                    }
                })
            }}>
            <Image source={{ uri: listType == 'warning' ? user.post.media1 : user.user.picture }} style={styles.profilePicture} />
            <View style={styles.textContainer}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.textStyle, { fontSize: 17, lineHeight: 17, fontFamily: 'Montserrat-Bold' }]}>{user.user.username}</Text>
                    <Text style={styles.textStyle}>{underText}</Text>
                </View>
                {(listType == 'request' || listType == 'comment-request') &&
                    <View style={styles.requests}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.accept]}
                            onPress={() => {
                                listType == 'request' && acceptFriendRequest(friendRequest, API_URL).then(() => setDeleted(true));
                                listType == 'comment-request' && acceptCommentRequest(commentRequest, API_URL).then(() => setDeleted(true));
                            }}>
                            <Text style={styles.actionText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.reject]}
                            onPress={() => {
                                listType == 'request' && rejectFriendRequest(friendRequest, API_URL).then(() => setDeleted(true));
                                listType == 'comment-request' && rejectCommentRequest(commentRequest, API_URL).then(() => setDeleted(true));
                            }}>
                            <Text style={styles.actionText}>Reject</Text>
                        </TouchableOpacity>
                    </View >
                }
                {
                    (listType == 'comment' || listType == 'warning') && deleteRight() &&
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            var bodyFormData = {
                                userId: user.user.id,
                                postId: user.comment.postId,
                                commentId: user.comment.id
                            }
                            if (profile.user?.role == 'admin' && listType == 'comment')
                                // when admin deletes a comment, we send a warning
                                sendWarning(bodyFormData, API_URL);
                            else {
                                // when user deletes his own comment
                                listType == 'comment' && deleteComment(user.comment.id, API_URL);

                                // when user deletes a warning
                                if (listType == 'warning')
                                    deleteWarning(user.id, API_URL)
                                if (user.comment.text == null)
                                    deletePost(user.post.id, API_URL);
                                else
                                    deleteComment(user.comment.id, API_URL);
                            }

                            setDeleted(true);
                        }}>
                        <Image source={require('../../assets/delete.png')} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                }
            </View >
        </TouchableOpacity >
    );
}
