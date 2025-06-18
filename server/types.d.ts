declare global {
  // Only declare as property on globalThis
  interface GlobalThis {
    hubDatabase: () => any;
  }
}

export {};
