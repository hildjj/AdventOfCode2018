{
  const { list } = require('./utils')
}

start
  = head:(l:line {return l}) tail:(EOL l:line { return l })* { return list(head, tail) }

line
  = "Step " pre:$[a-zA-Z]+ " must be finished before step " post:$[a-zA-Z]+ " can begin." { return [pre, post]}

ws
  = [ \t]+ { return undefined }

_
  = [ \t]* { return undefined }

EOL
  = '\r\n' { return undefined }
  / '\n' { return undefined }
