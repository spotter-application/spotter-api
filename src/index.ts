declare var process : {
  argv: Array<string>;
}

interface Option {
  id: string;
  title: string;
  action: string;
}

const inputCommand = process.argv[2];
const inputQuery = process.argv.splice(3).join(' ');

export const Spotter = {
  output: (options: Option[]) => {
    if (inputCommand !== 'query' || !inputQuery) {
      return;
    }

    console.log(
      JSON.stringify(options.filter(option => option.title.toLowerCase().startsWith(inputQuery.toLowerCase())))
    );
  },

  onQuery: (query: string) => {
    return {
      output: (callback: (query: string) => Option[]) => {
        if (inputCommand !== 'query' || !inputQuery || !query.toLowerCase().startsWith(inputQuery.toLowerCase())) {
          return;
        }

        // TODO: validate
        console.log(JSON.stringify(callback(query)));
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
