module.exports = {
  showDefaultOutput: false,
  commits: ['HEAD', 'TAG'],
  handle: ({ changedFiles, commits }) => {
    console.log('---------------------------------------------------');
    console.log(`Deployment checklist ${new Date().toISOString().slice(0, 10)}`);
    console.log(`Between: ${commits[0]} & ${commits[1]}`);
    console.log('---------------------------------------------------');
    changedFiles.forEach((fileName, index) =>
      console.log(`${index + 1 >= 10 ? index + 1 : index + 1 + ' '} | ${fileName}`)
    );
  }
};
