# cliclopts
[![NPM](https://nodei.co/npm/cliclopts.png)](https://nodei.co/npm/cliclopts/)

![cliclopts](cliclopts.png)

Command line options helper and usage printer, works well with [minimist](https://www.npmjs.com/package/minimist), inspired by [nomnom](https://www.npmjs.com/package/nomnom)


## usage

Define the allowed options in an array and pass it to 'cliclopts'

```js
var cliclopts = require('cliclopts')

var options = [
  {
    name: 'verbose',
    abbr: 'v'
    alias: ['loud'],
    boolean: true,
    help: 'be verbose'
  },
  {
    name: 'path',
    abbr: 'p',
    default: './dat.json'
    help: 'path to file'
  }
]

var cliOpts = cliclopts(options)
```

### cliOpts.print()

Print help information, in this example:

```
--verbose, -v         be verbose
--path, -p            path to file (default: "dat.json")
```

### cliOpts.boolean()

Returns Array of all command names that are specified as boolean.

### cliOpts.alias()

Returns Object with command names as keys and alias list as value (including abbr)

### cliOpts.default()

Returns Object with command names as keys and default values as values.


## Example usage with `minimist`
```js
var allowedOptions = {
  {
    name: 'verbose',
    abbr: 'v'
    alias: ['cry-at-me'],
    boolean: true,
    help: 'be verbose'
  },
  {
    name: 'path',
    abbr: 'p',
    help: 'path to the file'
  },
  {
    name: 'help',
    abbr: 'h',
    help: 'show help',
    boolean: true
  }
}

var clopts = require('cliclopts')(allowedOptions)

var argv = require('minimist')(process.argv.slice(2), {
  alias: clopts.alias(),
  boolean: clopts.boolean(),
  default: clopts.default(),
})

if(minimist.help) {
  console.log('Usage: command [options]')
  clopts.print()
  process.exit()
}

yourprogram(argv)
```

