/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { ImageBackground, View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Template1 from '../../../../assets/vexmail/signatureTemplates/dikey/1.jpg'
import Template2 from '../../../../assets/vexmail/signatureTemplates/dikey/2.jpg'
import Template3 from '../../../../assets/vexmail/signatureTemplates/dikey/3.jpg'
import Template4 from '../../../../assets/vexmail/signatureTemplates/dikey/4.jpg'
import Template5 from '../../../../assets/vexmail/signatureTemplates/dikey/5.jpg'
import Template6 from '../../../../assets/vexmail/signatureTemplates/dikey/6.jpg'
import Template7 from '../../../../assets/vexmail/signatureTemplates/yatay/1.jpg'
import Template8 from '../../../../assets/vexmail/signatureTemplates/yatay/2.jpg'
import Template9 from '../../../../assets/vexmail/signatureTemplates/yatay/3.jpg'
import Template10 from '../../../../assets/vexmail/signatureTemplates/yatay/4.jpg'
import Template11 from '../../../../assets/vexmail/signatureTemplates/yatay/5.jpg'
import Template12 from '../../../../assets/vexmail/signatureTemplates/yatay/6.jpg'
import Logo from '../../../../assets/expo_logo_yatay.png'

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const SignatureTemplate = ({tempateId, userDetail}) => { 
  //  console.log(userDetail[0]?.userdetail.user_code);    "mail_imza_id": 19,
//  console.log(userDetail);
const TempId1 = () => {
    return(
        
        <View style={{flexGrow:1, height: HEIGHT/1.90,
   width: WIDTH/1.44,}}>
<ImageBackground style={styles.theImage} source={Template1}>
            {/* Row1 */}
            <View style={{flex:4,  justifyContent:'center', alignItems:'flex-start'}}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14 }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'flex-start'}}><Image style={{ height:70, width:90 }} source={Logo} resizeMode="contain" /></View>
          <View style={{flex:4, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize:9, textTransform: 'uppercase'}}>{(userDetail[0]?.userdetail.company_name)} </Text></View>
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:2,    justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH}}>E </Text><Text style={{fontSize:0.03*WIDTH}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH}}>W </Text><Text style={{fontSize:0.03*WIDTH}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH}}>T </Text><Text style={{fontSize:0.03*WIDTH}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                
            </View>
            

             {/* Row3 */}
            <View style={{flex:7,  justifyContent:'flex-start', alignItems:'flex-start',}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',  marginTop:4}}>
                <Text style={{ fontSize:0.02*WIDTH}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={{ fontSize:0.02*WIDTH,  color:'#6C757D'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            </View>
            </ImageBackground>
             </View>
    
  
    )
}
const TempId2 = () => {
    return(
        <View style={{flexGrow:1,  height: HEIGHT/1.90,
            width: WIDTH/1.44,}}>
        <ImageBackground style={styles.theImage} source={Template2}>
       

            {/* Row1 */}
            <View style={{flex:8, }}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',  flexDirection:'column'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'center', marginRight:10 }}><Image style={{ height:70, width:90, alignSelf:'flex-end' }} source={Logo} resizeMode="contain" /></View>
          <View style={{flex:4, justifyContent:'center', alignItems:'flex-start'}}><Text style={{fontSize:9, textTransform: 'uppercase', color:'white'}}>{(userDetail[0]?.userdetail.company_name)} </Text></View>
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:4,    justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>E </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>W </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>T </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                
            </View>
            

             {/* Row3 */}
            <View style={{flex:10,  justifyContent:'flex-start', alignItems:'flex-start',}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',  marginTop:4}}>
                <Text style={{ fontSize:0.02*WIDTH}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={{ fontSize:0.02*WIDTH,  color:'#6C757D'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            </View>
            </ImageBackground>
             </View>
    
    
    )
}
const TempId3 = () => {
    return(
        
        <View style={{flexGrow:1, height: HEIGHT/1.90,
   width: WIDTH/1.44,}}>
<ImageBackground style={styles.theImage} source={Template3}>
            {/* Row1 */}
            <View style={{flex:5, }}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',  flexDirection:'column'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'center', marginRight:10 }}><Image style={{ height:70, width:90, alignSelf:'flex-end' }} source={Logo} resizeMode="contain" /></View>
          <View style={{flex:4, justifyContent:'center', alignItems:'flex-start'}}><Text style={{fontSize:9, textTransform: 'uppercase', color:'white'}}>{(userDetail[0]?.userdetail.company_name)} </Text></View>
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:4,    justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>E </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>W </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>T </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                
            </View>
            

             {/* Row3 */}
            <View style={{flex:8,  justifyContent:'flex-start', alignItems:'flex-start',}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',  marginTop:4}}>
                <Text style={{ fontSize:0.02*WIDTH}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={{ fontSize:0.02*WIDTH,  color:'#6C757D'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            </View>
            </ImageBackground>
             </View>
    
    
    )
}
const TempId4 = () => {
    return(
       
        <View style={{flexGrow:1, height: HEIGHT/1.90,
   width: WIDTH/1.44,}}>
 <ImageBackground style={styles.theImage} source={Template4}>
            {/* Row1 */}
            <View style={{flex:9, }}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',  flexDirection:'column'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'center', marginRight:10 }}><Image style={{ height:70, width:90, alignSelf:'flex-start' }} source={Logo} resizeMode="contain" /></View>
          <View style={{flex:4, justifyContent:'center', alignItems:'flex-start'}}><Text style={{fontSize:9, textTransform: 'uppercase', color:'white'}}>{(userDetail[0]?.userdetail.company_name)} </Text></View>
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:6,    justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>E </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>W </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>T </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                
            </View>
            

             {/* Row3 */}
            <View style={{flex:11,  justifyContent:'flex-start', alignItems:'flex-start',}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',  marginTop:4}}>
                <Text style={{ fontSize:0.02*WIDTH}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={{ fontSize:0.02*WIDTH,  color:'#6C757D'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            </View>
            </ImageBackground> 
             </View>
    
  
    )
}
const TempId5 = () => {
    return(
       
        <View style={{flexGrow:1, height: HEIGHT/1.90,
   width: WIDTH/1.44,}}>
 <ImageBackground style={styles.theImage} source={Template5}>
            {/* Row1 */}
            <View style={{flex:7, }}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',  flexDirection:'column'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'center', marginRight:10 }}><Image style={{ height:70, width:90, alignSelf:'flex-start' }} source={Logo} resizeMode="contain" /></View>
          <View style={{flex:4, justifyContent:'center', alignItems:'flex-start'}}><Text style={{fontSize:9, textTransform: 'uppercase', }}>{(userDetail[0]?.userdetail.company_name)} </Text></View>
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:6,    justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, }}>E </Text><Text style={{fontSize:0.03*WIDTH, }}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH,}}>W </Text><Text style={{fontSize:0.03*WIDTH, }}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, }}>T </Text><Text style={{fontSize:0.03*WIDTH, }}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                
            </View>
            

             {/* Row3 */}
            <View style={{flex:11,  justifyContent:'flex-start', alignItems:'flex-start',}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',  marginTop:4}}>
                <Text style={{ fontSize:0.02*WIDTH}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={{ fontSize:0.02*WIDTH,  color:'#6C757D'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            </View>
            </ImageBackground>
             </View>
    
    
    )
}
const TempId6 = () => {
    return(
       
        <View style={{flexGrow:1, height: HEIGHT/1.90,
   width: WIDTH/1.44,}}>
 <ImageBackground style={styles.theImage} source={Template6}>
            {/* Row1 */}
            <View style={{flex:5, }}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',  flexDirection:'column'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'center', marginRight:10 }}><Image style={{ height:70, width:90, alignSelf:'flex-start' }} source={Logo} resizeMode="contain" /></View>
          <View style={{flex:4, justifyContent:'center', alignItems:'flex-start'}}><Text style={{fontSize:9, textTransform: 'uppercase', }}>{(userDetail[0]?.userdetail.company_name)} </Text></View>
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:3,    justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, }}>E </Text><Text style={{fontSize:0.03*WIDTH, }}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH,}}>W </Text><Text style={{fontSize:0.03*WIDTH, }}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, }}>T </Text><Text style={{fontSize:0.03*WIDTH, }}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                
            </View>
            

             {/* Row3 */}
            <View style={{flex:11,  justifyContent:'flex-start', alignItems:'flex-start',}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',  marginTop:4}}>
                <Text style={{ fontSize:0.02*WIDTH}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={{ fontSize:0.02*WIDTH,  color:'#6C757D'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</Text>
            </View>
            </View>
            </ImageBackground> 
             </View>
    
   
    )
}
const TempId7 = () => {
    return(
        
        <View style={{flexGrow:1,  height: HEIGHT/5, 
   width: WIDTH/1.44,}}>
<ImageBackground style={styles.horImage} source={Template7}>
            {/* Row1 */}
            <View style={{flex:3, }}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10 }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',  flexDirection:'column'}}>

          <View style={{flex:6, justifyContent:'center', alignItems:'center', marginRight:10 }}><Image style={{ height:70, width:90, alignSelf:'flex-end' }} source={Logo} resizeMode="contain" /></View>
         
               </View>                           
            </View>


             {/* Row2 */}
            <View style={{flex:3,  flexDirection:'row'}}>
                <View style={{flex:2, justifyContent:'center', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white' }}>E </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>W </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white' }}>T </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                </View>
                <View  style={{flex:1,justifyContent:'center', alignItems:'flex-start',}}>
                <Text style={{fontSize:9, textTransform: 'uppercase', color:'white' }}>{(userDetail[0]?.userdetail.company_name)} </Text>
                </View>
                
                
            </View>         
            </ImageBackground>
           </View>
    
 
    )
}
const TempId8 = () => {
    return(
        
        <View style={{flexGrow:1,  height: HEIGHT/5, width: WIDTH/1.4,}}>
<ImageBackground style={styles.horImage} source={Template8}>
            {/* Row1 */}
            <View style={{flex:3,    paddingHorizontal:3}}>
               <View  style={{flex:1, justifyContent:'center', alignItems:'flex-start'}}>
                   <Text style={{fontWeight:'bold', fontSize:14,  color:'white'  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10,  color:'white' }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
               </View>
                                        
            </View>


             {/* Row2 */}
            <View style={{flex:3,  flexDirection:'row',  paddingHorizontal:3}}>
                <View style={{flex:2, justifyContent:'flex-start', alignItems:'flex-start',}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white' }}>E </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white'}}>W </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.04*WIDTH, color:'white' }}>T </Text><Text style={{fontSize:0.03*WIDTH, color:'white'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                </View>
                <View  style={{flex:1,justifyContent:'center', alignItems:'center',}}>
                <Image style={{flex:1, height:70, width:90,}} source={Logo} resizeMode="contain" />
                <Text style={{flex:1, fontSize:9, textTransform: 'uppercase', color:'black' }}>{(userDetail[0]?.userdetail.company_name)} </Text>
                
                </View>
                
                
            </View>         
            </ImageBackground>
           </View>
    
 
    )
}
const TempId9 = () => {
    return(
        
        <View style={{flexGrow:1,  height: HEIGHT/5, width: WIDTH/1.4,}}>
<ImageBackground style={styles.horImage} source={Template9}>
           


             {/* Row1 */}
            <View style={{flex:4,  flexDirection:'row',  paddingHorizontal:3}}>

                 {/* Col1 */}
                   <View style={{justifyContent:'space-around'}}>

                     {/* Row1 */}
                <View style={{}}>
                <Text style={{fontWeight:'bold', fontSize:14,  color:'black'  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10,  color:'black' }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
                   </View>

                   {/* Row2 */}
                   <View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black' }}>E </Text><Text style={{fontSize:0.02*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black'}}>W </Text><Text style={{fontSize:0.02*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black' }}>T </Text><Text style={{fontSize:0.02*WIDTH, color:'black'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                </View>

                </View>


                  {/* Col2 */}
                <View  style={{flex:2,justifyContent:'center', alignItems:'flex-end',}}>
                <Image style={{ height:70, width:90,}} source={Logo} resizeMode="contain" />
                <Text style={{ fontSize:9, textTransform: 'uppercase', color:'black' }}>{(userDetail[0]?.userdetail.company_name)} </Text>
                
                </View>             
                
            </View>      


            </ImageBackground>
           </View>
    
 
    )
}
const TempId10 = () => {
    return(
        
        <View style={{flexGrow:1,  height: HEIGHT/8, width: WIDTH/1.4,}}>
<ImageBackground style={styles.horImage} source={Template10}>
           


             {/* Row1 */}
            <View style={{flex:4,  flexDirection:'row',  paddingHorizontal:3}}>

                 {/* Col1 */}
                   <View style={{justifyContent:'space-between'}}>

                     {/* Row1 */}
                <View style={{}}>
                <Text style={{fontWeight:'bold', fontSize:14,  color:'black'  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:10,  color:'black' }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
                   </View>

                   {/* Row2 */}
                   <View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black' }}>E </Text><Text style={{fontSize:0.02*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black'}}>W </Text><Text style={{fontSize:0.02*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black' }}>T </Text><Text style={{fontSize:0.02*WIDTH, color:'black'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                </View>

                </View>


                  {/* Col2 */}
                <View  style={{flex:2,justifyContent:'center', alignItems:'center', marginLeft:20}}>
                <Image style={{flex:1, height:HEIGHT/10, width:WIDTH/10,}} source={Logo} resizeMode="contain" />
                <Text style={{flex:1, fontSize:9, textTransform: 'uppercase', color:'black' }}>{(userDetail[0]?.userdetail.company_name)} </Text>
                
                </View>             
                
            </View>      


            </ImageBackground>
           </View>
    
 
    )
}
const TempId11 = () => {
    return(
        
        <View style={{flexGrow:1,  height: HEIGHT/6, width: WIDTH/1.4,}}>
<ImageBackground style={styles.horImage} source={Template11}>
           


             {/* Row1 */}
            <View style={{flex:1,  flexDirection:'row',  paddingHorizontal:3}}>

                 {/* Col1 */}
                   <View style={{flex:3, justifyContent:'space-between'}}>

                     {/* Row1 */}
                <View style={{}}>
                <Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black' ,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:0.020*WIDTH,  color:'black' }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
                   </View>

                   {/* Row2 */}
                   <View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.02*WIDTH, color:'black' }}>E </Text><Text style={{fontSize:0.018*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.02*WIDTH, color:'black'}}>W </Text><Text style={{fontSize:0.018*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.02*WIDTH, color:'black' }}>T </Text><Text style={{fontSize:0.018*WIDTH, color:'black'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                </View>

                </View>


                  {/* Col2 */}
                <View  style={{flex:6,justifyContent:'flex-start', alignItems:'center', marginLeft:20, flexDirection: 'row'}}>
                <Image style={{flex:1, height:HEIGHT/12, width:WIDTH/12, }} source={Logo} resizeMode="contain" />
                <Text style={{flex:1, fontSize:9, textTransform: 'uppercase', color:'black' }}>{(userDetail[0]?.userdetail.company_name)} </Text>
                
                </View>             
                
            </View>      


            </ImageBackground>
           </View>
    
 
    )
}
const TempId12 = () => {
    return(
        
        <View style={{flexGrow:1,  height: HEIGHT/6, width: WIDTH/1.4,}}>
<ImageBackground style={styles.horImage} source={Template12}>
           


             {/* Row1 */}
            <View style={{flex:1,  flexDirection:'row',  paddingHorizontal:3}}>

                 {/* Col1 */}
                   <View style={{flex:3, justifyContent:'space-between'}}>

                     {/* Row1 */}
                <View style={{}}>
                <Text style={{fontWeight:'bold', fontSize:0.03*WIDTH, color:'black' ,  }}>{userDetail[0]?.userdetail.name}</Text>
                   <Text style={{fontSize:0.020*WIDTH,  color:'black' }}>{userDetail[0]?.userdetail.job} | {userDetail[0]?.userdetail.title}</Text>
                   </View>

                   {/* Row2 */}
                   <View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}><Text style={{fontWeight:'bold', fontSize:0.02*WIDTH, color:'black' }}>E </Text><Text style={{fontSize:0.018*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.company_mail}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.02*WIDTH, color:'black'}}>W </Text><Text style={{fontSize:0.018*WIDTH, color:'black'}}> {userDetail[0]?.userdetail.social_website}</Text></View>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:0.02*WIDTH, color:'black' }}>T </Text><Text style={{fontSize:0.018*WIDTH, color:'black'}}>  {userDetail[0]?.userdetail.mobilephone}</Text></View>
                </View>

                </View>


                  {/* Col2 */}
                <View  style={{flex:6,justifyContent:'center', alignItems:'flex-end', marginLeft:20, flexDirection: 'column'}}>
                <Image style={{ height:HEIGHT/8, width:WIDTH/8, }} source={Logo} resizeMode="contain" />
                <Text style={{ fontSize:9, textTransform: 'uppercase', color:'black' }}>{(userDetail[0]?.userdetail.company_name)} </Text>
                
                </View>             
                
            </View>      


            </ImageBackground>
           </View>
    
 
    )
}
    if(tempateId===1){
        return (
               <TempId1/>
         )
            }
    if(tempateId===2){
        return (
            <TempId2/>
         )
            }
    if(tempateId===3){
         return (
            <TempId3/>
          )
            }
    if(tempateId===4){
         return (
            <TempId4/>
          )
            }
    if(tempateId===5){
         return (
            <TempId5/>
          )
            }
    if(tempateId===6){
         return (
            <TempId6/>
          )
            }
    if(tempateId===7){
         return (
            <TempId7/>
          )
            }
    if(tempateId===8){
         return (
            <TempId8/>
          )
            }
    if(tempateId===9){
         return (
            <TempId9/>
          )
            }
    if(tempateId===10){
         return (
            <TempId10/>
          )
            }
    if(tempateId===11){
         return (
            <TempId11/>
          )
            }
    if(tempateId===12){
         return (
            <TempId12/>
          )
            }
   


    
    return null
}
export default SignatureTemplate
const styles = StyleSheet.create({
  
    theImage: {
        
        resizeMode: "cover",
        flex:1
        
    },
    horImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        alignSelf:'center'
    }

})