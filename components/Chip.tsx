import { Layout, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import styles from './styles/chip.scss';
interface Props {
  image?: string | null;
  title: string;
}

const Chip = ({ image = null, title }: Props) => {
  const theme = useTheme();
  const sstyles = StyleSheet.create({
    chip: {
      backgroundColor: theme['background-basic-color-3'],
    },
  });

  return <Text style={[styles.chip, sstyles.chip]}>{title}</Text>;
};

export default Chip;
