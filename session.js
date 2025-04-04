// Function to get viewed documents from session storage
function getViewedDocs() {
  return JSON.parse(sessionStorage.getItem('viewedDocs') || '[]');
}

// Function to add a document to viewed documents
function addViewedDoc(docId) {
  const viewedDocs = getViewedDocs();
  if (!viewedDocs.includes(docId)) {
    viewedDocs.push(docId);
    sessionStorage.setItem('viewedDocs', JSON.stringify(viewedDocs));
  }
}

// Function to check if a document has been viewed
function hasViewedDoc(docId) {
  return getViewedDocs().includes(docId);
}

// Function to get available documents (not viewed yet)
function getAvailableDocs(docs, currentDocId) {
  const viewedDocs = getViewedDocs();
  return docs.filter(d => d.id !== currentDocId && !viewedDocs.includes(d.id));
}

// Function to clear viewed documents
function clearViewedDocs() {
  sessionStorage.removeItem('viewedDocs');
} 