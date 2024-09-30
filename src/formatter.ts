import { HTMLBeautifyOptions, JSBeautifyOptions, html as beautifyHtml, js as beautifyJs } from 'js-beautify';
import { isDefined } from './utils';
import { FormattingOptions } from 'vscode';

const htmlOptions: HTMLBeautifyOptions = {
    indent_size: 4,
    indent_char: ' ',
    max_preserve_newlines: 1,
    preserve_newlines: true,
    indent_scripts: 'normal',
    end_with_newline: false,
    wrap_line_length: 0,
    indent_inner_html: false,
    indent_empty_lines: false,
    wrap_attributes: 'force',
    templating: ['handlebars', 'auto'],
};

const jsonOptions: JSBeautifyOptions = {
    indent_size: 4,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 0,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    templating: ['handlebars', 'auto'],
};

const arrayOptions: JSBeautifyOptions = {
    indent_size: 4,
    indent_char: ' ',
    max_preserve_newlines: 1,
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 1,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    templating: ['handlebars', 'auto'],
};

const ignoreTrailingComma = [',', '{', '['];

/**
 * It takes a string, finds all the JSON strings in it, and formats them
 * @param text - The text to be formatted.
 * @param regexString - The regex string to use to find the JSON.
 * @returns The text with the JSON formatted.
 */
const formatJson = (
    text: string,
    regexString: string,
    options: Partial<FormattingOptions>,
    addTrailingComma = false,
) => {
    let regex = new RegExp(regexString, 'gm');
    const matches = text.match(regex);

    if (matches && matches.length) {
        for (let i = 0; i < matches.length; i++) {
            regex = new RegExp(regexString, 'gm');
            const exec = regex.exec(matches[i]);

            const dataDefinition = exec?.[1];
            const attrName = exec?.[2];
            const json = exec?.[3];
            const endQuote = exec?.[4];

            if (!dataDefinition || !json) {
                continue;
            }

            const jsonFormatted = beautifyJs(json, getBeautifyConfig(options, jsonOptions));
            const jsonLines = jsonFormatted.split('\n');

            let inLineWithTag = false;
            let indentCount = 0;

            for (let index = 0; index < dataDefinition.length; index++) {
                if (dataDefinition[index] === ' ') {
                    indentCount += 1;
                    continue;
                }

                if (dataDefinition[index] === '<') {
                    inLineWithTag = true;
                    break;
                }
            }

            const indent = ' '.repeat(indentCount);
            const lines = jsonLines.map((line: string, index: number) => {
                if (!index) {
                    return line;
                }

                if (
                    index === jsonLines.length - 1 ||
                    !addTrailingComma ||
                    ignoreTrailingComma.includes(line[line.length - 1])
                ) {
                    return indent + line;
                }

                return indent + line + ',';
            });

            lines[0] = `${inLineWithTag ? dataDefinition : indent}${attrName}${lines[0]}`;
            lines[lines.length - 1] = `${lines[lines.length - 1]}${endQuote}`;
            const linesString = lines.join('\n');

            const replacer = () => {
                return linesString;
            };
            text = text.replace(matches[i], replacer);
        }
    }

    return text;
};

/**
 * It takes a string, finds all the Array strings in it, and formats them
 * @param text - The text to be formatted.
 * @param regexString - The regex string to use to find the Array.
 * @returns The text with the JSON formatted.
 */
const formatArray = (text: string, regexString: string, options: Partial<FormattingOptions>) => {
    let regex = new RegExp(regexString, 'gm');
    const matches = text.match(regex);

    if (matches && matches.length) {
        for (let i = 0; i < matches.length; i++) {
            regex = new RegExp(regexString, 'gm');
            const exec = regex.exec(matches[i]);

            const dataDefinition = exec?.[1];
            const attrName = exec?.[2];
            const json = exec?.[3];
            const endQuote = exec?.[4];

            if (!dataDefinition || !json) {
                continue;
            }

            const jsonFormatted = beautifyJs(json, getBeautifyConfig(options, arrayOptions));
            const jsonLines = jsonFormatted.split('\n');

            let inLineWithTag = false;
            let indentCount = 0;

            for (let index = 0; index < dataDefinition.length; index++) {
                if (dataDefinition[index] === ' ') {
                    indentCount += 1;
                    continue;
                }

                if (dataDefinition[index] === '<') {
                    inLineWithTag = true;
                    break;
                }
            }

            const indent = ' '.repeat(indentCount);
            const lines = jsonLines.map((line: string, index: number) => {
                if (index) {
                    return indent + line;
                }
                return line;
            });

            lines[0] = `${inLineWithTag ? dataDefinition : indent}${attrName}${lines[0]}`;
            lines[lines.length - 1] = `${lines[lines.length - 1]}${endQuote}`;
            const linesString = lines.join('\n');

            const replacer = () => {
                return linesString;
            };
            text = text.replace(matches[i], replacer);
        }
    }

    return text;
};

