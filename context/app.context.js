import { createContext, useState, useMemo } from "react";
import { Dimensions } from 'react-native';
import axios from "axios";
import { navigate } from "../navigation/root.navigation";


const AppContext = createContext();

function AppProvider(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [themeColors, setThemeColors] = useState({
    black: '#000000',
    pink: '#d90279',
    blue: '#059ce3',
    yellow: '#fded01',
  })

  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [failedLogin, setFailedLogin] = useState(null);
  const [API_URL, SET_API_URL] = useState("http://192.168.0.111:8000");

  const [deviceW, setDeviceW] = useState(Dimensions.get('window').width);
  const [deviceH, setDeviceH] = useState(Dimensions.get('window').height);

  const handleLogin = async (formData) => {
    axios.post(
      `${API_URL}/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(async (response) => {
        // get entire profile of user
        axios.get(
          `${API_URL}/user-profile/${response.data.id}`)
          .then((profileRes) => {
            // setUser(profileRes.data.user);
            setProfile(profileRes.data);
            navigate("Feed");
          })
          .catch((profileRes) => {
            try {
              show({ message: profileRes, type: "error" });
            } catch (e) {
              console.log("Response all data: ", profileRes);
            }
          });

      })
      .catch((response) => {
        try {
          show({ message: response, type: "error" });
        } catch (e) {
          console.log("Response rgvv: ", response);
        }
      });
  };


  const handleSignup = async (formData) => {
    axios.post(
      `${API_URL}/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        // get entire profile of user
        axios.get(
          `${API_URL}/user-profile/${response.data.id}`)
          .then((profileRes) => {
            // setUser(profileRes.data.user);
            setProfile(profileRes.data);
            navigate("Feed");
          })
          .catch((profileRes) => {
            try {
              show({ message: profileRes, type: "error" });
            } catch (e) {
              console.log("Response all data: ", profileRes);
            }
          });
      })
      .catch((response) => {
        try {
          show({ message: response, type: "error" });
        } catch (e) {
          console.log("Response rgvv: ", response);
        }
      });
  };

  const handleSignout = async () => {
    // setUser(null);
    setProfile(null);
  };

  const store = {
    // General app
    isLoading,
    setIsLoading,

    // Search user
    searchBar,
    setSearchBar,
    searchText,
    setSearchText,
    searchResults,
    setSearchResults,

    // User data
    // user,
    // setUser,
    profile,
    setProfile,
    failedLogin,

    // API
    API_URL,

    // Auth
    handleLogin,
    handleSignup,
    handleSignout,

    // Color Pallete
    themeColors,

    // Device
    deviceW,
    deviceH,
  };

  const storeForProvider = useMemo(() => store, [store]);
  return <AppContext.Provider value={storeForProvider}>{props.children}</AppContext.Provider>;
}

export { AppContext };
export default AppProvider;
