import { Layout, Spinner, Text } from '@ui-kitten/components';
import React from 'react';

import styles from './styles/loading.scss';
interface Props {
  fullHeight?: boolean;
  size?: string;
}

const Loading = ({ fullHeight = true, size = 'large' }: Props) => {
  return (
    <Layout style={[fullHeight ? styles.loadingfullscreen : styles.loading]}>
      <Text>
        <Spinner size={size} status="primary" />
      </Text>
    </Layout>
  );
};

export default Loading;
