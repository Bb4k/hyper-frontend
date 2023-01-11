import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/app.context";
import { Text, StyleSheet, TouchableOpacity, Modal, View } from "react-native";

export default function PopUp({ navigation, show, onSelect, post }) {
    const { themeColors, API_URL, deviceW, profile } = useContext(AppContext);

    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(5, 156, 227, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            backgroundColor: themeColors.black,
            borderRadius: 10,
            width: '70%',
            overflow: 'hidden'
        },
        btnContainer: {
            flex: 1,
            width: '50%',
            alignItems: 'center'
        },
        btn: {
            paddingVertical: 10,
            fontFamily: 'Montserrat-Bold',
            fontSize: 18
        }
    });

    return (
        <>
            {show &&
                <Modal transparent>
                    <View style={styles.modal}>
                        <View style={styles.container}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.btn, { color: 'white', paddingVertical: 30 }]}>Delete post?</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <TouchableOpacity
                                    style={[styles.btnContainer, { backgroundColor: themeColors.pink }]}
                                    onPress={() => {
                                        onSelect(false);
                                    }}>
                                    <Text style={[styles.btn, { color: themeColors.black }]}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btnContainer, { borderTopWidth: 1, borderTopColor: themeColors.blue }]}
                                    onPress={() => {
                                        onSelect(false);
                                        // CALL API
                                    }}>
                                    <Text style={[styles.btn, { color: themeColors.blue }]}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </>
    );
}