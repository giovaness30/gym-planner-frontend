import { Fragment, useEffect, useState } from 'react'

import {
  getTrainings,
  getMachineTraining
} from '../Services/TrainingsStoreServices.js'

import { EditOutlined } from '@ant-design/icons'

import { Col, Divider, Row, Select, Space, Typography } from 'antd'

function App() {
  const [trainings, setTrainings]: any = useState([])
  const [inputTrainingValue, setInputTrainingValue]: any = useState(null)
  const [listTableMachine, setListTableMachine]: any = useState([])

  useEffect(() => {
    getTrainings().then((item: any) => {
      setTrainings(item)
    })
  }, [])

  const handleSetTraining = (e: string) => {
    setInputTrainingValue(e)
    getMachineTraining(e).then((item: any) => {
      setListTableMachine(item)
    })
  }

  return (
    <Fragment>
      <div className="w-11/12 md:w-3/4 m-auto my-5">
        <Select
          defaultValue="Selecione o Treino de Hoje.."
          // style={{ width: '50%' }}
          className="w-11/12 md:w-full"
          onChange={e => handleSetTraining(e)}
          options={trainings.map((training: any) => ({
            label: training.name,
            value: training.name
          }))}
        />
      </div>
      <Divider></Divider>
      <Row className="mb-3 text-black">
        <Col className="gutter-row" span={8}>
          <Space>Maquina</Space>
        </Col>
        <Col className="gutter-row" span={8}>
          <Space>Rep.</Space>
        </Col>
        <Col className="gutter-row" span={8}>
          <Space>Peso Atual</Space>
        </Col>
      </Row>
      {listTableMachine.map(machine => {
        return (
          <Row className="text-black" key={machine.id}>
            <Col className="gutter-row" span={8}>
              <Space>
                <Typography className="text-[14pt]">{machine.name}</Typography>
              </Space>
            </Col>
            <Col className="gutter-row" span={8}>
              <Space>{machine.repet}x</Space>
            </Col>
            <Col className="gutter-row" span={8}>
              <Space>{machine.weight}.kg</Space>
              <EditOutlined />
            </Col>
          </Row>
        )
      })}
    </Fragment>
  )
}

export default App
