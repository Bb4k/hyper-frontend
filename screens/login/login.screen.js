import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { themeColors, handleLogin, setUser, failedLogin } = useContext(AppContext);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 63,
        backgroundColor: themeColors.black,
      }}>
      <View style={{ width: '100%' }}>
        <CustomInput
          title={'username'}
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          title={'password'}
          value={password}
          onChangeText={setPassword}
          password
        />
        {failedLogin &&
          <Text
            style={{
              color: themeColors.blue,
              fontSize: 10,
              fontFamily: 'Montserrat-Medium'
            }}>
            {failedLogin}
          </Text>}

        <CustomButton
          size
          text={"Submit"}
          onPress={() => {
            // var bodyFormData = {
            //   username: username,
            //   email: '',
            //   password: password,
            //   height: 0,
            //   weight: 0,
            //   picture: ''
            // }
            var bodyFormData = {
              username: 'tata',
              email: '',
              password: 'gaga',
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
