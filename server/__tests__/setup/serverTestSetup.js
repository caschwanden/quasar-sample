import { vi } from 'vitest';

export const setupServerMocks = () => {
    const listenMock = vi.fn((port, callback) => {
        if (callback) callback();
        return serverMock;
    });

    const serverMock = {
        listen: listenMock,
        listening: true,
        address: vi.fn(() => ({ port: 3000 }))
    };

    const createServerMock = vi.fn().mockImplementation(() => {
        return serverMock;
    });

    return { createServerMock, listenMock, serverMock };
};