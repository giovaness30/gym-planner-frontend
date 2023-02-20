import { Fragment, useEffect, useState } from 'react'

import {
  getTrainings,
  getMachineTraining
} from '../Services/TrainingsStoreServices.js'

import { EditOutlined } from '@ant-design/icons'

import { Col, Divider, Row, Select, Space } from 'antd'

function App() {
  const [trainings, setTrainings]: any = useState([])
  const [inputTrainingValue, setInputTrainingValue]: any = useState(null)
  const [listTableMachine, setListTableMachine]: any = useState([])

  useEffect(() => {
    getTrainings().then((item: any) => {
      setTrainings(item)
    })
  }, [])
  // console.log(trainings)

  const handleSetTraining = (e: string) => {
    setInputTrainingValue(e)
    getMachineTraining(e).then((item: any) => {
      setListTableMachine(item)
    })
  }

  return (
    <Fragment>
      <div className="max-w-xlm-auto my-5">
        <Select
          defaultValue="Selecione o Treino de Hoje.."
          style={{ width: '50%' }}
          onChange={e => handleSetTraining(e)}
          options={trainings.map((training: any) => ({
            label: training.name,
            value: training.name
          }))}
        />
      </div>
      <Divider></Divider>
      <Row className="mb-3">
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
          <Row key={machine.id}>
            <Col className="gutter-row" span={8}>
              <Space>{machine.name}</Space>
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
