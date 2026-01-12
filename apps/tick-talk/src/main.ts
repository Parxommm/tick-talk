import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Handle GitHub Pages 404 redirect
// The 404.html script converts paths to query params like ?/path/to/page
// We need to convert it back to a proper route before Angular bootstraps
if (typeof window !== 'undefined') {
  const url = window.location;
  const search = url.search;
  
  // Check if we have a path in query params (format: ?/path/to/page)
  if (search && search.startsWith('?/')) {
    // Extract the path from query string
    const pathWithParams = search.substring(1); // Remove the '?'
    const [path, ...queryParts] = pathWithParams.split('&');
    
    // Reconstruct query string from remaining parts (if any)
    const remainingQuery = queryParts.length > 0 
      ? '&' + queryParts.join('&').replace(/~and~/g, '&')
      : '';
    
    // Get base href from document
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const basePath = baseHref.replace(/\/$/, ''); // Remove trailing slash
    
    // Build new URL
    const newPath = basePath + path + remainingQuery + url.hash;
    window.history.replaceState({}, '', newPath);
  }
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
