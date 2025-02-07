export const requestData = {
    validRequests: [
      {
        title: 'Test Permintaan Test CCTV 015',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'accept',
      },
      {
        title: 'Test Permintaan Test CCTV 027',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'reject',
        message: 'pengajuan ditolak',
      },
      {
        title: 'Test Permintaan Test CCTV 017',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'consider',
        message: 'pengajuan ditangguhkan',
      },
    ],
    edgeRequests: [
      {
        title: 'Judul Permintaan Test CCTV 018',
        detail: '',
        status: 'accept',
      },
      {
        title: '',
        detail: '',
        expectedError: 'Judul usulan harus diisi',
      },
      {
        title:
          'Judul Permintaan Test CCTV 7 Judul Permintaan Test CCTV 7 Judul Permintaan Test CCTV 9 Jodol dengarya',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'accept',
      },
      {
        title: 'test',
        images: './public/farma.jpeg',
        detail: 'test',
      }
    ],
    searchData: [
      {
        query: 'Test Permintaan Test CCTV 014',
        expected: 'Test Permintaan Test CCTV 014',
      },
      {
        query: 'ABC 123 456',
        expected: 'Data Tidak Ada',
      },
    ],
};