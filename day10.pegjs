{
  const { list } = require('./utils')
}

start
  = head:(l:line {return l}) tail:(EOL l:line { return l })* { return list(head, tail) }

line
  = "position=" pos:point _ "velocity=" vel:point { return {pos, vel} }

point
  = "<" _ x:num _ "," _ y:num _ ">" { return { x, y} }

num
  = s:$"-"? n:$[0-9]+ { return parseInt(s+n) }
ws
  = [ \t]+ { return undefined }

_
  = [ \t]* { return undefined }

EOL
  = '\r\n' { return undefined }
  / '\n' { return undefined }
