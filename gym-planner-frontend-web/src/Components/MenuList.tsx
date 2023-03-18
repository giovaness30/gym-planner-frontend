import React from 'react'
import {
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  OrderedListOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { Button, MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import RoutesUrlPath from '../assets/RoutesUrlPath'
import { authLogout } from '../Services/AuthStoreServices'

const styleItensMenu = {
  fontSize: '16pt'
}
const styleIconsMenu = {
  fontSize: '12pt'
}

const MenuList = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      // className: 'text-xl',
      style: styleItensMenu,
      label: (
        <a rel="home" href={'/home'}>
          Inicio
        </a>
      ),
      icon: <HomeOutlined style={styleIconsMenu} />
    },
    {
      key: '2',
      style: styleItensMenu,
      label: (
        <a rel="treinos" href={RoutesUrlPath.trainings.trainings}>
          Treinos
        </a>
      ),
      icon: <OrderedListOutlined style={styleIconsMenu} />
      // disabled: true
    },
    // {
    //   key: '3',
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="https://www.luohanacademy.com"
    //     >
    //       3rd menu item (disabled)
    //     </a>
    //   ),
    //   disabled: true
    // },
    {
      key: '4',
      danger: true,
      style: styleItensMenu,
      label: (
        <a rel="sair" onClick={() => authLogout()}>
          Sair
        </a>
      ),
      icon: <LogoutOutlined style={styleIconsMenu} />
    }
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} overlayClassName="">
      <a onClick={e => e.preventDefault()}>
        <Space>
          <MenuOutlined style={{ fontSize: '20px', color: '#000' }} />
        </Space>
      </a>
    </Dropdown>
  )
}
export default MenuList
