const fs = require('fs-extra');
const path = require('path');

const source = path.join(__dirname, '../../build/contracts/Vote.json');
const destination = path.join(__dirname, '../utils/abi.json');

fs.copySync(source, destination);

console.log('Contract ABI JSON file copied successfully.');