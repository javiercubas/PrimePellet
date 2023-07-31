import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SitemapViewer = () => {
  const [sitemapContent, setSitemapContent] = useState('');

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener el contenido del sitemap desde el backend
    axios.get('http://api.primepellet.es/sitemap.xml')
      .then(response => {
        setSitemapContent(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el sitemap:', error);
      });
  }, []);

  return (
    <div>
      <h1>Sitemap XML</h1>
      <pre>
        {sitemapContent}
      </pre>
    </div>
  );
};

export default SitemapViewer;