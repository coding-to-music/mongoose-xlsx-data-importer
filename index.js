#!/usr/bin/env node

'use strict'
var inquirer = require('inquirer')
var chalk = require('chalk')
var xlsx = require('node-xlsx')
var mongoose = require('mongoose')
var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var async = require('async')
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
var validateChoiceQuestions = [
  {
    type: 'list',
    name: 'validChoice',
    message: 'How Do you want to validate your data?',
    choices: [
      'By Each Object',
      'By One Sample '
    ]
  }
]
var dataGoodQuestion = [
  {
    type: 'confirm',
    name: 'confirmData',
    message: 'Does the data look right (just hit enter for YES)?',
    default: true
  }
]
var pathQuestion = [
  { 
    type: "input",
    name: "path",
    message: "What's the path you to file you want to create",
    default: function () { return "./ex/data.txt"; }
  }
]
function dataGoodQuestionFunc (cb) {
  inquirer.prompt(dataGoodQuestion, function (answers) {
    cb(answers.confirmData)
  })
}
function parseDatabySample(cb){
  var data = parseData()
  var task = [function(callback) {
        callback(null,'none');
  }]
  _.forEach(data,function(pd,pdk){
    _.forEach(pd,function(n,k){
      if(k==0)task.push(function(arg1,callback) {
        console.log(chalk.blue(beautify(JSON.stringify(n))))
        dataGoodQuestionFunc(function(dataAnwser){
          if(dataAnwser)callback(null,data)
          else callback(true,null)
        })
      })
    })
  })
  async.waterfall(task, function (err, result) {
    if(err){
      console.log(chalk.red('Data Not Formatted Correctly ... \n EXITING NOW '))
      process.exit()
    }
    else {
      cb(data)
    }
  })
}
function parseDatabyObject(cb){
  var data = parseData()
  var task = [function(callback) {
        callback(null,'none');
  }]
  _.forEach(data,function(pd,pdk){
    _.forEach(pd,function(n,k){
      task.push(function(arg1,callback) {
        console.log(chalk.blue(beautify(JSON.stringify(n))))
        dataGoodQuestionFunc(function(dataAnwser){
          if(dataAnwser)callback(null,data)
          else callback(true,null)
        })
      })
    })
  })
  console.log(task)
  async.waterfall(task, function (err, result) {
    if(err){
      console.log(chalk.red('Data Not Formatted Correctly ... \n EXITING NOW '))
      process.exit()
    }
    else {
      cb(data)
    }
  })
}
function ask () {
  
  inquirer.prompt(introQuestions, function (answers) {
    switch (answers.intro) {
      case 'Parse Data to txt':
        inquirer.prompt(validateChoiceQuestions,function(valid){
          if(valid.validChoice ==='By Each Object'){
            parseDatabyObject(function(data){
              inquirer.prompt(pathQuestion,function(pathAnwser){
                if (!fs.existsSync(path.parse(pathAnwser.path).dir)) {
                  fs.mkdirSync(path.parse(pathAnwser.path).dir)
                }
                fs.writeFile(pathAnwser.path, beautify(JSON.stringify(data), { indent_size: 2 }), function (err) {
                  if (err) return console.log(err);
                  console.log(chalk.green('Created \n Path:'+pathAnwser.path))
                  process.exit()
                });
              })
            })
          }else{
            parseDatabySample(function(data){
              inquirer.prompt(pathQuestion,function(pathAnwser){
                if (!fs.existsSync(path.parse(pathAnwser.path).dir)) {
                  fs.mkdirSync(path.parse(pathAnwser.path).dir)
                }
                fs.writeFile(pathAnwser.path, beautify(JSON.stringify(data), { indent_size: 2 }), function (err) {
                  if (err) return console.log(err);
                  console.log(chalk.green('Created \n Path:'+pathAnwser.path))
                  process.exit()
                });
              })
            })
          }
        })
        break
      case 'Parse Data to Mongoose':
        console.log(chalk.red('Not Implemented Yet'))
        process.exit()
        break
      case 'Check Mongo Connection':
        console.log(chalk.red('Not Implemented Yet'))
        process.exit()
        break
      case 'Check Data':
        console.log(chalk.red('Not Implemented Yet'))
        process.exit()
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











