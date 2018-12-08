{
  const { list } = require('./utils')
}

start
  = head:(l:line {return l}) tail:(EOL l:line { return l })* { return list(head, tail) }

line
  = _ x:num _ "," _ y:num _ { return [x, y]}

num
  = n:$[0-9]+ { return parseInt(n) }
_
  = [ \t]* { return undefined }

EOL
  = '\r\n' { return undefined }
  / '\n' { return undefined }
