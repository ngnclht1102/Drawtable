import {StyleSheet, Platform} from 'react-native';
import {rH, rW, screenInfo} from '@/configs/metrics.config';
import colors from '@/configs/colors.config';

const SPACING = rH(30);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EEEE',
    width: '47%',
    borderRadius: rH(10),
    margin: rH(5),
    padding: SPACING,
    ...Platform.select({
      web: {
        // maxWidth: 1024,
        // height: screenInfo.height,
      },
      native: {
        // width: '47%',
      },
    }),
  },
  title: {
    color: '#585858',
    textAlign: 'center',
    fontSize: rH(15),
  },
});

export default styles;
