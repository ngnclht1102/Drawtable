import _ from 'lodash';

export const randomizeTeamToTable = (
  teams: Array<string>,
  numberOfTables: number,
): Array<{name: string; teams: Array<string>}> => {
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
            : Math.abs(Math.floor(Math.random() * clonedTeams.length - 1)) + 0;
        randomTeam = _.clone(clonedTeams[randomInt]);

        if (randomTeam) {
          if (!localGroupedTeams[i]) localGroupedTeams[i] = [];
          localGroupedTeams[i].push(randomTeam);
          clonedTeams.splice(randomInt, 1);
        }
      }
    }
  }
  return localGroupedTeams;
};
