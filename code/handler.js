const IOpipeLib = require('@iopipe/iopipe')
const tracer = require('@iopipe/trace')
const profiler = require('@iopipe/profiler')
const dotenv = require('dotenv').config()

const iopipe = IOpipeLib({
  token: process.env.IOPIPE_TOKEN,
  plugins: [
    tracer(),
    profiler({
      enabled: true
    })
  ]
})

module.exports.hello = (event, context, callback) => {
  const mark = context.iopipe.mark
  mark.start('Silliness')
  for(let x=0; x <= 100000; x++) {
    x++
  }
  mark.end('Silliness')

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Bonjour, serverlessconf Paris!',
      input: event,
    }),
  }

  callback(null, response);
}
