import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { ImageUpload } from '../../components';
import { AppContext } from '../../context/app.context';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [picture, setPicture] = useState([]); // 'https://i.ibb.co/D4MNgSK/psot.png'
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const { themeColors, handleSignup } = useContext(AppContext);

  return (
    <ScrollView
      style={{
        // height: '100%',
        // flex: 1,
        width: '100%',
        paddingHorizontal: 63,
        backgroundColor: themeColors.black,
      }}>
      <View style={{ marginTop: 52, width: '100%', flex: 1, justifyContent: 'space-around' }}>

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
        <ImageUpload
          pickerResponse={picture}
          setPickerResponse={setPicture}
          size={70}
          paddingVertical={0}
        />
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

        <CustomButton
          size
          text={"Submit"}
          style={{ backgroundColor: themeColors.pink, marginTop: 10 }}
          onPress={() => {
            if (password == password2) {
              var bodyFormData = {
                username: username,
                email: email,
                password: password,
                height: height,
                weight: weight,
                picture: picture[0],
                role: 'registered',
                private: 0,
              }
              handleSignup(bodyFormData);
            }
          }}
        />
      </View>
    </ScrollView>
  );
}
