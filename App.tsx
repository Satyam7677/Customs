/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import Router from "./src/router";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
export default function App() {
  return (

    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={{flexGrow:1}} style={{}}>
    
     <View style={{height:50,width:50, backgroundColor:'yellow'}}/>
     <TextInput
     value='is'
     onChangeText={()=>{}}
     />
     <View style={{flexGrow:1}}/>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'position':'height'} shouldRasterizeIOS>
      <View style={{height:100, width:100, backgroundColor:'blue', marginBottom:20}}/>
      </KeyboardAvoidingView>
    
    </ScrollView>   
    </SafeAreaView>
   
  );
}
