export type ContentLine = [string, string];

function stringifyLine(line: ContentLine) {
  // TODO: Handle lines longer than 75 bytes
  return `${line[0]}:${line[1]}`;
}

export function stringifyLines(lines: ContentLine[]) {
  return lines.map(stringifyLine).join('\r\n');
}
