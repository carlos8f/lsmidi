#!/usr/bin/env node
var argv = require('optimist').argv
  , midi = require('midi')

require('colors')

if (argv.v || argv.version) {
  var pkgInfo = require(require('path').resolve(__dirname, '../package.json'));
  console.log('%s v%s', pkgInfo.name, pkgInfo.version);
  process.exit();
} 

console.log('\nMIDI devices\n');

var input = new midi.input()
  , inPortCount = input.getPortCount()

console.log(process.stdout.isTTY ? 'input'.bold : 'input');
for (var i = 0; i < inPortCount; i++) {
  print(input.getPortName(i), i);
}
console.log();

var output = new midi.output()
  , outPortCount = output.getPortCount()

console.log(process.stdout.isTTY ? 'output'.bold : 'output');
for (var i = 0; i < outPortCount; i++) {
  print(output.getPortName(i), i);
}
console.log();
process.exit();

function print(name, i) {
  var line = '  ';
  if (process.stdout.isTTY) {
    line += ('[' + i + ']').grey;
    line += ' ' + name.green
  }
  else {
    line += ('[' + i + ']');
    line += ' ' + name;
  }
  console.log(line);
}