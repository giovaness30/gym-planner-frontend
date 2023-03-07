import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Divider, Input, Modal, Row, Space } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Tooltip } from 'antd'

import {
  createMachineTraining,
  createTraining,
  deleteMachineTraining,
  deleteTraining,
  getMachineTraining,
  getTrainings,
  updateMachine
} from '../Services/TrainingsStoreServices'

const TrainingsDetails = () => {
  const [inputNewTrainingValue, setInputNewTrainingValue] = useState('')
  const [inputNewMachineTrainingValue, setInputNewMachineTrainingValue] =
    useState('')
  const [trainings, setTrainings]: any = useState([])
  const [editRepValue, setEditRepValue]: any = useState(null)
  const [editWeightValue, setEditWeightValue]: any = useState(null)

  const [openModalEdit, setOpenModalEdit]: any = useState({
    id: '',
    title: '',
    status: false
  })
  const { Panel } = Collapse

  useEffect(() => {
    // console.log(trainings)

    getInitial()
    // handleListMachinesToTrainings()
  }, [])

  // useEffect(() => {
  //   console.log(trainings)
  // }, [trainings])

  const getInitial = () => {
    getTrainings().then((item: any) => {
      // console.log(item)
      let trainings = item
      trainings.map((training, index) => {
        getMachineTraining(training.name).then(item => {
          trainings[index].machines = item
          const newValue = trainings
          setTrainings([...newValue])
        })
      })
      // console.log(trainings)
    })
  }

  const handleCreateTraining = () => {
    if (!inputNewTrainingValue) return
    setInputNewTrainingValue(' ')
    createTraining(inputNewTrainingValue)
    getInitial()
  }
  const handleCreateMachineTraining = trainingName => {
    if (!inputNewMachineTrainingValue) return
    setInputNewMachineTrainingValue(' ')
    createMachineTraining(inputNewMachineTrainingValue, trainingName)
    getInitial()
  }

  const handleDeleteTraining = (id: string) => {
    deleteTraining(id)
    getInitial()
  }
  const handleDeleteMachine = (id: string, index: any) => {
    // deleteMachineTraining(id)
    // getInitial()
    console.log(trainings[index].machines)
    console.log(index)

    // setTrainings(current)
  }

  const handleEditValues = (rep: number, weight: number) => {
    setEditRepValue(rep)
    setEditWeightValue(weight)
  }

  const updateValuesMachine = (id: string) => {
    updateMachine(id, editRepValue, editWeightValue)
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
          {trainings.map((training: any) => {
            // console.log(training.machines)

            return (
              <Panel
                header={training.name}
                key={training.id}
                // className="flex flex-col"
              >
                <Row className="py-1 flex-row flex justify-center border-b-2">
                  <Col span={8}>Maquina</Col>
                  <Col span={4}>Repetições</Col>
                  <Col span={4}>Carga</Col>
                  <Col className="" span={1}></Col>
                  <Col span={1}></Col>
                </Row>
                {training.machines &&
                  training.machines.map((machine: any, i: any) => {
                    console.log(machine)

                    return (
                      // <div className="">
                      <Fragment>
                        <Row
                          className="py-1 flex-row flex justify-center"
                          // key={index}
                        >
                          <Col span={8}>{machine.name}</Col>
                          <Col span={4}>{machine.repet}</Col>
                          <Col span={4}>{machine.weight}kg</Col>
                          <Col span={1}>
                            <Tooltip title="Editar Maquina">
                              <EditOutlined
                                onClick={() => {
                                  handleEditValues(
                                    machine.repet,
                                    machine.weight
                                  )
                                  setOpenModalEdit({
                                    id: machine.id,
                                    title: machine.name,
                                    status: true
                                  })
                                }}
                              />
                            </Tooltip>
                          </Col>
                          <Col className="" span={1}>
                            <Tooltip title="Excluir Maquina">
                              <DeleteOutlined
                                onClick={() =>
                                  handleDeleteMachine(machine.id, i)
                                }
                              />
                            </Tooltip>
                          </Col>
                        </Row>
                      </Fragment>
                    )
                  })}
                {/* </Space> */}
                <Space className="flex mt-5">
                  <Input.Group compact>
                    <Input
                      style={{ width: 'calc(100% - 200px)' }}
                      defaultValue=""
                      onChange={(e: any) =>
                        setInputNewMachineTrainingValue(e.target.value)
                      }
                    />
                    <Button
                      className="bg-green-600"
                      onClick={() => handleCreateMachineTraining(training.name)}
                      type="primary"
                    >
                      Add Nova Maquina
                    </Button>
                  </Input.Group>
                  <Button onClick={() => handleDeleteTraining(training.id)}>
                    Excluir Treino
                  </Button>
                </Space>
              </Panel>
            )
          })}
        </Collapse>
      )}
      <Modal
        title={openModalEdit.title}
        open={openModalEdit.status}
        onOk={() => {
          updateValuesMachine(openModalEdit.id)
          setOpenModalEdit({ id: '', title: '', status: false })
        }}
        onCancel={() => setOpenModalEdit({ title: '', status: false })}
      >
        <Space className="flex w-6/12 m-auto">
          <Row className="items-center flex flex-col">
            <Col>Repetições:</Col>
            <Col>
              <Input
                value={editRepValue}
                type="number"
                onChange={e => setEditRepValue(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="flex flex-col items-center my-2">
            <Col>Carga:</Col>
            <Col>
              <Input
                value={editWeightValue}
                onChange={e => setEditWeightValue(e.target.value)}
                addonAfter=".Kg"
              />
            </Col>
          </Row>
        </Space>
      </Modal>
    </Fragment>
  )
}

export default TrainingsDetails
