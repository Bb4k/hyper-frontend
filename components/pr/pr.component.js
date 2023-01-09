import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { AppContext } from '../../context/app.context';

export default function PR({ navigate, data, onPress, selected = false }) {
    const { themeColors } = useContext(AppContext);
    const styles = StyleSheet.create({
        PRlist: {
            backgroundColor: 'rgba(5, 156, 227, 0.2)',
            width: '100%',
            paddingHorizontal: 17,
            paddingVertical: 10,
            height: 150
        }
    });

    const renderPR = (item) => {
        return (
            <TouchableOpacity
                style={[selected == item.id && { backgroundColor: themeColors.pink }, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginVertical: 7,
                    borderRadius: 10
                }]}
                onPress={() => { onPress && onPress(item.id) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.icon }} style={{ height: 35, width: 35, resizeMode: 'contain', marginRight: 17 }} />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>{item.name}</Text>
                </View>
                {item.weight &&
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'white' }}>{item.weight}kg</Text>
                }
            </TouchableOpacity>
        );
    }

    return (
        <FlatList
            style={[styles.PRlist]}
            data={data}
            keyExtractor={(item, index) => `${index}`}
            nestedScrollEnabled
            renderItem={({ index, item }) => (
                renderPR(item)
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}