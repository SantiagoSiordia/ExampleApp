import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { PaymentScreen, SignInScreen, StatusScreen } from './src';

const Tab = createBottomTabNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="login" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="payment" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Status"
          component={StatusScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="data-usage" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
