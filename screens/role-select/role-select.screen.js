import React, { useEffect, useContext, useState } from 'react';
import { View, Image } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function RoleSelectScreen({ navigation }) {
  const { themeColors, deviceH, handleLogin } = useContext(AppContext);

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
        }}>

        <Image source={require('../../assets/hyper-logo.png')} style={{ width: '100%', resizeMode: 'contain' }} />

        <CustomButton
          size
          padding={{ marginBottom: 10 }}
          text={"Log in"}
          onPress={() => navigation.navigate('Login')}
        />

        <CustomButton
          size
          padding={{ marginBottom: 10 }}
          text={"Sign up"}
          onPress={() => navigation.navigate('Signup')}
        />

        <CustomButton
          size
          style={{ backgroundColor: themeColors.pink }}
          text={"Log in as Guest"}
          onPress={() => {
            var bodyFormData = {
              username: 'guest',
              email: '',
              password: 'guest',
              height: 0,
              weight: 0,
              picture: ''
            }
            handleLogin(bodyFormData);
          }}
        />

      </View>
    </View>
  );
}