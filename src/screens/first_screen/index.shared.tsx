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
import styles from './styles';
import Team from './components/team';

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
    const clonedTeams: any = _.clone(teams);
    const localGroupedTeams: any = [];
    const minimumQuantityOfEachTable = teams.length / numberOfTables;
    console.log(minimumQuantityOfEachTable);

    for (let i = 0; i < numberOfTables; i++) {
      for (let j = 0; j < minimumQuantityOfEachTable; j++) {
        let randomTeam = undefined;
        while (!randomTeam && clonedTeams.length > 0) {
          const randomInt =
            clonedTeams.length === 1
              ? 0
              : Math.abs(Math.floor(Math.random() * clonedTeams.length - 1)) +
                0;
          randomTeam = _.clone(clonedTeams[randomInt]);

          if (randomTeam) {
            if (!localGroupedTeams[i]) localGroupedTeams[i] = [];
            localGroupedTeams[i].push(randomTeam);
            clonedTeams.splice(randomInt, 1);
          }
        }
      }
    }

    setGroupedTeams(localGroupedTeams);
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
              setGroupedTeams([]);
              setTeams(newteams);
              setTeamTextInputValue('');
            }}
            disabled={!teamTextInputValue}
            style={[
              styles.button,
              styles.addButton,
              !teamTextInputValue && styles.disabledButton,
            ]}>
            <Text style={styles.addButtonText}>Add team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={randomize}
            disabled={numberOfTables > teams.length}
            style={[
              styles.button,
              styles.addButton,
              numberOfTables > teams.length && styles.disabledButton,
            ]}>
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
              Teams will be devided to {`${numberOfTables}`} tables. Press here
              to changes!
            </Text>
          </TouchableOpacity>
        )}

        {groupedTeams && groupedTeams.length ? (
          groupedTeams.map((teams) => (
            <>
              <Text style={styles.groupLabel}>Group</Text>
              <FlatList
                data={teams}
                numColumns={2}
                renderItem={({item, index}) => <Team key={index} name={item} />}
              />
            </>
          ))
        ) : (
          <FlatList
            data={teams}
            numColumns={2}
            renderItem={({item, index}) => <Team key={index} name={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FirstScreenShared;
