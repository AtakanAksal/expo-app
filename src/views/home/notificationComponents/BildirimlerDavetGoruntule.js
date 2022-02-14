/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { StyleSheet,Text, View, Image, Dimensions, TouchableOpacity, ImageBackground,   } from "react-native";
import { useNavigation } from "@react-navigation/native";



import LogoYatay from "../../../../assets/expo_logo_yatay.png";
import Davetiye1 from "../../../../assets/notification/davetiyeler/bir.jpg"
import Davetiye2 from "../../../../assets/notification/davetiyeler/2.jpg"
import Davetiye3 from "../../../../assets/notification/davetiyeler/3.jpg"
import Davetiye4 from "../../../../assets/notification/davetiyeler/4.jpg"
import Davetiye5 from "../../../../assets/notification/davetiyeler/5.jpg"
import Davetiye6 from "../../../../assets/notification/davetiyeler/6.jpg"
import Davetiye7 from "../../../../assets/notification/davetiyeler/7.jpg"
import Davetiye8 from "../../../../assets/notification/davetiyeler/8.jpg"
import Davetiye9 from "../../../../assets/notification/davetiyeler/9.jpg"
import Davetiye10 from "../../../../assets/notification/davetiyeler/10.jpg"
import Davetiye11 from "../../../../assets/notification/davetiyeler/11.jpg"
import Davetiye12 from "../../../../assets/notification/davetiyeler/12.jpg"
import Davetiye13 from "../../../../assets/notification/davetiyeler/13.jpg"
import Davetiye14 from "../../../../assets/notification/davetiyeler/14.jpg"
import Davetiye15 from "../../../../assets/notification/davetiyeler/15.jpg"
import Davetiye16 from "../../../../assets/notification/davetiyeler/16.jpg"
import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";


