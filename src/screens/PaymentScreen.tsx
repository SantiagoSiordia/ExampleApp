import valid from 'card-validator';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import { BackgroundDesign, Input, save, SubmitButton } from '..';

export const PaymentScreen: FC = () => {
  const PaymentSchema = Yup.object().shape({
    card: Yup.string().test(
      'test-number',
      'Credit Card number is invalid',
      number => valid.number(number).isValid,
    ),
    name: Yup.string().test(
      'test-name',
      'Name is invalid',
      name => valid.cardholderName(name).isValid,
    ),
    date: Yup.string().test(
      'test-date',
      'Expiration date is invalid',
      date => valid.expirationDate(date).isValid,
    ),
    cvv: Yup.string().test(
      'test-date',
      'CVV is invalid',
      cvv => valid.cvv(cvv).isValid,
    ),
  });

  const paymentForm = useFormik({
    initialValues: {
      card: '',
      name: '',
      date: '',
      cvv: '',
    },
    onSubmit: values => save('card', values),
    validationSchema: PaymentSchema,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subtitleText}>Payment</Text>
      <Input
        icon="credit-card"
        name="Card number"
        onChangeText={paymentForm.handleChange('card')}
        value={paymentForm.values.card}
        onBlur={paymentForm.handleBlur('card')}
        error={paymentForm.touched.card && !!paymentForm.errors.card}
        errorMessage={paymentForm.errors.card}
      />
      <Input
        icon="person"
        name="Full name"
        onChangeText={paymentForm.handleChange('name')}
        value={paymentForm.values.name}
        onBlur={paymentForm.handleBlur('name')}
        error={paymentForm.touched.name && !!paymentForm.errors.name}
        errorMessage={paymentForm.errors.name}
      />
      <Input
        icon="date-range"
        name="Expiry date"
        placeholder="mm/yy"
        onChangeText={paymentForm.handleChange('date')}
        value={paymentForm.values.date}
        onBlur={paymentForm.handleBlur('date')}
        error={paymentForm.touched.date && !!paymentForm.errors.date}
        errorMessage={paymentForm.errors.date}
      />
      <Input
        icon="vpn-key"
        name="CVV"
        onChangeText={paymentForm.handleChange('cvv')}
        value={paymentForm.values.cvv}
        onBlur={paymentForm.handleBlur('cvv')}
        error={paymentForm.touched.cvv && !!paymentForm.errors.cvv}
        errorMessage={paymentForm.errors.cvv}
      />
      <SubmitButton
        text="Pay"
        onPress={paymentForm.handleSubmit}
        disabled={!paymentForm.isValid}
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
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginBottom: 32,
  },
});
