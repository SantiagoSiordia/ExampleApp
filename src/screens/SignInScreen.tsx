import { useFormik } from 'formik';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import { BackgroundDesign, Input, save, SubmitButton } from '..';

export const SignInScreen: FC = () => {
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
