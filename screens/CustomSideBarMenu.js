import React,{Component} from "react";
import {SafeAreaView, View, StyleSheet,Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import firebase from 'firebase'
import { DrawerContentScrollView,DrawerItemList } from "@react-navigation/drawer";

export default class CustomSideBarMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
          light_theme: true,
        };
      }
  
      componentDidMount() {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function (snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({ light_theme: theme === "light" ? true : false });
      }
  render(){
        return(
            <View style={{flex:1,backgroundColor:this.state.light_theme?"white":"#15193c"}}>
             <Image source={require("../assets/logo.png")} style={{width:RFValue(140), height:RFValue(140),
              borderRadius:RFValue(70), alignSelf:'center', marginTop:RFValue(60), resizeMode:'contain'}}>

                </Image>
                <DrawerContentScrollView {...props}>
                      <DrawerItemList {...props}></DrawerItemList>
                </DrawerContentScrollView>
            </View>
        )
      }
      
}