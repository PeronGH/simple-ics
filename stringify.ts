export type ContentLine = [string, string];

function foldLine(line: string) {
  return line.match(/(.{1,75})/g)!.join('\r\n ');
}

function stringifyLine(line: ContentLine) {
  return foldLine(`${line[0]}:${line[1]}`);
}

export function stringifyLines(lines: ContentLine[]) {
  return lines.map(stringifyLine).join('\r\n');
}
