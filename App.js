import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
//import OpenScreen from './screens/OpenScreen';
import SignInnScreen from './screens/SignInnScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import TutorScreen from './screens/TutorScreen';
import FinalScreen from './screens/FinalScreen';
import FinalDetailScreen from './screens/FinalDetailScreen';
import SettingScreen from './screens/SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HelpScreen from './screens/HelpScreen';
import NotificationScreen from './screens/NotificationScreen';
import StudentScreen from './screens/StudentScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';
import TutorDetail from './screens/TutorDetail';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';
const AppStack = createStackNavigator(
  {
    Loading: {screen: LoadingScreen},
    SignIn: {screen: SignInnScreen},
    signup: {screen: SignupScreen},
    TutorDe: {screen: TutorDetail},
    Home: {
      screen: HomeScreen,
    },
    Tutor: {
      screen: TutorScreen,
    },
    Student:{
    screen: StudentScreen,
    },
    StudentDetail:{
      screen:StudentDetailScreen
    },
    Final: {screen: FinalScreen},
    Maps: {
      screen: MapScreen,
      navigationOptions:{
        headerStyle:{
          backgroundColor:'#7a7aff',
          activeTintColor:'#FFFFFF'
        }
      }
    },
    Help:{
      screen: HelpScreen,
      navigationOptions:{headerStyle:{
        backgroundColor:'#7a7aff'
      }}
    },

    Notification:{
      screen:NotificationScreen,
      navigationOption:{
        headerStyle:{
          backgroundColor:'#7a7aff'
        }
      }
    },

    FinalDetail:{
      screen:FinalDetailScreen,
      navigationOption:{
        headerStyle:{
          backgroundColor:'#7a7aff'
        }
      }
    },

    Chat:{
      screen:ChatScreen,
      navigationOption:{
        headerStyle:{
          backgroundColor:'#7a7aff'
        }
      }
    },

  },
 
  {
    initialRouteName: 'signup',
  },
  {
    headerLayoutPreset:"center"
  }
)




const SettingNavigator=createStackNavigator({
  setting:SettingScreen
},
{
  navigationOptions:{
    drawerLabel:'Settings',
    drawerIcon:()=>(
      <Ionicons name="ios-settings" size={25} color="#7a7aff" />
    )
  }
}
)
const HomeNavigator=createStackNavigator({
  Home:HomeScreen
},
{
  navigationOptions:{
    drawerLabel:'Home',
    drawerIcon:()=>(
      <FontAwesome name="home" size={25} color="#7a7aff" />
    )
  }
}
)

const HelpNavigator=createStackNavigator({
  Help:HelpScreen
},
{
  navigationOptions:{
    drawerLabel:'Help',
    drawerIcon:()=>(
      <Ionicons name="ios-help-circle" size={25} color="#7a7aff" />
    )
  }
}
)

const drawer = createDrawerNavigator({
  AppStack: {
    screen: AppStack,
  },
  Home:HomeNavigator,
  setting:SettingNavigator,
  Help:HelpNavigator
},
  {
    contentOptions:{
      activeTintColor:'#7a7aff',
      labelStyle:{
        fontFamily: 'open-sans-bold'
      }
    }
  
});

const BottomNavigator = createBottomTabNavigator({
  dra:drawer,
  Home:{screen:HomeScreen, navigationOptions:{
    tabBarIcon: (tabInfo)=>{
      return <Ionicons name="md-home" size={25} color='#7a7aff'/>
    }
  }},
  app:{screen:AppStack, navigationOptions:{
    tabBarIcon: (tabInfo)=>{
      return <Ionicons name='ios-notifications' size={25} color='#7a7aff'/>
    }
  }},
  Notification: {screen: NotificationScreen, navigationOptions: {
    tabBarIcon: (tabInfo)=>{
      return <Ionicons name='ios-star' size={25} color='#7a7aff'/>
    }
  }},
 // Chat:{screen:ChatScreen, navigationOptions:{
   // tabBarIcon:(tabInfo)=>{
     // return <Ionicons name='ios-chatbubbles' size={25} color='#7a7aff' />
    //}
  //}}
},
{
  tabBarOptions:{
    activeTintColor:'#7a7aff'
  }
}
)
const App = createAppContainer(BottomNavigator);
export default App;
