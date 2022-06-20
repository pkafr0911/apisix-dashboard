export default [
  {
    path: '/Subnav1',
    name: 'Default item',
    locale: 'menu.home',
    routes: [
      {
        path: '/Subnav1',
        name: 'Overview ',
        locale: 'menu.home.overview',
      },
      {
        path: '/Route',
        name: 'Route',
        locale: 'menu.home.search',
      },
    ],
  },
  {
    path: '/Subnav2',
    name: 'Aggregate data',
    locale: 'menu.data_hui',
    routes: [
      {
        collapsed: true,
        menuName: 'Domain buyer dimension transaction',
        name: 'Domain buyer dimension transaction',
        routes: [
          {
            name: 'Moon Table',
            path: '/Subnav2',
          },
          {
            name: 'Daily table',
            path: '',
          },
        ],
      },
      {
        name: 'Dimensional transactions',
        path: '/Subnav3',
        routes: [
          {
            name: 'Moon Table',
            path: '/Subnav3',
          },
          {
            name: 'Daily Table',
            key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            path: '/data_hui5',
          },
        ],
      },
    ],
  },
];
