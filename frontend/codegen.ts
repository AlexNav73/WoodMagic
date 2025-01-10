import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/app/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
    './introspection.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
