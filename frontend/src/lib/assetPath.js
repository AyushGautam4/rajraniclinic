export const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const publicUrl = process.env.PUBLIC_URL || '';
  const cleanPublicUrl = publicUrl === '/' ? '' : publicUrl.replace(/\/$/, '');
  return `${cleanPublicUrl}${cleanPath}`;
};
