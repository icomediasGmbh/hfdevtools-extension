import { readFileSync } from 'fs';
import { join } from 'path';
import * as assert from 'assert';
import { format } from '../formatter';

suite('Extension Test Suite', () => {
    test('Format test', () => {
        const testFile = readFileSync(join(__dirname, '..', '..', '.test-data', 'formatter-test-input.html'));
        const resultFile = readFileSync(join(__dirname, '..', '..', '.test-data', 'formatter-test-result.html'));

        const formatted = format(testFile.toString(), {});
        assert.strictEqual(formatted.text, resultFile.toString());
    });

    test('Formats JSON in single-quoted attributes', () => {
        const input = '<div id="test" data-custom=\'{ "key": "value", "arr": [1, 2, 3] }\'></div>';

        const formatted = format(input, {});

        assert.strictEqual(
            formatted.text,
            `<div id="test"
    data-custom='{
        "key": "value",
        "arr": [1, 2, 3]
    }'></div>`,
        );
    });

    test('Formats data-hf-options like data-win-options', () => {
        const input = '<div id="test" data-hf-options="{ label: \'\', required: false }"></div>';

        const formatted = format(input, {});

        assert.strictEqual(
            formatted.text,
            `<div id="test"
    data-hf-options="{
        label: '',
        required: false
    }"></div>`,
        );
    });
});
