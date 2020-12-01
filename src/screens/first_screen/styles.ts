import {StyleSheet, Platform} from 'react-native';
import {rH, rW, screenInfo} from '@/configs/metrics.config';
import colors from '@/configs/colors.config';

const HOZ_SPACING = rH(40);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: screenInfo.height,
    width: '100%',
    backgroundColor: colors.lightGray,
    alignItems: 'center',
  },
  container: {
    padding: HOZ_SPACING,
    // backgroundColor: colors.red,
    ...Platform.select({
      web: {
        maxWidth: 1024,
        height: screenInfo.height,
      },
      native: {
        flex: 1,
      },
    }),
  },
  title: {
    color: '#009383',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: rH(20),
    marginBottom: rH(20),
  },
  startChangeNumberOfTablesText: {
    color: '#928F8F',
    fontSize: rH(14),
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: rH(5),
  },
  textInput: {
    color: '#928F8F',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '50%',
    paddingHorizontal: rW(5),
    paddingVertical: rH(10),
    marginRight: rW(10),
  },
  addButton: {
    backgroundColor: '#009383',
    marginRight: rW(10),
  },
  randomButton: {
    backgroundColor: '#009383',
  },
  button: {
    borderRadius: rH(5),
    justifyContent: 'center',
    paddingHorizontal: rH(5),
    paddingVertical: rH(5),
  },
  addButtonText: {
    color: 'white',
  },
});

export default styles;
