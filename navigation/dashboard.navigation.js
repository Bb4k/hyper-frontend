import React, { memo } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import {
    RoleSelectScreen,
    LoginScreen,
    Signup,

    Upload,
    Comments,
    EditProfile,
    PostPage,

    Feed,
    Profile,
    Search,
    Requests,
    Chat,
    ChatPage,
} from "../screens";

function DashboardStackScreenSimple({ navigation }) {
    const DashboardStack = createStackNavigator();

    return (
        <DashboardStack.Navigator
            screenOptions={{
                animation: 'fade',
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
        >
            <DashboardStack.Screen options={{ headerShown: false }} name="Feed" component={Feed} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Search" component={Search} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Requests" component={Requests} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />

            <DashboardStack.Screen options={{ headerShown: false }} name="Comments" component={Comments} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Upload" component={Upload} />
            <DashboardStack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
            <DashboardStack.Screen options={{ headerShown: false }} name="PostPage" component={PostPage} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Chat" component={Chat} />
            <DashboardStack.Screen options={{ headerShown: false }} name="ChatPage" component={ChatPage} />

            <DashboardStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
            <DashboardStack.Screen options={{ headerShown: false }} name="RoleSelectScreen" component={RoleSelectScreen} />
        </DashboardStack.Navigator>
    );
}

const DashboardStackScreen = memo(DashboardStackScreenSimple);
export default DashboardStackScreen;