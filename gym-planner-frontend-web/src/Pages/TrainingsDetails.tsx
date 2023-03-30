import { EditOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons'
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
import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react'
import { Tooltip } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
  const [trainings, setTrainings]: any = useState([])
  const [editRepValue, setEditRepValue]: any = useState(null)
  const [editSerieValue, setEditSerieValue]: any = useState(null)
  const [editWeightValue, setEditWeightValue]: any = useState(null)

  const [openModalEdit, setOpenModalEdit]: any = useState({
    id: '',
    title: '',
    status: false
  })

  const [exerciseModal, setExerciseModal] = useState({
    open: false,
    name: '',
    trainingName: '',
    indexTraining: ''
  })
  const { Panel } = Collapse

  useEffect(() => {
    getInitial()
  }, [])

  const LoadingSkeleton = ({ children }) => {
    if (trainings.length == 0)
      return (
        <>
          <div className="m-4">
            {/* <Skeleton active /> */}
            <p>Nenhum Treino encontrado...</p>
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
        getMachineTraining(training.name).then((item: any) => {
          let orderListItems = item.sort(function (a, b) {
            return a.key - b.key
          })

          trainings[index].machines = orderListItems
          const newValue = trainings
          // console.log(newValue)

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
    name: string,
    trainingName: string,
    indexTraining: string,
    key: number
  ) => {
    if (!trainingName) return
    setExerciseModal({
      open: false,
      name: '',
      trainingName: '',
      indexTraining: ''
    })
    createMachineTraining(name, trainingName, key).then(resp => {
      if (resp)
        setTrainings(current => {
          current[indexTraining].machines.push(resp)
          current[indexTraining].machines.sort(function (a, b) {
            return a.key - b.key
          })
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
  const handleEditValues = (serie: number, rep: number, weight: number) => {
    setEditSerieValue(serie)
    setEditRepValue(rep)
    setEditWeightValue(weight)
  }

  // Update Values Machine
  const updateValuesMachine = (id: string, index: any) => {
    updateMachine(id, editSerieValue, editRepValue, editWeightValue)
    setTrainings(current => {
      current[index.indexTraining].machines[index.indexMachines].serie =
        editSerieValue
      current[index.indexTraining].machines[index.indexMachines].repet =
        editRepValue
      current[index.indexTraining].machines[index.indexMachines].weight =
        editWeightValue
      return [...current]
    })
  }

  //beautiful drag and drop
  const onDragEnd = useCallback(result => {
    console.log(result)

    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    setTrainings(current => {
      const newList = Array.from(current[0].machines)
      const moveItem = current[0].machines[source.index]
      newList.splice(source.index, 1)
      newList.splice(destination.index, 0, moveItem)
      console.log(current)

      current[0].machines = newList.map((item: any, index) => {
        updateMachine(item.id, item.serie, item.repet, item.weight, index)
        return {
          uid: item.uid,
          id: item.id,
          key: index,
          name: item.name,
          serie: item.serie,
          repet: item.repet,
          weight: item.weight,
          training: item.training
        }
      })
      return [...current]
    })
  }, [])

  return (
    <Fragment>
      {/* <p>Adicionar novo Treino</p> */}
      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 200px)' }}
          placeholder="Adicionar Novo treino..."
          value={inputNewTrainingValue}
          onChange={(e: any) => setInputNewTrainingValue(e.target.value)}
        />
        <Button
          className="bg-green-600 h-full"
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
            {trainings?.map((training: any, indexTraining: string) => {
              // console.log(training.machines)

              return (
                <Panel header={training.name} key={training.id}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="id" type="PERSON">
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            // className={cx(
                            //   styles.dropper,
                            //   snapshot.isDraggingOver && styles.dropOver
                            // )}
                            style={{ color: ' #000' }}
                          >
                            <Row className="py-1 justify-center w-full border-b-2">
                              <Col span={1}></Col>
                              <Col span={11}>Exercicio</Col>
                              <Col span={3}>Series</Col>
                              <Col span={3}>Repetições</Col>
                              <Col span={3}>Carga</Col>
                              <Col className="" span={1}></Col>
                              <Col span={1}></Col>
                              <Col span={1}></Col>
                            </Row>
                            {training?.machines?.map(
                              (machine, indexMachines) => {
                                // console.log(machine)

                                return (
                                  <Draggable
                                    key={machine.key}
                                    draggableId={machine.id}
                                    index={indexMachines}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          // className={cx(
                                          //   styles.dragger,
                                          //   snapshot.isDragging && styles.dragging
                                          // )}
                                          // className={snapshot.isDragging}
                                          style={{ color: '#000' }}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Row
                                            className="py-1 flex-row flex justify-center"
                                            // key={index}
                                          >
                                            <Col span={1}>
                                              {machine.key}
                                              {/* <Tooltip title="Mudar Ordem">
                                                <MenuOutlined
                                                  style={{ color: '#cacaca' }}
                                                />
                                              </Tooltip> */}
                                            </Col>
                                            <Col span={11}>{machine.name}</Col>
                                            <Col span={3}>{machine.serie}</Col>
                                            <Col span={3}>{machine.repet}</Col>
                                            <Col span={3}>
                                              {machine.weight}kg
                                            </Col>
                                            <Col span={1}></Col>
                                            <Col span={1}>
                                              <Tooltip title="Editar Maquina">
                                                <EditOutlined
                                                  onClick={() => {
                                                    handleEditValues(
                                                      machine.serie,
                                                      machine.repet,
                                                      machine.weight
                                                    )
                                                    setOpenModalEdit({
                                                      id: machine.id,
                                                      title: machine.name,
                                                      status: true,
                                                      index: {
                                                        indexTraining,
                                                        indexMachines
                                                      }
                                                    })
                                                  }}
                                                />
                                              </Tooltip>
                                            </Col>

                                            <Col className="" span={1}>
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
                                        </div>
                                      )
                                    }}
                                  </Draggable>
                                )
                              }
                            )}
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </DragDropContext>
                  <Space className="flex flex-col mt-5 m-auto">
                    <Button
                      className="mt-5"
                      color="primary"
                      onClick={() =>
                        setExerciseModal({
                          ...exerciseModal,
                          open: true,
                          trainingName: training.name,
                          indexTraining: indexTraining
                        })
                      }
                    >
                      Adicionar novo Exercicio
                    </Button>
                    <Button
                      className="mt-5"
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
        okText="Salvar"
        okType="default"
        onOk={() => {
          updateValuesMachine(openModalEdit.id, openModalEdit.index)
          setOpenModalEdit({ id: '', title: '', status: false })
        }}
        onCancel={() => setOpenModalEdit({ title: '', status: false })}
      >
        <Space className="flex justify-center">
          <Row className="items-center flex flex-col">
            <Col>Séries:</Col>
            <Col>
              <Input
                className="w-[80px]"
                value={editSerieValue}
                type="number"
                onChange={e => setEditSerieValue(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="items-center flex flex-col">
            <Col>Repetições:</Col>
            <Col>
              <Input
                className="w-[80px]"
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
                className="w-[110px]"
                value={editWeightValue}
                onChange={e => setEditWeightValue(e.target.value)}
                addonAfter=".Kg"
              />
            </Col>
          </Row>
        </Space>
      </Modal>

      <Modal
        title="Novo Exercicio"
        open={exerciseModal.open}
        onOk={() =>
          // console.log(
          //   trainings.find(x => x.name == exerciseModal.trainingName).machines
          //     .length
          // )

          handleCreateMachineTraining(
            exerciseModal.name,
            exerciseModal.trainingName,
            exerciseModal.indexTraining,
            trainings.find(x => x.name == exerciseModal.trainingName).machines
              .length
          )
        }
        okText="Adicionar"
        okType="default"
        onCancel={() =>
          setExerciseModal({ ...exerciseModal, open: false, name: '' })
        }
      >
        <Input
          className="w-full my-5 px-10"
          placeholder="Nome do Exercicio"
          value={exerciseModal.name}
          onChange={(e: any) =>
            setExerciseModal({ ...exerciseModal, name: e.target.value })
          }
        />
      </Modal>
    </Fragment>
  )
}

export default TrainingsDetails
