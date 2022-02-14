import React, {  } from "react";
import {
  Image
} from "react-native";



import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";
import CheckIcon from "../../../../assets/check-icon.png";
import ErrorIcon from "../../../../assets/error-icon.png";


const WarningImages = ({warning, text}) => {
    if(warning!==""){return(
    <Image
                  style={{ height: relativeHeightNum(35), width: relativeWidthNum(35) }}
                  resizeMode="center"
                  source={ErrorIcon}
                />
    )
    }
    if( text.length>1){  
      return(
        <Image
                  style={{ height: relativeHeightNum(35), width: relativeWidthNum(35) }}
                  resizeMode="center"
                  source={CheckIcon}
                />
      )
    }
    return null
    }
    export default WarningImages;