const addHashToBlocks = (text: string) => {
    const regex = new RegExp('<form>[\\s\\S]*</form>', 'gm');
    const matches = text.match(regex);

    if (matches && matches.length) {
        const fixedBlocks = matches[0].replace(/<a.*[\s]*href="([^#]*?)"/gm, (match, p1) => {
            return `<a href="#${p1}"`;
        });

        text = text.replace(matches[0], fixedBlocks);
    }

    return text;
};

let commentsMatches: RegExpMatchArray | null = null;

const removeHtmlComments = (text: string) => {
    const commentsRegexString = '<!--([\\s\\S]*?)-->';
    const commentsRegex = new RegExp(commentsRegexString, 'gm');
    commentsMatches = text.match(commentsRegex);

    if (commentsMatches && commentsMatches.length) {
        for (let i = 0; i < commentsMatches.length; i++) {
            text = text.replace(commentsMatches[i], `<!-- {${i}} -->`);
        }
    }

    console.log(commentsMatches);
    return text;
};

const restoreHtmlComments = (text: string) => {
    if (commentsMatches && commentsMatches.length) {
        const commentPlaceholder = '<!-- {(\\d*?)} -->';
        let commentPlaceholderRegex = new RegExp(commentPlaceholder, 'gm');
        const commentPlaceholderMatches = text.match(commentPlaceholderRegex);

        if (!commentPlaceholderMatches) {
            return text;
        }

        for (let i = 0; i < commentPlaceholderMatches.length; i++) {
            commentPlaceholderRegex = new RegExp(commentPlaceholder, 'gm');
            const exec = commentPlaceholderRegex.exec(commentPlaceholderMatches[i]);
            const commentIndex = exec?.[1] ? Number(exec[1]) : null;

            if (!isDefined(commentIndex)) {
                continue;
            }

            const replacer = () => {
                return commentsMatches?.[commentIndex] || '';
            };
            text = text.replace(commentPlaceholderMatches[i], replacer);
        }
    }

    return text;
};

const getBeautifyConfig = (
    options: Partial<FormattingOptions>,
    defaultOptions: HTMLBeautifyOptions | JSBeautifyOptions,
) => {
    if (options?.tabSize) {
        defaultOptions.indent_size = options.tabSize;
    }
    if (options?.insertSpaces && options.insertSpaces === true) {
        defaultOptions.indent_char = ' ';
    } else if (options?.insertSpaces === false) {
        defaultOptions.indent_char = '\t';
        defaultOptions.indent_size = 1;
    }
    return defaultOptions;
};

export const format = (text: string, options: Partial<FormattingOptions>) => {
    let errorString = '';

    // add hash to block definition
    try {
        text = addHashToBlocks(text);
    } catch (error) {
        errorString += `[ERROR]: add hash to block\n${error}\n`;
    }

    // format HTML
    try {
        text = beautifyHtml(text, getBeautifyConfig(options, htmlOptions));
    } catch (error) {
        errorString += `[ERROR]: beautify HTML\n${error}\n`;
    }

    // remove Comments
    try {
        text = removeHtmlComments(text);
    } catch (error) {
        errorString += `[ERROR]: remove Comments\n${error}\n`;
    }

    // format JSON
    const jsonAttributeRegexString = "([ \\S]*?)([\\S]+=')[\\s]*([{|[][\\s\\S]*?)[\\s]*(')";
    try {
        text = formatJson(text, jsonAttributeRegexString, options);
    } catch (error) {
        errorString += `[ERROR]: format JSON\n${error}\n`;
    }

    // format Options
    const optionsRegexString = '( *)(data-win-options=")[\\s]*([\\s\\S]*?)[\\s]*(")';
    try {
        text = formatJson(text, optionsRegexString, options);
    } catch (error) {
        errorString += `[ERROR]: format Options\n${error}\n`;
    }

    // format Object Placeholder
    const objectPlaceholderRegexString = '( *)(data-ph-.*=")[\\s]*({[\\s\\S]*?})[\\s]*(")';
    try {
        text = formatJson(text, objectPlaceholderRegexString, options);
    } catch (error) {
        errorString += `[ERROR]: format Object Placeholder\n${error}\n`;
    }

    // format Array Placeholder
    const arrayPlaceholderRegexString = '( *)(data-ph-.*=")[\\s]*(\\[[\\s\\S]*?\\])[\\s]*(")';
    try {
        text = formatArray(text, arrayPlaceholderRegexString, options);
    } catch (error) {
        errorString += `[ERROR]: format Array Placeholder\n${error}\n`;
    }

    // format Options
    const includeFilesRegexString = '( *)(data-include-files=")[\\s]*([\\s\\S]*?)[\\s]*(")';
    try {
        text = formatArray(text, includeFilesRegexString, options);
    } catch (error) {
        errorString += `[ERROR]: format include files\n${error}\n`;
    }

    // restore Comments
    try {
        text = restoreHtmlComments(text);
    } catch (error) {
        errorString += `[ERROR]: restore Comments\n${error}\n`;
    }

    return { text, errorString };
};
