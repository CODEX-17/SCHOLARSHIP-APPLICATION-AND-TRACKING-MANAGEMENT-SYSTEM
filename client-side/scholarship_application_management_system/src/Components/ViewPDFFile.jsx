import React from 'react'

const ViewPDFFile = ({ pdfFile }) => {

  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src={pdfFile}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      ></iframe>
    </div>
  )
}

export default ViewPDFFile
