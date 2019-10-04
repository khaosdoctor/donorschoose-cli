import fs from 'fs'
export function loadStateFile (path: string) {
  const data = JSON.parse(fs.readFileSync(path).toString())
  return data
}
