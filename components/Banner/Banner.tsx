import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

import styles from './banner.scss';
interface Props {
  name: string;
  isSmall?: boolean;
}

const Banner = ({ name, isSmall = false }: Props) => {
  return (
    <Layout style={isSmall ? styles.smallbanner : styles.banner}>
      <Text>{name}</Text>
    </Layout>
  );
};

export default Banner;
