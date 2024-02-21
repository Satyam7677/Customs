import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View,Image, ScrollView, SafeAreaView } from 'react-native';
import { arrowRight, bag, category, heart, help, home, info, logOut, offer, orders, privacy, terms } from '../utils/Images';
import Scale from '../utils/Scale';
import SCREEN_NAMES from './screenNames';
import SignIn from '../modules/SignIn_Screen/SignIn';
import { COLORS } from '../utils/Colors';
import { FontFamily } from '../utils/Fonts';
import { BottomTab } from './bottomTabs';
import LogOut from '../modules/ProfileScreen/Logout/Logout';
const drawerArray=[
  {image:home},
{image:category},
{image:heart},
{image:bag},
{image:orders},
{image:terms},
{image:privacy},
{image:help},
{image:info},
{image:offer},
{image:logOut},
]

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false,drawerType:'front',swipeEnabled:false}}   drawerContent={(props)=><CustomDrawer {...props}/>}>
      <Drawer.Screen name={SCREEN_NAMES.HOME} component={BottomTab} />
      <Drawer.Screen name={SCREEN_NAMES.CATEGORIES} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.WISHLIST} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.MY_CART} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.ORDERS} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.TERMS_CONDITIONS} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.PRIVACY_POLICY} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.HELP} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.ABOUT} component={SignIn} />
      <Drawer.Screen name={SCREEN_NAMES.OFFERS} component={SignIn} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator



const CustomDrawer = ({ state, descriptors, navigation }:any) => {
const [logoutVisible,setLogoutVisible]=useState(false)

const navigateToScreen = (screen:any) => {
  navigation.navigate(screen);
};

const button=(route:any,image:any, index:number=1000,isFocused:boolean=false)=>{
  return(<TouchableOpacity activeOpacity={0.7} key={index} onPress={()=>{
    if(route.name===SCREEN_NAMES.LOGOUT)
    {
      setLogoutVisible(!logoutVisible)
    }
    else
    navigateToScreen(route.name)}} style={[styles.optionStyle,{backgroundColor:isFocused?COLORS.blue:'transparent'}]}>
  <View style={styles.optionImageNameView}>
  <Image resizeMode='contain' source={image} style={[styles.optionImageStyle,{tintColor:isFocused?COLORS.white:'grey'}]}/>
  <Text style={[styles.optionNameStyle,{color:isFocused?COLORS.white:'black'}]}>{route.name}</Text>
  </View>
  <Image source={arrowRight} resizeMode='contain' style={[styles.arrowStyle,{tintColor:isFocused?'white':'grey'}]} />
</TouchableOpacity>)
}
 return(
  <View>
  <SafeAreaView >
<ScrollView bounces={false}>
  <View style={styles.mainView}>
          <View style={styles.profileView}>
            <View style={styles.profileImageView}>
     <Image 
    source={privacy}
    resizeMode='contain'
    style={styles.profileImageStyle}
    />
    </View>
    <View>
      <Text>
        {'Name'}
      </Text>
      <Text>
        {'email'}
      </Text>
    </View>
      </View>
      
  {state.routes.map((route:any, index:any) => {
    const isFocused = state.index === index;

    return (
      <>
      {button(route,drawerArray[index].image,index,isFocused)}
      </>
    );
  })}

{button({name:SCREEN_NAMES.LOGOUT},logOut)}

</View>
</ScrollView>
</SafeAreaView>


                    <LogOut
                    onCancelPress={()=>{setLogoutVisible(!logoutVisible)}}
                    logOutVisible={logoutVisible}
                    navigation={navigation}
                    />   


</View>
 )

 


};


const styles=StyleSheet.create({
  profileView:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:Scale(10)
  },
  mainView:{flex:1,paddingHorizontal:Scale(10)},
  profileImageView:{height:Scale(50),width:Scale(50),borderRadius:50,backgroundColor:'grey',marginRight:Scale(10)},
  profileImageStyle:{borderRadius:50,height:'100%',width:'100%', marginRight:Scale(10)},
  optionStyle:{flexDirection:'row',justifyContent:'space-between',alignItems:'center', width:'100%',borderRadius:50,paddingVertical:Scale(10),paddingHorizontal:Scale(18),alignSelf:'center'}
,optionImageNameView:{flexDirection:'row',alignItems:'center'},
optionNameStyle:{fontFamily:FontFamily.regular},
arrowStyle:{height:Scale(20),width:Scale(20)},
optionImageStyle:{marginRight:Scale(10),height:Scale(22),width:Scale(22)}
})