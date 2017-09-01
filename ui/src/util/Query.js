const implicit = '<implicit>'

export function findField (parsed, field) {
  if (parsed.field) {
    return parsed.field === field ? { field: parsed } : null
  }

  if (parsed.left) {
    const res = findField(parsed.left, field)
    if (res && !res.parent) {
      res.parent = parsed
      res.type = 'left'
    }
    if (res) return res
  }

  if (parsed.right) {
    const res = findField(parsed.right, field)
    if (res && !res.parent) {
      res.parent = parsed
      res.type = 'right'
    }
    if (res) return res
  }

  return null
}

function prefixCharWithBackslashes(char) {
  return '\\' + char;
}

function escapeQuotedTerm(s) {
  return s.replace(/"/g, prefixCharWithBackslashes);
}

export function queryToString(ast) {
  if (!ast) {
    return '';
  }

  var result = '';

  if (ast.start != null) {
    result += ast.start + ' ';
  }

  if (ast.field && ast.field !== implicit) {
    result += ast.field + ':';
  }

  if (ast.left) {
    if (ast.parenthesized) {
      result += '(';
    }
    result += queryToString(ast.left);
  }

  if (ast.operator) {
    if (ast.left) {
      result += ' ';
    }

    if (ast.operator !== implicit) {
      result += ast.operator;
    }
  }

  if (ast.right) {
    if (ast.operator && ast.operator !== implicit) {
      result += ' ';
    }
    result += queryToString(ast.right);
  }

  if (ast.parenthesized && ast.left) {
    result += ')';
  }

  if (ast.term) {
    if (ast.prefix) {
      result += ast.prefix;
    }
    if (ast.quoted) {
      result += '"';
      result += escapeQuotedTerm(ast.term);
      result += '"';
    } else {
      result += ast.term;
    }

    if (ast.proximity != null) {
      result += '~' + ast.proximity;
    }

    if (ast.boost != null) {
      result += '^' + ast.boost;
    }
  }

  if (ast.term_min) {
    if (ast.inclusive) {
      result += '[';
    } else {
      result += '{';
    }

    result += ast.term_min;
    result += ' TO ';
    result += ast.term_max;

    if (ast.inclusive) {
      result += ']';
    } else {
      result += '}';
    }
  }

  if (ast.similarity) {
    result += '~';

    if (ast.similarity !== 0.5) {
      result += ast.similarity;
    }
  }

  return result;
}
