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
});
