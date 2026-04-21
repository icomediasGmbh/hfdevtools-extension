import type { HTMLBeautifyOptions, JSBeautifyOptions } from 'js-beautify';
import { html as beautifyHtml, js as beautifyJs } from 'js-beautify';
import { isDefined } from './utils';
import type { FormattingOptions } from 'vscode';

const formBlockRegex = /<form>[\s\S]*<\/form>/m;
const formLinkRegex = /<a.*[\s]*href="([^#]*?)"/gm;
const commentsRegex = /<!--([\s\S]*?)-->/gm;
const commentPlaceholderRegex = /<!-- {(\d*?)} -->/gm;

const jsonAttributeRegex = /([ \S]*?)([\S]+=')[\s]*([{|[][\s\S]*?)[\s]*(')/gm;
const optionsRegex = /( *)(data-(?:win|hf)-options=")[\s]*([\s\S]*?)[\s]*(")/gm;
const objectPlaceholderRegex = /( *)(data-ph-.*=")[\s]*({[\s\S]*?})[\s]*(")/gm;
const arrayPlaceholderRegex = /( *)(data-ph-.*=")[\s]*(\[[\s\S]*?\])[\s]*(")/gm;
const includeFilesRegex = /( *)(data-include-files=")[\s]*([\s\S]*?)[\s]*(")/gm;

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

const ignoreTrailingComma = new Set([',', '{', '[']);

/**
 * It takes a string, finds all the JSON strings in it, and formats them
 * @param text - The text to be formatted.
 * @param regexString - The regex string to use to find the JSON.
 * @returns The text with the JSON formatted.
 */
const formatJson = (text: string, regex: RegExp, beautifyOptions: JSBeautifyOptions, addTrailingComma = false) => {
    regex.lastIndex = 0;

    return text.replace(regex, (match, dataDefinition = '', attrName = '', json = '', endQuote = '') => {
        if (!dataDefinition || !json) {
            return match;
        }

        const jsonFormatted = beautifyJs(json, beautifyOptions);
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
            }
            break;
        }

        const indent = ' '.repeat(indentCount);
        const lines = jsonLines.map((line: string, index: number) => {
            if (!index) {
                return line;
            }

            if (index === jsonLines.length - 1 || !addTrailingComma || ignoreTrailingComma.has(line[line.length - 1])) {
                return indent + line;
            }

            return indent + line + ',';
        });

        lines[0] = `${inLineWithTag ? dataDefinition : indent}${attrName}${lines[0]}`;
        lines[lines.length - 1] = `${lines[lines.length - 1]}${endQuote}`;
        return lines.join('\n');
    });
};

/**
 * It takes a string, finds all the Array strings in it, and formats them
 * @param text - The text to be formatted.
 * @param regex - The regex to use to find the Array.
 * @returns The text with the JSON formatted.
 */
const formatArray = (text: string, regex: RegExp, beautifyOptions: JSBeautifyOptions) => {
    regex.lastIndex = 0;

    return text.replace(regex, (match, dataDefinition = '', attrName = '', json = '', endQuote = '') => {
        if (!dataDefinition || !json) {
            return match;
        }

        const jsonFormatted = beautifyJs(json, beautifyOptions);
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
            }
            break;
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
        return lines.join('\n');
    });
};

const addHashToBlocks = (text: string) => {
    const formMatch = formBlockRegex.exec(text);

    if (!formMatch?.[0]) {
        return text;
    }

    const fixedBlocks = formMatch[0].replace(formLinkRegex, (_match, linkTarget) => {
        return `<a href="#${linkTarget}"`;
    });

    return text.replace(formMatch[0], fixedBlocks);
};

const removeHtmlComments = (text: string) => {
    const commentsMatches: string[] = [];
    commentsRegex.lastIndex = 0;
    const cleanedText = text.replace(commentsRegex, (match) => {
        const commentIndex = commentsMatches.push(match) - 1;
        return `<!-- {${commentIndex}} -->`;
    });

    return { text: cleanedText, commentsMatches };
};

