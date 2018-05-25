
import { createWordLists } from "./util/dictionaryUtil";
import * as path from "path";

const wordsPath = path.join(__dirname, "../", "dictionary", "words.txt");

createWordLists(wordsPath);