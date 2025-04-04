document.addEventListener('DOMContentLoaded', () => {
  const docTitleEl = document.getElementById('titleText');
  const docOverviewEl = document.getElementById('docOverview');
  const docSummaryEl = document.getElementById('docSummary');
  const docBulletsEl = document.getElementById('docBullets');
  const pdfFrame = document.getElementById('pdfFrame');
  const viewAnotherDocBtn = document.getElementById('backBtn');
  const goHomeBtn = document.getElementById('goHomeBtn');

  // Get or initialize viewed documents array from sessionStorage
  let viewedDocs = JSON.parse(sessionStorage.getItem('viewedDocs') || '[]');

  // Parse ?id=X from the URL
  const params = new URLSearchParams(window.location.search);
  const docId = parseInt(params.get('id'), 10);

  // Fetch the documents JSON
  fetch('documents.json')
    .then((res) => res.json())
    .then((data) => {
      const docs = data.documents;
      if (!docs || docs.length === 0) {
        console.error('No documents available.');
        return;
      }

      // Find the document with matching id
      const doc = docs.find((d) => d.id === docId);
      if (!doc) {
        console.error(`Document with ID ${docId} not found.`);
        return;
      }

      // Add current document to viewed documents if not already there
      if (!viewedDocs.includes(docId)) {
        viewedDocs.push(docId);
        sessionStorage.setItem('viewedDocs', JSON.stringify(viewedDocs));
      }

      // Populate summary fields
      docTitleEl.textContent = doc.aiSummary.title.toUpperCase();
      docOverviewEl.textContent = doc.aiSummary.overview;
      docSummaryEl.textContent = doc.aiSummary.summary;

      // Bullet points
      docBulletsEl.innerHTML = '';
      doc.aiSummary.bulletPoints.forEach((point) => {
        const li = document.createElement('li');
        li.textContent = point;
        docBulletsEl.appendChild(li);
      });

      // Set PDF in the modal iframe
      pdfFrame.src = doc.pdfUrl;

      // Button to view another document: choose a random document that is not the current one and hasn't been viewed
      viewAnotherDocBtn.addEventListener('click', () => {
        const otherDocs = docs.filter((d) => d.id !== doc.id && !viewedDocs.includes(d.id));
        if (otherDocs.length > 0) {
          const randomIndex = Math.floor(Math.random() * otherDocs.length);
          const newDoc = otherDocs[randomIndex];
          window.location.href = `viewer.html?id=${newDoc.id}`;
        } else {
          // If all documents have been viewed, redirect to completed page
          window.location.href = 'completed.html';
        }
      });

      // "Go home" button redirects to the home page
      goHomeBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
      });
    })
    .catch((err) => {
      console.error('Error fetching documents:', err);
    });
});
