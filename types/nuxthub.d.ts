declare module '#hub/server' {
  export function hubDatabase(): {
    exec: (sql: string) => any;
    prepare: (sql: string) => {
      bind: (...params: any[]) => {
        first: <T = any>() => Promise<T | null>;
        run: () => Promise<any>;
      };
    };
  };
}
