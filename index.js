var xlsx = require('node-xlsx')
var mongoose = require('mongoose')
var _ = require('lodash')
var fs = require('fs')
var beautify = require('js-beautify').js_beautify
  // var models = {
  //   user: mongoose.model('User'),
  //   campaign: mongoose.model('Campaign'),
  //   events: mongoose.model('Events'),
  //   organization: mongoose.model('Organization'),
  //   page: mongoose.model('Page'),
  //   article: mongoose.model('Article')
  // }
  var obj = xlsx.parse(__dirname + '/ex/data.xlsx')
  var imported = {}
  var arrayFlag = []
  var arrayHolder = {}
  _.map(obj, function (main, mainkey) {
    imported[main.name] = []
    _.map(main.data, function (n, k) {
      // create the init obj
      if (k !== 0)imported[main.name][k - 1] = {} // !==0
      _.map(n, function (value, valuekey) {
        // check where you want a array or obj or just field
        if (k !== 0) { // ==1 to test 0 for prod
          if (main.data[0][valuekey].indexOf('.') !== -1) {
            var object = main.data[0][valuekey].split('.')
            if (imported[main.name][k - 1][object[0]]) {
              imported[main.name][k - 1][object[0]][object[1]] = value
            } else {
              imported[main.name][k - 1][object[0]] = {}
              imported[main.name][k - 1][object[0]][object[1]] = value
            }
          } else if (main.data[0][valuekey].indexOf('_') !== -1) {
            var objectArray = main.data[0][valuekey].split('_')
            if (arrayFlag.indexOf(objectArray[0]) === -1)arrayFlag.push(objectArray[0])
            if (arrayHolder[objectArray[0]]) {
              arrayHolder[objectArray[0]][objectArray[1]] = value
            } else {
              arrayHolder[objectArray[0]] = {}
              arrayHolder[objectArray[0]][objectArray[1]] = value
            }
          } else {
            imported[main.name][k - 1][main.data[0][valuekey]] = value
          }
        }
      })
      // take the array holder and push them tot here proper array or just push them without the holder
      if (k !== 0) {
        _.forEach(arrayHolder, function (hold, holdkey) {
          if (holdkey.indexOf(',') === -1) {
            if (_.isArray(imported[main.name][k - 1][holdkey])) {
              imported[main.name][k - 1][holdkey].push(arrayHolder[holdkey])
            } else {
              imported[main.name][k - 1][holdkey] = []
              imported[main.name][k - 1][holdkey].push(arrayHolder[holdkey])
            }
          } else {
            var objectArrayCheck = holdkey.split(',')
            if (_.isArray(imported[main.name][k - 1][objectArrayCheck[0]])) {
              imported[main.name][k - 1][objectArrayCheck[0]].push(arrayHolder[holdkey])
            } else {
              imported[main.name][k - 1][objectArrayCheck[0]] = []
              imported[main.name][k - 1][objectArrayCheck[0]].push(arrayHolder[holdkey])
            }
          }
        })
      }
    })
  })
  console.log(beautify(JSON.stringify(imported)))
  fs.writeFile('./ex/data.txt', beautify(JSON.stringify(imported), { indent_size: 2 }), function (err) {
    if (err) return console.log(err);
  });
  // _.forEach(imported, function (imp, impkey) {
  //   models[impkey].create(imported[impkey]).then(function (success) {
  //     console.log(success, 'success')
  //   }, function (err) {
  //     console.log(err, 'catch on import create')
  //   })
  // })
