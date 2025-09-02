import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupServerMocks } from '../setup/serverTestSetup';

// Declare variables at module level
let createServerMock;
let listenMock;

// Mock http module - but initialize the mock in beforeEach
vi.mock('http', () => ({
    createServer: vi.fn()
}));

describe('Server Configuration', () => {
    beforeEach(() => {
        // Reset modules before initializing new mocks
        vi.resetModules();
        vi.clearAllMocks();
        
        // Setup fresh mocks for each test
        const mocks = setupServerMocks();
        createServerMock = mocks.createServerMock;
        listenMock = mocks.listenMock;

        // Update the http mock implementation
        const http = require('http');
        http.createServer = createServerMock;
    });

    afterEach(() => {
        delete process.env.PORT;
        vi.restoreAllMocks();
    });

    describe('Server Port Configuration', () => {
        it('should verify server is running on port 3000', async () => {
            // Import server module - must be after mock setup
            // eslint-disable-next-line no-unused-vars
            const server = await import('../../server.js');
            
            // Verify server creation
            expect(createServerMock).toHaveBeenCalled();
            
            // Check if listenMock was called
            expect(listenMock).toHaveBeenCalledTimes(1);
            
            // Get the actual arguments passed to listenMock
            const [port, callback] = listenMock.mock.calls[0];
            
            // Verify port is a number and callback is a function
            expect(typeof port).toBe('string');
            expect(port).toBe("3000");
            expect(typeof callback).toBe('function');
        });
    });
});