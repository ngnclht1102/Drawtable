import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import colors from '@/configs/colors.config';
import styles from './styles';
import Team from './components/team';
import {numberToLetter} from '@/utils/numberToLetter';
import {randomizeTeamToTable} from './logic/randomize';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const prepareNextLayoutAnimation = () => {
  if (Platform.OS == 'web') return;
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

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
    prepareNextLayoutAnimation();
    setGroupedTeams(randomizeTeamToTable(teams, numberOfTables));
  }, [teams, numberOfTables]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
      <View style={styles.container}>
        <View style={styles.withPadding}>
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
                prepareNextLayoutAnimation();
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
                Teams will be devided to {`${numberOfTables}`} tables. Press
                here to changes!
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.withPadding}>
            {groupedTeams && groupedTeams.length ? (
              groupedTeams.map((teams: any, index) => (
                <View>
                  <Text style={styles.groupLabel}>
                    Group {numberToLetter(index)}
                  </Text>

                  <FlatList
                    scrollEnabled={false}
                    data={teams}
                    numColumns={2}
                    keyExtractor={(item, index) => item.name + index}
                    renderItem={({item, index}) => (
                      <Team key={index} name={item} />
                    )}
                  />
                </View>
              ))
            ) : (
              <FlatList
                scrollEnabled={false}
                data={teams}
                numColumns={2}
                renderItem={({item, index}) => <Team key={index} name={item} />}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FirstScreenShared;
