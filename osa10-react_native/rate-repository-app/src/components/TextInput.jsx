import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({error: {
  borderWidth: 1 ,
  borderColor: theme.colors.error,
}});

const TextInput = ({ style, error, ...props }) => {
  const errorStyle = error ? styles.error : null;
  const textInputStyle = [style, errorStyle];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;