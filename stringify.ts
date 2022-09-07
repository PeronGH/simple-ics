export type ContentLine = [string, string?];

function stringifyLine(line: ContentLine) {
  // TODO: Handle lines longer than 75 bytes
  return `${line[0].toUpperCase()}:${line[1]}`;
}

export function stringifyLines(lines: ContentLine[]) {
  return lines
    .filter(line => line[1] !== undefined)
    .map(stringifyLine)
    .join('\r\n');
}
