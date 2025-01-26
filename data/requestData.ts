export const requestData = {
    validRequests: [
      {
        title: 'Test Permintaan Test CCTV 01',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'accept',
      },
      {
        title: 'Test Permintaan Test CCTV 02',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'reject',
        message: 'pengajuan ditolak',
      },
      {
        title: 'Test Permintaan Test CCTV 03',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'consider',
        message: 'pengajuan ditangguhkan',
      },
    ],
    edgeRequests: [
      {
        title: 'Judul Permintaan Test CCTV 04',
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
          'Judul Permintaan Test CCTV 7 Judul Permintaan Test CCTV 7 Judul Permintaan Test CCTV 7 Jodol dengarya',
        detail: 'Detail permintaan test CCTV terbaru',
        status: 'accept',
      },
    ],
    searchData: [
      {
        query: 'Judul Permintaan Test CCTV 1',
        expected: 'Judul Permintaan Test CCTV 1',
      },
      {
        query: 'ABC 123 456',
        expected: 'Data Tidak Ada',
      },
    ],
  };
  