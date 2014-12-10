var PassThrough = require('stream').PassThrough

function Cliclopts(opts) {
  if(!(this instanceof Cliclopts)) {
    return new Cliclopts(opts)
  }
  this.opts = opts || []
  this.indent = '    '
  this.width = 23
}

Cliclopts.prototype.print = function (stream) {
  var output = stream || process.stdout
  this.opts.filter(function (opt) {
      return opt.help
  })
  .forEach(function (option) {
    output.write(this.indent)  
    
    var helpIndex = option.helpIndex
    

    if(!helpIndex) {
      helpIndex = '--' + option.name
      if(option.abbr) helpIndex += ', -' + option.abbr
    }  
    output.write(helpIndex)

    var offset = 0
    if(helpIndex.length > this.width) {
      output.write('\n' + this.indent)
    } else {
      offset = helpIndex.length
    }

    output.write(Array(this.width - offset).join(' '))
  
    output.write(option.help)
    if(option.hasOwnProperty('default')) {
      output.write(' (default: ' + JSON.stringify(option.default) +')')
    }
    output.write('\n')
  }.bind(this))

}


Cliclopts.prototype.booleans = function () {
  return this.opts
    .filter(function (opt) {
      return opt.boolean
    })
    .map(function (opt) {
      return opt.name
    })
}
Cliclopts.prototype.boolean = Cliclopts.prototype.booleans

Cliclopts.prototype.default = function () {
  var defaults = {}
  this.opts.forEach(function (opt) {
    if('default' in opt) {
      defaults[opt.name] = opt.default
      if('abbr' in opt) defaults[opt.abbr] = opt.default
    }
  })
  return defaults
}

Cliclopts.prototype.alias =function () {
  var alias = {}
  this.opts.forEach(function (opt) {
    var build = []
    if('alias' in opt) {
      if(typeof opt.alias === 'string') build.push(opt.alias)
      else build = build.concat(opt.alias)
    }
    if('abbr' in opt) build.push(opt.abbr)
    alias[opt.name] = build
  })
  return alias
}

module.exports = Cliclopts