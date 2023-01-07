import React, { useEffect, useContext, useState } from 'react';
import { View, Image } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function RoleSelectScreen({ navigation }) {
  const { themeColors, deviceH, deviceW } = useContext(AppContext);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: themeColors.black,
        alignItems: 'center',
        paddingHorizontal: 63,
      }}>
      <View
        style={{
          width: '100%',
          top: deviceH * 0.1,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>

        <Image source={require('../../assets/hyper-logo.png')} style={{ width: '100%', resizeMode: 'contain' }} />

        <CustomButton
          padding={{ marginBottom: 10 }}
          text={"Log in"}
          onPress={() => navigation.navigate('Login')}
        />

        <CustomButton
          text={"Sign up"}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
}