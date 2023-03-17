import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Collapse,
  Divider,
  Input,
  Modal,
  Row,
  Skeleton,
  Space
} from 'antd'
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
  const [inputNewTrainingValue, setInputNewTrainingValue]: any = useState(null)
  const [inputNewMachineTrainingValue, setInputNewMachineTrainingValue] =
    useState('')
  const [trainings, setTrainings]: any = useState([])
  const [editRepValue, setEditRepValue]: any = useState(null)
  const [editWeightValue, setEditWeightValue]: any = useState(null)
  const [addMachineValue, setAddMachineValue]: any = useState(null)

  const [openModalEdit, setOpenModalEdit]: any = useState({
    id: '',
    title: '',
    status: false
  })
  const { Panel } = Collapse

  useEffect(() => {
    getInitial()
  }, [])

  // useEffect(() => {
  //   console.log(trainings)
  // }, [trainings])

  const LoadingSkeleton = ({ children }) => {
    if (trainings.length == 0)
      return (
        <>
          <div className="m-4">
            <Skeleton active />
            {/* //{' '} */}
          </div>
        </>
      )
    else {
      return children
    }
  }

  const getInitial = () => {
    getTrainings().then((item: any) => {
      let trainings = item
      trainings.map((training, index) => {
        getMachineTraining(training.name).then(item => {
          trainings[index].machines = item
          const newValue = trainings
          setTrainings([...newValue])
        })
      })
    })
  }

  // Add Training
  const handleCreateTraining = () => {
    if (!inputNewTrainingValue) return
    createTraining(inputNewTrainingValue).then(resp => {
      if (resp)
        setTrainings(current => {
          current.push(resp)
          return [...current]
        })
    })
    setInputNewTrainingValue(null)
  }

  // Add Machine
  const handleCreateMachineTraining = (
    trainingName: string,
    indexTraining: string
  ) => {
    if (!addMachineValue) return
    setAddMachineValue(null)
    createMachineTraining(addMachineValue, trainingName).then(resp => {
      if (resp)
        setTrainings(current => {
          current[indexTraining].machines.push(resp)
          return [...current]
        })
    })
  }

  // Delete Trainig
  const handleDeleteTraining = (id: string, indexTraining: string) => {
    deleteTraining(id)
    setTrainings(current => {
      const itemDelete = current[indexTraining]
      return [...current.filter(x => x !== itemDelete)]
    })
  }

  // Delete Machine
  const handleDeleteMachine = (
    id: string,
    indexMachines: string,
    indexTrainings: string
  ) => {
    deleteMachineTraining(id)

    setTrainings(current => {
      const itemDelete = current[indexTrainings].machines[indexMachines]

      current[indexTrainings].machines = current[
        indexTrainings
      ].machines.filter(x => x !== itemDelete)
      return [...current]
    })
  }

  // Set Values to Open Modal
  const handleEditValues = (rep: number, weight: number) => {
    setEditRepValue(rep)
    setEditWeightValue(weight)
  }

  // Update Values Machine
  const updateValuesMachine = (id: string, index: any) => {
    updateMachine(id, editRepValue, editWeightValue)
    setTrainings(current => {
      current[index.indexTraining].machines[index.indexMachines].repet =
        editRepValue
      current[index.indexTraining].machines[index.indexMachines].weight =
        editWeightValue
      return [...current]
    })
  }

  return (
    <Fragment>
      <p>Adicionar novo Treino</p>
      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 200px)' }}
          defaultValue=""
          value={inputNewTrainingValue}
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
      <LoadingSkeleton>
        {trainings?.length > 0 && (
          <Collapse className="mx-4 m-auto" defaultActiveKey={trainings[0].id}>
            {trainings.map((training: any, indexTraining: string) => {
              // console.log(training.machines)

              return (
                <Panel
                  header={training.name}
                  key={training.id}
                  // className="flex flex-col"
                >
                  <Row className="py-1 flex-row flex justify-center border-b-2">
                    <Col span={8}>Maquina</Col>
                    <Col span={6}>Repetições</Col>
                    <Col span={6}>Carga</Col>
                    <Col className="" span={1}></Col>
                    <Col span={1}></Col>
                  </Row>
                  {training.machines &&
                    training.machines.map(
                      (machine: any, indexMachines: string) => {
                        return (
                          // <div className="">
                          <Fragment>
                            <Row
                              className="py-1 flex-row flex justify-center"
                              // key={index}
                            >
                              <Col span={8}>{machine.name}</Col>
                              <Col span={6}>{machine.repet}</Col>
                              <Col span={6}>{machine.weight}kg</Col>
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
                                        status: true,
                                        index: { indexTraining, indexMachines }
                                      })
                                    }}
                                  />
                                </Tooltip>
                              </Col>
                              <Col className="ml-2" span={1}>
                                <Tooltip title="Excluir Maquina">
                                  <DeleteOutlined
                                    onClick={() =>
                                      handleDeleteMachine(
                                        machine.id,
                                        indexMachines,
                                        indexTraining
                                      )
                                    }
                                  />
                                </Tooltip>
                              </Col>
                            </Row>
                          </Fragment>
                        )
                      }
                    )}
                  {/* </Space> */}
                  <Space className="flex flex-col md:flex-row mt-5 m-auto">
                    <Input.Group compact>
                      <Input
                        style={{ width: 'calc(100% - 50%)' }}
                        // className="w-1/4"
                        defaultValue=""
                        value={addMachineValue}
                        onChange={e => setAddMachineValue(e.target.value)}
                      />
                      <Button
                        className="bg-green-600 w-2/4"
                        onClick={() =>
                          handleCreateMachineTraining(
                            training.name,
                            indexTraining
                          )
                        }
                        type="primary"
                      >
                        Add Nova Maquina
                      </Button>
                    </Input.Group>
                    <Button
                      onClick={() =>
                        handleDeleteTraining(training.id, indexTraining)
                      }
                    >
                      Excluir Treino
                    </Button>
                  </Space>
                </Panel>
              )
            })}
          </Collapse>
        )}
      </LoadingSkeleton>
      <Modal
        title={openModalEdit.title}
        open={openModalEdit.status}
        onOk={() => {
          updateValuesMachine(openModalEdit.id, openModalEdit.index)
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
