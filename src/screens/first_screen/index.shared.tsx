import React, {useState, useEffect, useCallback} from 'react';
import * as t from '@/actionTypes';
import actions from '@/actions';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import images from '@/assets/images';
import colors from '@/configs/colors.config';
import Team from './components/team';
import styles from './styles';

const FirstScreenShared = () => {
  const [numberOfTables, setNumberOfTables] = useState<number>(2);
  const [editingNumberOfTables, setEditingNumberOfTables] = useState<boolean>(
    false,
  );
  const [teamTextInputValue, setTeamTextInputValue] = useState<string>('');
  const [numberOfTeamInputValue, setNumberOfTeamInputValue] = useState<string>(
    `${numberOfTables}`,
  );
  const [teams, setTeams] = useState<Array<string>>([]);
  const [groupedTeams, setGroupedTeams] = useState<
    Array<{name: string; teams: Array<string>}>
  >([]);

  const randomize = useCallback(() => {
    const minimumQuantityOfEachTable = teams.length / numberOfTables;
    for (let i = 0; i < numberOfTables; i++) {
      const element = array[i];
    }
  }, [teams, numberOfTables]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
      <View style={styles.container}>
        <Text style={styles.title}>Drawtable by Brian Nam Nguyen</Text>

        <View style={styles.textInputContainer}>
          <TextInput
            value={teamTextInputValue}
            onChangeText={setTeamTextInputValue}
            placeholder="Enter name of team"
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={() => {
              const newteams = _.clone(teams);
              newteams.push(teamTextInputValue);
              setTeams(newteams);
            }}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.addButtonText}>Add team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const newteams = _.clone(teams);
              newteams.push(teamTextInputValue);
              setTeams(newteams);
            }}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.addButtonText}>Random table</Text>
          </TouchableOpacity>
        </View>

        {editingNumberOfTables ? (
          <View style={styles.textInputContainer}>
            <TextInput
              value={numberOfTeamInputValue}
              placeholder="How many tables?"
              keyboardType="number-pad"
              style={styles.textInput}
              onChangeText={(text: string) =>
                setNumberOfTeamInputValue(`${parseInt(text, 10) || 2}`)
              }
            />
            <TouchableOpacity
              onPress={() => {
                if (!numberOfTeamInputValue)
                  alert('Please enter number of tables you want to devide');
                setNumberOfTables(parseInt(numberOfTeamInputValue, 10));
                setEditingNumberOfTables(false);
              }}
              style={[styles.button, styles.addButton]}>
              <Text style={styles.addButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setEditingNumberOfTables(true)}>
            <Text style={styles.startChangeNumberOfTablesText}>
              Team will be devided to {`${numberOfTables}`} tables. Press here
              to changes!
            </Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={teams}
          numColumns={2}
          renderItem={({item, index}) => <Team key={index} name={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default FirstScreenShared;
