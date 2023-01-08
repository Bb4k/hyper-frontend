import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AppContext } from "../../context/app.context";
import { getProfile } from "../../utils/utils";

export default function Footer({ navigate }) {
  const localRoutes = ["Feed", "Search", "Requests", "Profile"];
  const { themeColors, setSearchBar, setSearchText, setSearchResults, user } = useContext(AppContext);
  const [focused, setFocused] = useState('Feed');

  const FooterButton = ({ isFocused, image, profilePic = false }) => {
    return (
      <View style={{
        padding: 7,
      }}>
        {image && !profilePic && <Image source={image} style={{ width: 25, height: 25 }} />}
        {image && profilePic && <Image source={{ uri: user.picture }} style={[{ width: 30, height: 30, borderRadius: 50, borderColor: themeColors.yellow, borderWidth: 1 }]} />}
      </View>);
  };

  const renderIcon = ({ routeName, isFocused }) => {
    if (routeName == 'Feed') {
      // setSearchBar(false);
      return <FooterButton image={require('../../assets/home.png')} isFocused={isFocused} />;
    }

    if (routeName == 'Search') {
      // setSearchBar(true);
      return <FooterButton image={require('../../assets/magnifying-glass.png')} isFocused={isFocused} />;
    }

    if (routeName == 'Requests') {
      // setSearchBar(false);
      return <FooterButton image={require('../../assets/friends.png')} isFocused={isFocused} />;
    }

    if (routeName == 'Profile') {
      // setSearchBar(false);
      return <FooterButton image={user.picture} isFocused={isFocused} profilePic />;
    }
  }

  useEffect(() => {
    const unsub = () => {
      setSearchBar(focused == 'Search');
      if (focused != 'Search') {
        setSearchText('');
        setSearchResults(null);
      }
    }
    return unsub();
  }, [focused]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 100,
        height: 52,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: themeColors.black,
      }}>
      {localRoutes.map((route, index) => {
        const isFocused = route === focused;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={() => {
              navigate(route);
              setFocused(route);
            }}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            {renderIcon({ routeName: route, isFocused })}
          </TouchableOpacity>
        )
      })}
    </View>
  );
}
