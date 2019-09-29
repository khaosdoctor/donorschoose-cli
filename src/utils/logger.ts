import { Chalk } from 'chalk'

export class Logger {
  constructor (private readonly chalk: Chalk) { }

  private indent (level: number) {
    return ' '.repeat(level)
  }

  private log (message: any, indent: number, chalk: Chalk) {
    return console.log(chalk(this.indent(indent) + message))
  }

  error (message: any, indent: number = 2) {
    return this.log(message, indent, this.chalk.red)
  }

  success (message: any, indent: number = 2) {
    return this.log(message, indent, this.chalk.greenBright)
  }

  info (message: any, indent: number = 2) {
    return this.log(message, indent, this.chalk.cyan)
  }

  warn (message: any, indent: number = 2) {
    return this.log(message, indent, this.chalk.yellow)
  }

  message (message: any, indent: number = 2) {
    return this.log(message, indent, this.chalk.white)
  }
}
