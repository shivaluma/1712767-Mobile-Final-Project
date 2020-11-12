import { Layout, Text, useTheme } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

import styles from './styles/chip.scss';
interface Props {
  image?: string | null;
  title: string;
  accessoryLeft?: () => ReactElement | null;
  accessoryRight?: () => ReactElement | null;
}

const Chip = ({
  image = null,
  title,
  accessoryLeft = () => null,
  accessoryRight = () => null,
}: Props) => {
  const theme = useTheme();
  const sstyles = StyleSheet.create({
    chip: {
      backgroundColor: theme['color-basic-transparent-300'],
    },
  });

  return (
    <Layout style={[styles.chip, sstyles.chip]}>
      {accessoryLeft()}
      <Text style={[styles.chiptext]}>{title}</Text>
      {accessoryRight()}
    </Layout>
  );
};

export default Chip;
