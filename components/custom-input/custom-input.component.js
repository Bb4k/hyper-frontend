import React, { useContext } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/app.context";

export default function CustomInput({ title, value, onChangeText, password, editable = true, inputStyle, toggle = false }) {
    const { themeColors } = useContext(AppContext);

    const styles = StyleSheet.create({
        input: {
            paddingLeft: 15,
            fontSize: 20,
            fontFamily: 'Montserrat-Bold',
            paddingVertical: 10,
            minHeight: 45,
            maxHeight: 45,
            borderRadius: 10,
            marginBottom: 8,
            backgroundColor: themeColors.blue,
            color: 'white',
            flex: 1
        },
        title: {
            fontSize: 15,
            fontFamily: 'Montserrat-Bold',
            color: 'white',
            paddingBottom: 5,
        }
    })

    return (
        <>
            {title &&
                <Text style={styles.title}>
                    {title}
                </Text>
            }
            {!toggle &&
                <TextInput
                    style={[styles.input, inputStyle]}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={password}
                    autoCapitalize={'none'}
                    editable={editable}
                />
            }
            {toggle &&
                <TouchableOpacity
                    style={{
                        backgroundColor: value == 1 ? themeColors.yellow : themeColors.pink,
                        borderRadius: 50,
                        width: 90,
                        height: 45,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: value == 1 ? 'flex-end' : 'flex-start',
                        flexDirection: 'row'
                    }}
                    onPress={() => { onChangeText(value == 1 ? 0 : 1) }}>
                    {value == 1 &&
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, color: 'rgba(0, 0, 0, 0.4)', marginRight: 5 }}>ON</Text>
                    }
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 50,
                        height: 35,
                        width: 35
                    }} />
                    {value == 0 &&
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, color: 'rgba(0, 0, 0, 0.4)', marginLeft: 5 }}>OFF</Text>
                    }
                </TouchableOpacity>
            }
        </>
    );
}