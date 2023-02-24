import React from 'react'
import {
  DownOutlined,
  HomeOutlined,
  MenuOutlined,
  OrderedListOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { Button, MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import RoutesUrlPath from '../assets/RoutesUrlPath'
import { authLogout } from '../Services/AuthStoreServices'

const MenuList = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="home" href={'/'}>
          Inicio
        </a>
      ),
      icon: <HomeOutlined />
    },
    {
      key: '2',
      label: (
        <a rel="treinos" href={RoutesUrlPath.trainings.trainings}>
          Treinos
        </a>
      ),
      icon: <OrderedListOutlined />
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
      label: (
        <a rel="sair" onClick={() => authLogout()}>
          Sair
        </a>
      )
    }
  ]

  return (
    <Dropdown menu={{ items }}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          <MenuOutlined style={{ fontSize: '20px', color: '#000' }} />
        </Space>
      </a>
    </Dropdown>
  )
}
export default MenuList
