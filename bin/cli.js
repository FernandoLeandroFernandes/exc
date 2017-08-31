#! /usr/bin/env node
'use strict'

const pkg = require('../package.json')
const got = require('got')
const money = require('money')
const colors = require('colors')
const fixer = 'https://api.fixer.io/latest'
const currencies = require('../lib/currencies.json')

// arguments
let args = process.argv.slice(2)
let amount = args[0]
let from = args[1]

// help
if (args.indexOf('--help') !== -1 || args.indexOf('-h') !== -1 || !args.length) {
  
  console.log(`
    Command syntax
      $ eXc <amount> <currency> [<...currencies>]

    Currencies available
      USD   US dollar
      JPY   Japanese yen
      BGN   Bulgarian lev
      CZK   Czech koruna
      DKK   Danish krone
      GBP   Pound sterling
      HUF   Hungarian forint
      PLN   Polish zloty
      RON   Romanian leu
      SEK   Swedish krona
      CHF   Swiss franc
      NOK   Norwegian krone
      HRK   Croatian kuna
      RUB   Russian rouble
      TRY   Turkish lira
      AUD   Australian dollar
      BRL   Brazilian real
      CAD   Canadian dollar
      CNY   Chinese yuan renminbi
      HKD   Hong Kong dollar
      IDR   Indonesian rupiah
      ILS   Israeli shekel
      INR   Indian rupee
      KRW   South Korean won
      MXN   Mexican peso
      MYR   Malaysian ringgit
      NZD   New Zealand dollar
      PHP   Philippine peso
      SGD   Singapore dollar
      THB   Thai baht
      ZAR   South African rand
    
    EXAMPLE

    $ eXc 1 usd eur rub aud

    Return

                 Euro: 0.91
       Russian Rouble: 62.92
    Australian Dollar: 1.30

      Conversion of USD 1.00
  `);

  process.exit(1);

}

// -- version command
if (args.indexOf('--version') !== -1 || args.indexOf('-v') !== -1) {
  
  console.log(pkg.version);

  process.exit(1);

}

console.log();

got(fixer, { json: true }).then((response) => {
  money.base = response.body.base;
  money.rates = response.body.rates;

  let rates = ['USD', 'EUR', 'GBP', 'BRL']
  let names = [
    ' American Dollar:',
    '            Euro:',
    '  Pound sterling:',
    '  Brazilian real:'
  ];

  if (args.length > 2) {
    
    let to = process.argv.slice(4);

    rates = [];
    names = [];

    to.map((code) => {
      code = code.toUpperCase()
      rates.push(code)
      names.push(currencies[code])
    });
  }

  rates.map((item, index) => {
    
    if (item !== from.toUpperCase()) {
      console.log(` ${colors.gray.italic(names[index])} ${colors.green.bold(money.convert(amount, {
        from: from.toUpperCase(),
        to: item
      }).toFixed(2))} `);
    }

  })

  console.log(colors.italic.gray(`
    Convertion of ${from.toUpperCase()} ${amount}
    `));

  process.exit(1);

}).catch((error) => {
  
  if (error.code === 'ENOTFOUND') {
    console.log(colors.red('\tFailure to reach the server, please check your internet connection.\;n'))
  
  } else {
    console.log(colors.red('\tInternal server error... \n'))
  }

  process.exit(1)

})
