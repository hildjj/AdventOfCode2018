{
  const { list } = require('./utils')
}

start
  = head:(l:line {return l}) tail:(EOL l:line { return l })* { return list(head, tail) }

line
  = _ "#" _ id:num _ "@" _ x:num _ "," _ y:num _ ":" _ w:num _ "x" _ h:num {
    return { id, x, y, w, h }
  }

num
  = n:$[0-9]+ { return parseInt(n) }

ws
  = [ \t]+ { return undefined }

_
  = [ \t]* { return undefined }

EOL
  = '\r\n' { return undefined }
  / '\n' { return undefined }
