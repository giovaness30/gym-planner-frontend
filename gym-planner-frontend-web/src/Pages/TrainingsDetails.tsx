import { EditOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Divider, Input, Row, Space } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'

import {
  createTraining,
  deleteTraining,
  getTrainings
} from '../Services/TrainingsStoreServices'

const TrainingsDetails = () => {
  const [inputNewTrainingValue, setInputNewTrainingValue] = useState('')
  const [trainings, setTrainings]: any = useState([])
  const { Panel } = Collapse

  useEffect(() => {
    // console.log(trainings)

    getInitial()
  }, [])

  const getInitial = () => {
    getTrainings().then((item: any) => {
      // console.log(item)

      setTrainings(item)
    })
  }

  const handleCreateTraining = () => {
    if (!inputNewTrainingValue) return
    setInputNewTrainingValue(' ')
    createTraining(inputNewTrainingValue)
    getInitial()
  }

  const handleDeleteTraining = id => {
    deleteTraining(id)
    getInitial()
  }

  return (
    <Fragment>
      <p>Adicionar novo Treino</p>
      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 200px)' }}
          defaultValue=""
          onChange={(e: any) => setInputNewTrainingValue(e.target.value)}
        />
        <Button
          className="bg-green-600"
          onClick={() => handleCreateTraining()}
          type="primary"
        >
          Criar
        </Button>
      </Input.Group>
      <Divider></Divider>
      {trainings.length > 0 && (
        <Collapse className="mx-4 m-auto" defaultActiveKey={trainings[0].id}>
          {trainings.map(training => {
            return (
              <Panel header={training.name} key={training.id}>
                <p>{training.name}</p>
                <Space>
                  <Button onClick={() => handleDeleteTraining(training.id)}>
                    Excluir Treino
                  </Button>
                </Space>
              </Panel>
            )
          })}
        </Collapse>
      )}
    </Fragment>
  )
}

export default TrainingsDetails
