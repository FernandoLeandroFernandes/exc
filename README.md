# eXc

> A command line (CLI) currency exchanger that uses ECB service.

#### Info
eXc uses the the European Central Bank published rates, through [Fixer.io](http://fixer.io/) JSON API, the conversions wich are updated daily by 4PM CET.


#### Usage
```
Syntax
  $ eXc <amount> <currency> [<...currencies>]

Example
  $ eXc 1 usd

Output
             Euro: 0.92
  Libra Esterlina: 0.82
   Real Brazilian: 3.15

  Conversion of USD 1

Your own currencies to convert

  $ eXc 1 usd eur rub aud

Result

             Euro: 0.91
   Russian Rouble: 62.92
Australian Dollar: 1.30

  Conversion of USD 1
```

### Licensing
[MIT License](http://mit-license.org/)
