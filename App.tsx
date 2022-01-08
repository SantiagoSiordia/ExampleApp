import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useFormik } from 'formik';
import React, { ComponentProps, FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import * as Yup from 'yup';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

const BackgroundDesign: FC = () => {
  return (
    <View style={backgroundStyles.edge}>
      <View style={backgroundStyles.firstBall} />
      <View style={backgroundStyles.secondBall} />
    </View>
  );
};

type InputProps = TextInputProps & {
  icon: MaterialIconName;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
};

const Input: FC<InputProps> = ({
  icon,
  name,
  placeholder = null,
  error = false,
  errorMessage,
  ...props
}) => {
  return (
    <View style={formStyles.container}>
      <Text
        style={StyleSheet.flatten([
          formStyles.label,
          error ? formStyles.errorTextColor : {},
        ])}>
        {name}
      </Text>
      <View
        style={StyleSheet.flatten([
          formStyles.inputContainer,
          error ? formStyles.inputContainerError : {},
        ])}>
        <View style={formStyles.iconContainer}>
          <MaterialIcons
            name={icon}
            size={24}
            color={error ? '#c42348' : 'black'}
          />
        </View>
        <TextInput
          style={StyleSheet.flatten([
            formStyles.input,
            error ? formStyles.errorTextColor : {},
          ])}
          placeholder={placeholder ?? name}
          placeholderTextColor="#75757F"
          {...props}
        />
      </View>
      {error && (
        <Text style={formStyles.errorMessage}>Error: {errorMessage}</Text>
      )}
    </View>
  );
};

type SubmitButtonProps = TouchableOpacityProps & {
  text: string;
};

const SubmitButton: FC<SubmitButtonProps> = ({ text, ...props }) => {
  return (
    <View style={buttonStyles.container}>
      <TouchableOpacity
        style={StyleSheet.flatten([
          buttonStyles.button,
          {
            backgroundColor: props.disabled
              ? 'rgba(80, 113, 175, 0.4)'
              : 'rgb(80, 113, 175)',
          },
        ])}
        activeOpacity={0.7}
        {...props}>
        <Text style={buttonStyles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const save = async (key: string, value: Record<string, any>) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const getValueFor = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

const SignInScreen: FC = () => {
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .email('Must be a valid email address'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(25, 'Too Long!')
      .matches(/[A-Za-z]/, 'Only latin characters')
      .required('Required'),
  });

  const signInForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => save('user', values),
    validationSchema: SigninSchema,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sweeter</Text>
      <Text style={styles.subtitleText}>Sign in</Text>
      <Input
        icon="mail-outline"
        name="Email"
        value={signInForm.values.email}
        onChangeText={signInForm.handleChange('email')}
        onBlur={signInForm.handleBlur('email')}
        error={signInForm.touched.email && !!signInForm.errors.email}
        errorMessage={signInForm.errors.email}
      />
      <Input
        icon="vpn-key"
        name="Password"
        value={signInForm.values.password}
        onChangeText={signInForm.handleChange('password')}
        onBlur={signInForm.handleBlur('password')}
        error={signInForm.touched.password && !!signInForm.errors.password}
        errorMessage={signInForm.errors.password}
      />
      <SubmitButton
        text="Sign in"
        onPress={signInForm.handleSubmit}
        disabled={!signInForm.isValid}
      />
      <BackgroundDesign />
    </View>
  );
};

const PaymentScreen: FC = () => {
  const paymentForm = useFormik({
    initialValues: {
      card: '',
      name: '',
      date: '',
      cvv: '',
    },
    onSubmit: values => save('user', values),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subtitleText}>Payment</Text>
      <Input
        icon="credit-card"
        name="Card number"
        onChangeText={paymentForm.handleChange('card')}
        value={paymentForm.values.card}
      />
      <Input
        icon="person"
        name="Full name"
        onChangeText={paymentForm.handleChange('name')}
        value={paymentForm.values.name}
      />
      <Input
        icon="date-range"
        name="Expiry date"
        placeholder="mm/yy"
        onChangeText={paymentForm.handleChange('date')}
        value={paymentForm.values.date}
      />
      <Input
        icon="vpn-key"
        name="CVV"
        onChangeText={paymentForm.handleChange('cvv')}
        value={paymentForm.values.cvv}
      />
      <SubmitButton text="Pay" onPress={paymentForm.handleSubmit} />
      <BackgroundDesign />
    </View>
  );
};

const StatusScreen: FC = () => {
  const [user, setUser] = useState<null | string>(null);
  const [card, setCard] = useState<null | string>(null);
  const [status, setStatus] = useState<string>('loading');

  const getStatus = async () => {
    try {
      setStatus('loading');
      const securedUser = await getValueFor('user');
      const securedCard = await getValueFor('card');
      setUser(securedUser);
      setCard(securedCard);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Status</Text>
      <Text>User</Text>
      <Text>{status === 'loading' ? 'loading' : user}</Text>
      <Text>Card</Text>
      <Text>{status === 'loading' ? 'loading' : card}</Text>
    </View>
  );
};

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

const backgroundStyles = StyleSheet.create({
  firstBall: {
    backgroundColor: '#5071AF',
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    position: 'absolute',
    top: -33,
    left: -40,
    zIndex: -1,
  },
  secondBall: {
    backgroundColor: '#4EA8DB',
    width: 272,
    height: 272,
    borderRadius: 272 / 2,
    position: 'absolute',
    top: -65,
    right: -34,
    zIndex: -1,
  },
  edge: {
    width: '100%',
    height: '100%',
    borderColor: '#4EA8DB',
    borderWidth: 4,
    position: 'absolute',
    zIndex: -1,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
  },
  titleText: {
    fontSize: 60,
    textAlign: 'center',
    color: 'black',
  },
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginBottom: 32,
  },
});

const formStyles = StyleSheet.create({
  container: {
    marginHorizontal: 48,
    marginBottom: 8,
  },
  label: {
    color: 'black',
    fontSize: 12,
    marginLeft: 15,
  },
  inputContainer: {
    backgroundColor: '#A5D1FA',
    height: 30,
    borderRadius: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  iconContainer: {
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
  },
  errorMessage: {
    color: '#c42348',
    fontSize: 12,
    marginLeft: 15,
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: '#c42348',
  },
  errorTextColor: {
    color: '#c42348',
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    marginHorizontal: 48,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    marginTop: 32,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default App;
