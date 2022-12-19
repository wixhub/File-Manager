import os from 'os';

// Operating system info

export const readArg = (arg) => {
  if (arg) {
    switch (arg) {
      case 'architecture':
        console.log(`CPU architecture: ${os.arch()}`);
        break;
      case 'cpus':
        getCpus();
        break;
      case 'EOL':
        console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
        break;
      case 'homedir':
        console.log(`Home directory: ${os.homedir()}`);
        break;
      case 'username':
        console.log(`Current system user name: ${os.userInfo().username}`);
        break;
      default:
        console.log(`Invalid input: ${input}`);
  }} else {
    console.log("Invalid input");
  }
};

const getCpus = () => {
  console.log("*** Host machine CPUs info");
  console.log(`** Overall amount of CPUS: ${os.cpus().length}`);
  const details = [];
  os.cpus().forEach((cpu) => {
    details.push({ 'Model and clock rate (in GHz)': cpu.model });
  });
  console.table(details);
};