export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-home',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Transaksi',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Barang',
      url: '/barang/list',
      icon: 'icon-envelope-letter'
    },
    {
      name: 'Dashboard-caleg',
      url: '/barang/dashboard_caleg',
      icon: 'icon-envelope-letter'
    },
    {
      name: 'Barang Masuk',
      url: '/barangmasuk/list',
      icon: 'icon-envelope-letter'
    },
    {
      name: 'Pesan',
      url: '/kotakmasuk/Message',
      icon: 'icon-bubbles'
    },
    {
      name: 'Bulletin',
      url: '/kotakmasuk/bulletin',
      icon: 'icon-note'
    },
    {
      title: true,
      name: 'Laporan',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Laporan',
      url: '/laporan',
      icon: 'icon-settings',
      children: [
        {
          name: 'Barang Masuk',
          url: '/stok/laporanbarangmasuk',
          icon: 'icon-directions'
        },
        {
          name: 'Barang Keluar',
          url: '/stok/laporanbarangkeluar',
          icon: 'icon-directions'
        }
      ]
    }
  ],
  items2: [
  {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-home',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    }
  ]
}
