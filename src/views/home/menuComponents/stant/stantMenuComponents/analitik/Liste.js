import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import ListeItem from "./ListeItem";

const Liste = ({isFiltered, analaticState, streamData, }) => {
    const tempData = (Object.values(streamData))
    
    const defineCountName = () => {   
        switch (analaticState) {
            case "Ülke":
              return "country_count";
            case "Sektör":
              return "sector_count";
            case "Etkileşim":
              return "sector_count";
            case "Gün":
              return "sector_count";
            case "KullanıcıTürü":
              return "role_count";
            case "Cinsiyet":
              return "gender_type_count";
              default:
                return "";
            }
    }   
    const count=defineCountName();

    return (
        <View style={styles.container} >
           
            <FlatList
            data={
              (isFiltered)? tempData.sort((a, b) => { return b?.[count] - a?.[count]; }) : tempData.slice(1).sort((a, b) => { return b?.[count] - a?.[count]; })
               
            } //  dummyArray
            // Item Separator View
            renderItem={ ({item})=><ListeItem item={item} analaticState={analaticState} />}
            keyExtractor={(item, index) => index.toString()}
          //  ListHeaderComponent={headerComponent}
            showsVerticalScrollIndicator={false}
            // getItemLayout={(data, index) => {
            //   return {
            //     index,
            //     length: 60, // itemHeight is a placeholder for your amount
            //     offset: index * 60,
            //   };          }}
          />
        
        </View>
    );
}

export default Liste;
const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFFFFF",
    },
   
})