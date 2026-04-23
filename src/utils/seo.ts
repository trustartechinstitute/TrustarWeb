// Helper to update document title and meta description per page
export const setPageMeta = (title?: string, description?: string) => {
  document.title = title ? `${title} | Trustar Tech Institute` : 'Trustar Tech Institute';
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.setAttribute('content', description);
};
