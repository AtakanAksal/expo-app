import React from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

function myTask() {
    try {
      // fetch data here...
      const backendData = `Simulated fetch ${  Math.random()}`;
      console.log("myTask() ", backendData);
      return backendData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData;
    } catch (err) {
      return BackgroundFetch.Result.Failed;
    }
  }

const BackgroundTaskJob = () =>{
    
}

export default BackgroundTaskJob ;