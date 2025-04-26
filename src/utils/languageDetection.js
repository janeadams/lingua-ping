import { francAll } from 'franc';
import { htmlToText } from 'html-to-text';
import { iso6393 } from 'iso-639-3';

const TOP_LANGUAGES = [
  'cmn', 'spa', 'eng', 'hin', 'por', 'ben', 'rus', 'jpn', 'pnb', 'mar',
  'tel', 'wuu', 'tur', 'kor', 'fra', 'deu', 'vie', 'tam', 'urd', 'jav',
];

export function detectLanguage(text) {
  // Convert HTML to plain text
  const plainText = htmlToText(text, {
    wordwrap: false, // Disable word wrapping to preserve the original structure
  });

  // Get all language candidates with their confidence scores, limited to top languages
  const candidates = francAll(plainText, { only: TOP_LANGUAGES });

  if (candidates.length === 0) {
    return 'undetermined'; // Unknown language
  }

  const languageEntry = iso6393.find((entry) => entry.iso6393 === candidates[0][0]);
  const languageName = languageEntry ? languageEntry.name : 'undetermined';

  return languageName
}