const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const BildirimlerDavetGoruntule = ({setActiveState, onProcessItem}) => {
  const nav = useNavigation();
  console.log(HEIGHT);
  console.log(WIDTH);
  console.log("BildirimlerDavetGoruntule");
  console.log(onProcessItem);
  console.log();
  
 
    return(
      <View style={styles.mainFrame}>

 
          <Templates templateNo={onProcessItem.notifiable.invite_template}  onProcessItem={onProcessItem} />

           <View style={styles.row}>                 
           <TouchableOpacity onPress={() => nav.navigate("OtherProfile", {userID: onProcessItem.sender_user.id})}><Text style={styles.textStyle}>Profili İncele</Text></TouchableOpacity> 
           <TouchableOpacity onPress={()=>setActiveState("bildirimler-davet-yayınbilgisi")}><Text style={styles.textStyle}>Yayın Bilgisini Gör</Text></TouchableOpacity>
           </View>

           <View style={styles.row}>
            <TouchableOpacity style={ styles.mainButton} onPress={()=>setActiveState("bildirimler-davet-stantseciniz")} >
              <Text style={styles.mainButtonText }>
                Başvur
              </Text>
            </TouchableOpacity>
           </View>      
          
                   
     
       </View>
    )
  }
  export default BildirimlerDavetGoruntule;
  const styles = StyleSheet.create({
    row:{
      marginBottom:10, marginHorizontal:10, flexDirection:"row", backgroundColor:'white', justifyContent:'space-between',
   }, 
   textStyle: {
     color:'#6C757D',
     fontSize:12,
     margin:10, 
     fontStyle:'italic'
  },
  mainFrame : {
    flex:1,
   margin: 20,

   
 },
 mainButton: {
  borderWidth: 0.5,
  borderColor: "#00AA9F",
  alignItems: "center",
  justifyContent: "center",
  elevation: 6,
  width: '100%',
  height: 33,
  backgroundColor: "#00AA9F",
},
mainButtonText: {
  color: "#FFFFFF",
  fontSize: 15,
},
  })

  const Templates = ({onProcessItem, templateNo}) => {

    switch (templateNo) {
      case 1:
        return <Template1 onProcessItem={onProcessItem} />;
      case 2:
        return  <Template2 onProcessItem={onProcessItem}/>;
      case 3:
        return  <Template3 onProcessItem={onProcessItem}/>;
      case 4:
        return <Template4 onProcessItem={onProcessItem}/>;
      case 5:
        return  <Template5 onProcessItem={onProcessItem}/>;
      case 6:
        return  <Template6 onProcessItem={onProcessItem}/>;
      case 7:
        return <Template7 onProcessItem={onProcessItem}/>;
      case 8:
        return  <Template8 onProcessItem={onProcessItem}/>;
      case 9:
        return  <Template9 onProcessItem={onProcessItem}/>;
      case 10:
        return <Template10 onProcessItem={onProcessItem}/>;
      case 11:
        return  <Template11 onProcessItem={onProcessItem}/>;
      case 12:
        return  <Template12 onProcessItem={onProcessItem}/>;
      case 13:
        return <Template13 onProcessItem={onProcessItem}/>;
      case 14:
        return  <Template14 onProcessItem={onProcessItem}/>;
      case 15:
        return  <Template15 onProcessItem={onProcessItem}/>;
      case 16:
        return <Template16 onProcessItem={onProcessItem}/>;

      default:
        return <Template1/>;
    }
  };
  const Template1 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye1} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 50,    }}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D',  }}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name} </Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 140,}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 210,}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name} </Text>
           <Text  style={{fontSize:10,}}> {onProcessItem.sender_user_detail.full_institution_name} </Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 250,}}>
         <Image style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template2 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20, alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye2} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',  position: 'absolute',  top: 30,}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100,}}>
          <Text style={{fontStyle:'italic', color:'white'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'white'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top:190,}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 240,}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 

      </ImageBackground>
      </View>
    )
  }
  const Template3 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye3} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'black'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'black'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'black'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template4 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye4} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'black'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'black'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'black'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template5 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye5} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'black'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'black'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'black'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template6 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye6} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'black'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'black'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'black'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template7 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye7} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template8 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1 }}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye8} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 60 }}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 140}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>


         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 250}}>
           <Text  style={{fontSize:12, fontWeight:'bold', color:'white'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10 , color:'white'}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         


      </ImageBackground>
      </View>
    )
  }
  const Template9 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1 }}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center',alignItems:'center', flex:1}} source={Davetiye9} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 50}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 140}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 250}}>
           <Text  style={{fontSize:12, fontWeight:'bold', color:'white'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,  color:'white'}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

      </ImageBackground>
      </View>
    )
  }
  const Template10 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1 }}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye10} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template11 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1 }}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center',alignItems:'center', flex:1}} source={Davetiye11} resizeMode="contain" >
      
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 40}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 120 }}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 170}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 230 }}>
           <Text  style={{fontSize:12, fontWeight:'bold', color:'white'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10, color:'white'}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

      </ImageBackground>
      </View>
    )
  }
  const Template12 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1 }}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye12} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 40}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 120}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 170}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 230}}>
           <Text  style={{fontSize:12, fontWeight:'bold', color:'white'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10 , color:'white'}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

      </ImageBackground>
      </View>
    )
  }
  const Template13 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye13} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'white'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'white'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'white'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template14 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1}} source={Davetiye14} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'white'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'white'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'white'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 190}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 240}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
  const Template15 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1 }}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1, }} source={Davetiye15} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 70}}>
           <Text style={{alignSelf:'flex-start', color:'#6C757D'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 140}}>
          <Text style={{fontStyle:'italic'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 190}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 260}}>
           <Text  style={{fontSize:12, fontWeight:'bold', color:'white'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10 , color:'white'}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

      </ImageBackground>
      </View>
    )
  }
  const Template16 = ({onProcessItem}) => {
    return (
      <View style={{marginVertical:20,  alignItems:'center', flex:1,}}>
      <ImageBackground style={{height: 312 , width: 260, justifyContent:'center', alignItems:'center', flex:1,  }} source={Davetiye16} resizeMode="contain" >
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 30}}>
           <Text style={{alignSelf:'flex-start', color:'white'}}>Sayın</Text>
           <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>{onProcessItem.receiver_user.first_name} {onProcessItem.receiver_user.last_name}</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 100}}>
          <Text style={{fontStyle:'italic', color:'white'}}>Yayınımıza Ziyaretinizden</Text>
          <Text style={{fontStyle:'italic', color:'white'}}> Mutluluk Duyacağız</Text>
         </View>

         <View style={{justifyContent:'center', alignItems:'center',position: 'absolute',  top: 200}}>
           <Text  style={{fontSize:12, fontWeight:'bold'}}>{onProcessItem.sender_user.first_name} {onProcessItem.sender_user.last_name}</Text>
           <Text  style={{fontSize:10,}}>{onProcessItem.sender_user_detail.full_institution_name}</Text>
         </View>

        
         <View style={{justifyContent:'center', alignItems:'center', position: 'absolute',  top: 260}}>
         <ImageBackground style={{height:40 , width:70, justifyContent:'center', alignItems:'center'}} source={LogoYatay} resizeMode="contain"/>
         </View> 


      </ImageBackground>
      </View>
    )
  }
