{
  const { list } = require('./utils')
}

start
  = head:(l:line {return l}) tail:(EOL l:line { return l })* { return list(head, tail) }

line
  = '[' date:date ']' ws action:action { return {date, action}}

date
  = d:$([0-9]+ '-' [0-9]+ '-' [0-9]+ ws [0-9]+ ':' [0-9]+) { return new Date(d + 'Z') }

action
  = begin
  / wake
  / sleep

begin
  = 'Guard #' guard:$[0-9]+ ' begins shift' { return parseInt(guard) }

wake
  = 'wakes up' { return "wake" }

sleep
  = 'falls asleep' { return "sleep" }

ws
  = [ \t]+ { return undefined }

_
  = [ \t]* { return undefined }

EOL
  = '\r\n' { return undefined }
  / '\n' { return undefined }
