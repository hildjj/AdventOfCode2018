{
  function list (head, tail) {
    tail.unshift(head)
    return tail
  }
}

lines
  = head:(WS h:line { return h }) tail:([ \t]* '\n' l:line {return l})* { return list(head, tail).filter(t => t) }

line
  = comment
  / expected:results inputs:(LWS inp:chunk { return inp})* comment? { return { expected, inputs, line: location().start.line } }
  / WS

results
  = "!" { return options.EXCEPTION || "!" }
  / chunk

chunk
  = quoted
  / word

quoted
  = '"' info:$[^"\r\n]* '"' { return info }
  / "'" info:$[^'\r\n]* "'" { return info }

word
  = $[^ #'"\t\r\n]+

comment
  = WS "#" [^\r\n]* { return undefined }

WS "optional whitespace, including newlines"
  = [ \t\r\n]* { return undefined}

LWS "required whitespace"
  = [ \t]+ { return undefined }
