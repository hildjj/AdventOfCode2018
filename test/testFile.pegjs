{
  function list (head, tail) {
    tail.unshift(head)
    return tail
  }
}

lines
  = head:(WS h:line { return h }) tail:([ \t]* '\n' l:line {return l})* {
    return list(head, tail).filter(t => t)
  }

line
  = comment
  / expected:results inputs:(LWS inp:chunk { return inp})* comment? {
    return { expected, inputs, line: location().start.line }
  }
  / WS

results
  = "!" { return options.EXCEPTION || "!" }
  / chunk

chunk
  = quoted
  / word

quoted
  = '"' info:dqchar* '"' { return info.join('') }
  / "'" info:sqchar* "'" { return info.join('') }
  / "`" info:bqchar* "`" { return info.join('') }

dqchar "characters that go inside double quotes, including escaped dquotes"
  = '\\"' { return '"' }
  / qchar
  / $[^\\"]+

sqchar "characters that go inside single quotes, including escaped squotes"
  = "\\'" { return "'" }
  / qchar
  / $[^\\']+

bqchar "characters that go inside back quotes, including escaped bquotes"
  = "\\`" { return "`" }
  / qchar
  / $[^\\`]+

word
  = chars:wchar+ { return chars.join('') }

wchar "words can contain quoted bits"
  = qchar+
  / $[^ #'"\t\r\n]+

qchar "other quoted characters, as needed"
  = '\\\\' { return '\\' }
  / '\\r' { return '\r' }
  / '\\n' { return '\n' }
  / '\\t' { return '\t' }
  / '\\#' { return '#' }
  / '\\ ' { return ' ' }

comment
  = WS "#" [^\r\n]* { return undefined }

WS "optional whitespace, including newlines"
  = [ \t\r\n]* { return undefined}

LWS "required whitespace"
  = [ \t]+ { return undefined }
