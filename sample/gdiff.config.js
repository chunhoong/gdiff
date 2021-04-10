module.exports = {
  showDefaultOutput: false,
  from: 'latestCommit',
  to: 'latestTag',
  handle: ({ changedFiles, from, to }) => {
    console.log('---------------------------------------------------');
    console.log(`Deployment checklist ${new Date().toISOString().slice(0, 10)}`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    console.log('---------------------------------------------------');
    changedFiles.forEach((fileName) => console.log(fileName));
  }
};
