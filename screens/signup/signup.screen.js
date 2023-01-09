import React, { useState, useContext, useEffect } from 'react';
import { View } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { ImageUpload } from '../../components';
import { AppContext } from '../../context/app.context';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [picture, setPicture] = useState('https://i.ibb.co/D4MNgSK/psot.png');
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const { themeColors, setUser, handleSignup } = useContext(AppContext);

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
      <View style={{ width: '100%', height: '100%', justifyContent: 'space-around' }}>
        <View>
          <CustomInput
            title={'username'}
            value={username}
            onChangeText={setUsername}
          />
          <CustomInput
            title={'email'}
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            title={'height'}
            value={height}
            onChangeText={setHeight}
          />
          <CustomInput
            title={'weight'}
            value={weight}
            onChangeText={setWeight}
          />
          <ImageUpload pickerResponse={picture} setPickerResponse={setPicture} size={100} paddingVertical={0}/>
          <CustomInput
            title={'password'}
            value={password}
            onChangeText={setPassword}
            password
          />
          <CustomInput
            title={'repeat password'}
            value={password2}
            onChangeText={setPassword2}
            password
          />
        </View>

        <CustomButton
          size
          text={"Submit"}
          onPress={() => {
            if (password == password2) {
              // var bodyFormData = new FormData();
              // bodyFormData.append("username", username);
              // bodyFormData.append("email", email);
              // bodyFormData.append("password", password);
              // bodyFormData.append("height", height);
              // bodyFormData.append("weight", weight);
              // bodyFormData.append("picture", picture);
              var bodyFormData = {
                username: username,
                email: email,
                password: password,
                height: height,
                weight: weight,
                picture: picture
              }
              handleSignup(bodyFormData);
            }
          }}
        />
      </View>
    </View >
  );
}
