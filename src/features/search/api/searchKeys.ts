export const searchKeys = {
  all: ['search'] as const,
  query: (term: string) => [...searchKeys.all, 'query', term] as const,
};
