import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { View } from 'react-native';
import Colors from '../constants/Colors';
import { Octicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ContactScreen from '../screens/ContactScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
        shadowOpacity: 0
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontSize: 23
      }
    }}>
      <Stack.Screen
        name="Root"
        component={MainTabNavigator} 
        options={{
          title: 'Whatsapp',
          headerRight: () => (
            <View style={{ flexDirection: 'row', width: 60, justifyContent: 'space-around' }}>
              <Octicons name="search" size={23} color='white' />
              <MaterialCommunityIcons name="dots-vertical" size={23} color='white' />
            </View>
          )
        }}
      />
      <Stack.Screen 
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: (route.params as any).name,
          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              padding: 2,
              width: 100,
              justifyContent: 'space-between'
            }}>
              <FontAwesome5 name="video" size={22} color="white" />
              <MaterialIcons name="call" size={22} color="white" />
              <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
            </View>
          )
      })}
    />
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
