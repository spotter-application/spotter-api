declare var process : {
  argv: Array<string>;
}

const inputCommand = process.argv[2];
const inputQuery = process.argv.splice(3).join(' ');

export default {
  onQuery: (query: string) => {

    return {
      output: (callback: (query: string) => void) => {
        if (inputCommand !== 'query' || !inputQuery || !query.toLowerCase().startsWith(inputQuery.toLowerCase())) {
          return;
        }

        // TODO: validate
        console.log(callback(query));
      }
    }
  },
  onAction: (actionName: string) => {
    return {
      run: (callback: () => void) => {
        if (inputCommand !== 'action' || !inputQuery || !actionName.toLowerCase().startsWith(inputQuery.toLowerCase())) {
          return;
        }

        callback();
      }
    }
  }
};