const restoreHtmlComments = (text: string, commentsMatches: string[]) => {
    if (!commentsMatches.length) {
        return text;
    }

    commentPlaceholderRegex.lastIndex = 0;
    return text.replace(commentPlaceholderRegex, (_placeholder, commentIndexText) => {
        const commentIndex = Number(commentIndexText);

        if (!isDefined(commentIndex) || Number.isNaN(commentIndex)) {
            return _placeholder;
        }

        return commentsMatches[commentIndex] || '';
    });
};

const getBeautifyConfig = <T extends HTMLBeautifyOptions | JSBeautifyOptions>(
    options: Partial<FormattingOptions>,
    defaultOptions: T,
): T => {
    const beautifyConfig = { ...defaultOptions };

    if (options?.tabSize) {
        beautifyConfig.indent_size = options.tabSize;
    }
    if (options?.insertSpaces && options.insertSpaces === true) {
        beautifyConfig.indent_char = ' ';
    } else if (options?.insertSpaces === false) {
        beautifyConfig.indent_char = '\t';
        beautifyConfig.indent_size = 1;
    }
    return beautifyConfig;
};

export const format = (text: string, options: Partial<FormattingOptions>) => {
    let errorString = '';
    let commentsMatches: string[] = [];

    const htmlBeautifyConfig = getBeautifyConfig(options, htmlOptions);
    const jsonBeautifyConfig = getBeautifyConfig(options, jsonOptions);
    const arrayBeautifyConfig = getBeautifyConfig(options, arrayOptions);

    // add hash to block definition
    try {
        if (text.includes('<form') && text.includes('href="')) {
            text = addHashToBlocks(text);
        }
    } catch (error) {
        errorString += `[ERROR]: add hash to block\n${error}\n`;
    }

    // format HTML
    try {
        text = beautifyHtml(text, htmlBeautifyConfig);
    } catch (error) {
        errorString += `[ERROR]: beautify HTML\n${error}\n`;
    }

    // remove Comments
    try {
        if (text.includes('<!--')) {
            const removedComments = removeHtmlComments(text);
            text = removedComments.text;
            commentsMatches = removedComments.commentsMatches;
        }
    } catch (error) {
        errorString += `[ERROR]: remove Comments\n${error}\n`;
    }

    // format JSON
    try {
        if (text.includes("='")) {
            text = formatJson(text, jsonAttributeRegex, jsonBeautifyConfig);
        }
    } catch (error) {
        errorString += `[ERROR]: format JSON\n${error}\n`;
    }

    // format Options
    try {
        if (text.includes('data-win-options="') || text.includes('data-hf-options="')) {
            text = formatJson(text, optionsRegex, jsonBeautifyConfig);
        }
    } catch (error) {
        errorString += `[ERROR]: format Options\n${error}\n`;
    }

    // format Object Placeholder
    try {
        if (text.includes('data-ph-')) {
            text = formatJson(text, objectPlaceholderRegex, jsonBeautifyConfig);
        }
    } catch (error) {
        errorString += `[ERROR]: format Object Placeholder\n${error}\n`;
    }

    // format Array Placeholder
    try {
        if (text.includes('data-ph-')) {
            text = formatArray(text, arrayPlaceholderRegex, arrayBeautifyConfig);
        }
    } catch (error) {
        errorString += `[ERROR]: format Array Placeholder\n${error}\n`;
    }

    // format Options
    try {
        if (text.includes('data-include-files="')) {
            text = formatArray(text, includeFilesRegex, arrayBeautifyConfig);
        }
    } catch (error) {
        errorString += `[ERROR]: format include files\n${error}\n`;
    }

    // restore Comments
    try {
        text = restoreHtmlComments(text, commentsMatches);
    } catch (error) {
        errorString += `[ERROR]: restore Comments\n${error}\n`;
    }

    return { text, errorString };
};
