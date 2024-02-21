import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { bag, bag_focus, category, category_focus, heart, heart_focus, home, home_focus, profile, profile_focus } from '../utils/Images';
import SignUp from '../modules/SignUp_Screen/SignUp';
import SCREEN_NAMES from './screenNames';
import Dashboard from '../modules/Home/dashboard';
import Scale from '../utils/Scale';
import CategoryTab from '../modules/CategoryTab/CategoryTab';
import WishlistTab from '../modules/WishListScreen/WishlistTab';
import CartScreen from '../modules/CartTab/CartScreen';
import Profile from '../modules/ProfileScreen/Profile';
import { createStackNavigator } from '@react-navigation/stack';

const bottomTabIcons: any = {
  Dashboard: home,
  Category: category,
  Heart: heart,
  Bag: bag,
  Profile: profile
}

const bottomTabFocusedIcons: any = {
  Dashboard: home_focus,
  Category: category_focus,
  Heart: heart_focus,
  Bag: bag_focus,
  Profile: profile_focus

}

export const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={SCREEN_NAMES.DASHBOARD} screenOptions={{ headerShown: false }} tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name={SCREEN_NAMES.DASHBOARD} component={Dashboard} />
      <Tab.Screen name={SCREEN_NAMES.CATEGORY} component={CategoryTab} />
      <Tab.Screen name={SCREEN_NAMES.HEART} component={WishlistTab} />
      <Tab.Screen name={SCREEN_NAMES.BAG} component={CartScreen} />
      <Tab.Screen name={SCREEN_NAMES.PROFILE} options={{ tabBarIcon: profile_focus }} component={ProfileStack} />
    </Tab.Navigator>
  )
}

export const ProfileStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'ProfileMainScreen'} component={Profile} />
    </Stack.Navigator>
  )
}


function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconView}>
              <Image
                resizeMode="contain"
                source={
                  isFocused
                    ? bottomTabFocusedIcons[label]
                    : bottomTabIcons[label]
                }
                style={styles.imageStyle}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Scale(22),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginHorizontal: Scale(20)
  },
  iconView: {
    padding: Scale(10),
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
});
