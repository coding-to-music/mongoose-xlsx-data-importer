#!/usr/bin/env node

'use strict'
var inquirer = require('inquirer')
var chalk = require('chalk')
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
  
  // console.log(beautify(JSON.stringify(imported)))
  


  // _.forEach(imported, function (imp, impkey) {
  //   models[impkey].create(imported[impkey]).then(function (success) {
  //     console.log(success, 'success')
  //   }, function (err) {
  //     console.log(err, 'catch on import create')
  //   })
  // })




var introQuestions = [
  {
    type: 'list',
    name: 'intro',
    message: 'What do you want to do?',
    choices: [
      new inquirer.Separator(chalk.green('Data + File:')),
      'Parse Data to txt',
      new inquirer.Separator(chalk.green('Data + DB:')),
      'Parse Data to Mongoose',
      new inquirer.Separator(chalk.green('Util:')),
      'Check Mongo Connection',
      'Check Data',
      'Exit'
    ]
  }
]
function parseData(){
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
  return imported
}

var dataGoodQuestion = [
  {
    type: 'confirm',
    name: 'confirmData',
    message: 'Does the data look right (just hit enter for YES)?',
    default: true
  }
]
function dataGoodQuestionFunc () {
  
  return answer
}
function ask () {
  inquirer.prompt(introQuestions, function (answers) {
    switch (answers.intro) {
      case 'Parse Data to txt':
        var goodData = true
        var data = parseData()
        _.forEach(data,function(pd){
          _.forEach(pd,function(n,k){
            console.log(chalk.blue(beautify(JSON.stringify(n))))
            //var answer = true
            // inquirer.prompt(dataGoodQuestion, function (answers) {
            //   console.log(answers,'answers')
            //   answer = answers.confirmData
            // })
          })
        })
        fs.writeFile('./ex/data.txt', beautify(JSON.stringify(data), { indent_size: 2 }), function (err) {
          if (err) return console.log(err);
        });
        ask()
        break
      case 'Parse Data to Mongoose':
        console.log(chalk.red('Not Implemented Yet'))
        ask()
        break
      case 'Check Mongo Connection':
        console.log(chalk.red('Not Implemented Yet'))
        ask()
        break
      case 'Check Data':
        console.log(chalk.red('Not Implemented Yet'))
        ask()
        break
      case 'Exit':
        console.log(chalk.red('Exiting Now'))
        process.exit()
        break
    }
  })
}
ask()



// {
//     type: 'input',
//     name: 'email',
//     message: 'Email of the User',
//     default: function () { return 'testing@test.com' }
//   }











