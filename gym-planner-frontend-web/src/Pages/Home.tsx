import { Fragment, useEffect, useState } from 'react'

import {
  getTrainings,
  getMachineTraining,
  updateMachine
} from '../Services/TrainingsStoreServices.js'

import { EditOutlined } from '@ant-design/icons'

import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography
} from 'antd'

function App() {
  const [trainings, setTrainings]: any = useState([])
  const [inputTrainingValue, setInputTrainingValue]: any = useState(null)
  const [listTableMachine, setListTableMachine]: any = useState([])
  const [editModal, setEditModal]: any = useState({
    open: false,
    name: '',
    trainingName: '',
    indexTraining: '',
    weigthValue: 0,
    machineId: 0,
    machineIndex: 0
  })

  useEffect(() => {
    getTrainings().then((item: any) => {
      setTrainings(item.items)
    })
  }, [])

  const handleSetTraining = (e: string) => {
    setInputTrainingValue(e)
    getMachineTraining(e).then((item: any) => {
      setListTableMachine(item)
    })
  }

  // Update Values Machine
  const updateValuesMachine = (id: string, index: any, weightValue: number) => {
    updateMachine(id, null, null, weightValue)
    setListTableMachine(current => {
      current[index].weight = weightValue
      return [...current]
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
      <Row className="py-1 m-auto flex justify-center w-[98%] md:w-[80%] border bg-slate-100 rounded-t">
        <Col span={10}>Exercicio</Col>
        <Col span={3}>Ser.</Col>
        <Col span={5}>Rep.</Col>
        <Col span={4}>Carga</Col>
        <Col span={2}></Col>
      </Row>
      {listTableMachine.map((machine, machineIndex) => {
        return (
          <Row
            className="py-1 my-1 m-auto w-[98%] md:w-[80%] flex-row flex justify-center border rounded bg-white shadow-sm"
            key={machine.id}
          >
            <Col className="gutter-row" span={10}>
              <Space>
                <Typography className="text-[14pt]">{machine.name}</Typography>
              </Space>
            </Col>
            <Col className="gutter-row" span={3}>
              <Space>{machine.serie}x</Space>
            </Col>
            <Col className="gutter-row" span={5}>
              <Space>{machine.repet}x</Space>
            </Col>
            <Col className="gutter-row" span={4}>
              <Space>{machine.weight}.kg</Space>
            </Col>
            <Col span={2}>
              <EditOutlined
                onClick={() => {
                  setEditModal({
                    title: machine.name,
                    status: true,
                    weigthValue: machine.weight,
                    machineId: machine.id,
                    machineIndex: machineIndex
                  })
                }}
              />
            </Col>
          </Row>
        )
      })}
      <Modal
        title={`Editando - ${editModal.title}`}
        open={editModal.status}
        footer={null}
        onCancel={() => setEditModal({ title: '', status: false })}
      >
        <Space className="flex justify-center">
          <Row className="flex items-center my-2">
            <Col className="mr-3">Carga:</Col>
            <Col>
              <Input
                className="w-[110px]"
                type="number"
                value={editModal.weigthValue}
                onChange={e =>
                  setEditModal({ ...editModal, weigthValue: e.target.value })
                }
                addonAfter=".Kg"
              />
            </Col>
          </Row>
        </Space>
        <div className="w-full flex justify-end">
          <Button
            className="mr-3"
            onClick={() => setEditModal({ title: '', status: false })}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              updateValuesMachine(
                editModal.machineId,
                editModal.machineIndex,
                editModal.weigthValue
              )
              setEditModal({ id: '', title: '', status: false })
            }}
          >
            Salvar
          </Button>
        </div>
      </Modal>
    </Fragment>
  )
}

export default App
