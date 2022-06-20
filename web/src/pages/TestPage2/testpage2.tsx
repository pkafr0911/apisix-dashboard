import React, { useState } from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import complexmenu from './complexmenu';
import Subnav1 from './menuitems/Subnav1';
import Subnav2 from './menuitems/Subnav2';
import Subnav3 from './menuitems/Subnav3';
import Route from '../Route/List';
//#region basic menu items
// const { Header, Content, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );
//#endregion

const testpage2: React.FC = () => {
  const [pathname, setPathname] = useState('/Subnav1');
  const renderChildren = () => {
    switch (pathname) {
      case '/Subnav1':
        return <Subnav1 />;
      case '/Subnav2':
        return <Subnav2 />;
      case '/Subnav3':
        return <Subnav3 />;
      case '/Route':
        return <Route />;
      default:
        return null;
    }
  };
  console.log(pathname);
  return (
    //#region basic menu
    // <Layout>
    //   <Header className="header">
    //     <div className="logo" />
    //     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    //   </Header>
    //   <Layout>
    //     <Sider width={200} className="site-layout-background">
    //       <Menu
    //         mode="inline"
    //         defaultSelectedKeys={['1']}
    //         defaultOpenKeys={['sub1']}
    //         style={{ height: '100%', borderRight: 0 }}
    //         items={complexmenu}
    //       />
    //     </Sider>
    //     <Layout style={{ padding: '0 24px 24px' }}>
    //       <Breadcrumb style={{ margin: '16px 0' }}>
    //         <Breadcrumb.Item>Home</Breadcrumb.Item>
    //         <Breadcrumb.Item>List</Breadcrumb.Item>
    //         <Breadcrumb.Item>App</Breadcrumb.Item>
    //       </Breadcrumb>
    //       <Content
    //         className="site-layout-background"
    //         style={{
    //           padding: 24,
    //           margin: 0,
    //           minHeight: 280,
    //         }}
    //       >
    //         Content
    //         <PageContainer>{renderChildren()}</PageContainer>
    //       </Content>
    //     </Layout>
    //   </Layout>
    // </Layout>
    //#endregion

    <ProLayout
      location={{
        pathname,
      }}
      route={{
        routes: complexmenu,
      }}
      navTheme="light"
      style={{
        height: '100%',
      }}
      menuHeaderRender={false}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/welcome');
          }}
        >
          {dom}
        </a>
      )}
    >
      <PageContainer>{renderChildren()}</PageContainer>
    </ProLayout>
  );
};

export default testpage2;
