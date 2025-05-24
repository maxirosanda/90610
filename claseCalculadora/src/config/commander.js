import { program } from "commander";

program
  .option('-m --mode <mode>','','dev')
program.parse();

export const options = program.opts();

